import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 по подразбиране разрешава само quality 75; добавяме 90 за
    // hero банера (LCP), за да не се coerce-ва обратно до 75.
    qualities: [75, 90, 100],
  },
};

export default nextConfig;
