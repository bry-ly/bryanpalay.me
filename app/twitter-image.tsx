import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Bryan Palay - Full Stack Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, #1a1a2e 0%, transparent 50%), radial-gradient(circle at 75% 75%, #16213e 0%, transparent 50%)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "24px",
          }}
        >
          <div
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "60px",
              fontWeight: "bold",
              color: "white",
            }}
          >
            BP
          </div>
          <div
            style={{
              fontSize: "64px",
              fontWeight: "bold",
              color: "white",
              letterSpacing: "-2px",
            }}
          >
            Bryan Palay
          </div>
          <div
            style={{
              fontSize: "28px",
              color: "#a0a0a0",
              marginTop: "-8px",
            }}
          >
            Full Stack Developer & Software Engineer
          </div>
          <div
            style={{
              display: "flex",
              gap: "16px",
              marginTop: "16px",
            }}
          >
            {["React", "Next.js", "TypeScript", "Node.js"].map((tech) => (
              <div
                key={tech}
                style={{
                  backgroundColor: "#1f1f1f",
                  color: "#e0e0e0",
                  padding: "8px 16px",
                  borderRadius: "20px",
                  fontSize: "18px",
                  border: "1px solid #333",
                }}
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            fontSize: "20px",
            color: "#666",
          }}
        >
          bryanpalay.me
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
