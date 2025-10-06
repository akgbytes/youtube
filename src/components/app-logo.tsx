"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

const AppLogo = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative h-8 w-8">
      <Image
        src={theme === "dark" ? "/app_dark.png" : "/app_light.png"}
        alt="logo"
        fill
        sizes="32px"
        style={{ objectFit: "contain" }}
        priority
      />
    </div>
  );
};

export default AppLogo;
