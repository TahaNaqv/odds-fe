import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  // Cycle through themes: light -> dark -> light
  const cycleTheme = () => {
    if (theme === "light") setTheme("dark");
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
        <Moon className="h-6 w-6 md:h-7 md:w-7 mx-auto my-auto transition-all" />
      ) : (
        <Sun className="h-6 w-6 md:h-7 md:w-7 mx-auto my-auto transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
