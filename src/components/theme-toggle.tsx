"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import ThemeIcon from "./theme-icon";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => (theme === "dark" ? setTheme("light") : setTheme("dark"))}
    >
      <ThemeIcon />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
