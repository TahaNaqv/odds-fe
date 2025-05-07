
import { Moon, Sun, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  // Cycle through themes: light -> dark -> neon -> light
  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('neon');
    else setTheme('light');
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={cycleTheme}
      className="rounded-full"
    >
      {theme === 'dark' ? (
        <Moon className="h-5 w-5 text-slate-900 transition-all" />
      ) : theme === 'neon' ? (
        <Sparkles className="h-5 w-5 text-red-500 transition-all" />
      ) : (
        <Sun className="h-5 w-5 text-yellow-500 transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
