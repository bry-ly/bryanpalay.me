import { useCallback, useEffect, useRef } from "react";

/**
 * Custom React hook to load and play a sound from a given URL using the Web Audio API.
 *
 * This hook defers audio context creation until playback is requested, complying with
 * browser autoplay policies. The AudioContext is initialized on the first play() call.
 *
 * @param url - The URL of the audio file to load and play.
 * @returns A function that, when called, plays the loaded sound.
 *
 * @remarks
 * - If the Web Audio API is not supported in the browser, a warning is logged and playback is disabled.
 * - The audio context and buffer are managed internally using React refs.
 * - Errors during fetching or decoding the audio are logged to the console.
 * - Uses AbortController for proper cleanup on unmount.
 *
 * @example
 * ```tsx
 * const playClick = useSound('/sounds/click.mp3');
 * // Later in an event handler:
 * playClick();
 * ```
 */
export function useSound(url: string): (volume?: number) => void {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const bufferRef = useRef<AudioBuffer | null>(null);
  const initializedRef = useRef(false);

  const initAudioContext = useCallback(async () => {
    if (initializedRef.current) return;

    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;

    if (!AudioContextClass) {
      console.warn("Web Audio API is not supported in this browser.");
      return;
    }

    const audioCtx = new AudioContextClass();
    audioCtxRef.current = audioCtx;
    initializedRef.current = true;

    const abortController = new AbortController();

    try {
      const res = await fetch(url, { signal: abortController.signal });
      const data = await res.arrayBuffer();
      const decoded = await audioCtx.decodeAudioData(data);
      bufferRef.current = decoded;
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        return;
      }
      console.log(`Failed to load click sound from ${url}:`, err);
    }
  }, [url]);

  useEffect(() => {
    return () => {
      if (audioCtxRef.current?.state !== "closed") {
        audioCtxRef.current?.close().catch(() => {});
      }
    };
  }, []);

  const play = useCallback(
    (volume: number = 1): void => {
      const initAndPlay = async () => {
        await initAudioContext();

        if (audioCtxRef.current && bufferRef.current) {
          if (audioCtxRef.current.state === "suspended") {
            await audioCtxRef.current.resume();
          }

          const source = audioCtxRef.current.createBufferSource();
          const gainNode = audioCtxRef.current.createGain();

          source.buffer = bufferRef.current;
          gainNode.gain.value = volume;

          source.connect(gainNode);
          gainNode.connect(audioCtxRef.current.destination);
          source.start(0);
        }
      };

      initAndPlay();
    },
    [initAudioContext],
  );

  return play;
}
