import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// A round-cut stone on the brand green.
export default async function Icon() {
  const round = await readFile(join(process.cwd(), "public/diamonds/round.png"), "base64");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1b3a22",
          borderRadius: 14,
        }}
      >
        <img src={`data:image/png;base64,${round}`} alt="" width={50} height={50} />
      </div>
    ),
    size,
  );
}
