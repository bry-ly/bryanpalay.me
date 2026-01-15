import { useCallback, useEffect, useRef } from "react";

/**
 * Custom React hook to load and play a sound from a given URL using the Web Audio API.
 *
 * This hook fetches the audio file at the specified URL, decodes it, and prepares it for playback.
 * It returns a `play` function that can be called to play the loaded sound.
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

  useEffect(() => {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;

    if (!AudioContextClass) {
      console.warn("Web Audio API is not supported in this browser.");
      return;
    }

    const abortController = new AbortController();
    const audioCtx = new AudioContextClass();
    audioCtxRef.current = audioCtx;

    fetch(url, { signal: abortController.signal })
      .then((res) => res.arrayBuffer())
      .then((data) => audioCtx.decodeAudioData(data))
      .then((decoded) => {
        bufferRef.current = decoded;
      })
      .catch((err) => {
        // Ignore abort errors during cleanup
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }
        console.log(`Failed to load click sound from ${url}:`, err);
      });

    // Cleanup: close audio context and abort fetch on unmount
    return () => {
      abortController.abort();
      if (audioCtxRef.current?.state !== "closed") {
        audioCtxRef.current?.close().catch(() => {
          // Ignore close errors
        });
      }
    };
  }, [url]);

  const play = useCallback((volume: number = 1): void => {
    if (audioCtxRef.current && bufferRef.current) {
      // Resume audio context if suspended (required for user interaction policies)
      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume().catch(() => {
          // Ignore resume errors
        });
      }

      const source = audioCtxRef.current.createBufferSource();
      const gainNode = audioCtxRef.current.createGain();

      source.buffer = bufferRef.current;
      gainNode.gain.value = volume;

      source.connect(gainNode);
      gainNode.connect(audioCtxRef.current.destination);
      source.start(0);
    }
  }, []);

  return play;
}