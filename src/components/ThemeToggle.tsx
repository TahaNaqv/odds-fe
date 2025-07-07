import {
  Moon,
  Sun,
  Sparkles,
  Trophy,
  Palette,
  Zap,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  // Cycle through themes: light -> dark -> neon -> gold -> vibrant -> cyber -> trusty -> light
  const cycleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("neon");
    else if (theme === "neon") setTheme("gold");
    else if (theme === "gold") setTheme("vibrant");
    else if (theme === "vibrant") setTheme("cyber");
    else if (theme === "cyber") setTheme("trusty");
    else setTheme("light");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={cycleTheme}
      className="rounded-full flex items-center justify-center w-10 h-10 md:w-11 md:h-11 p-0 focus:outline-none focus:ring-2 focus:ring-primary/70 hover:bg-accent/60 active:scale-95 transition-all duration-150"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Moon className="h-6 w-6 md:h-7 md:w-7 mx-auto my-auto text-slate-900 transition-all" />
      ) : theme === "neon" ? (
        <Sparkles className="h-6 w-6 md:h-7 md:w-7 mx-auto my-auto text-red-500 transition-all" />
      ) : theme === "gold" ? (
        <Trophy className="h-6 w-6 md:h-7 md:w-7 mx-auto my-auto text-yellow-500 transition-all" />
      ) : theme === "vibrant" ? (
        <Palette className="h-6 w-6 md:h-7 md:w-7 mx-auto my-auto text-pink-500 transition-all" />
      ) : theme === "cyber" ? (
        <Zap className="h-6 w-6 md:h-7 md:w-7 mx-auto my-auto text-cyan-500 transition-all" />
      ) : theme === "trusty" ? (
        <Shield className="h-6 w-6 md:h-7 md:w-7 mx-auto my-auto text-blue-500 transition-all" />
      ) : (
        <Sun className="h-6 w-6 md:h-7 md:w-7 mx-auto my-auto text-yellow-500 transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
