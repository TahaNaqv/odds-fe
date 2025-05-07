
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";

interface ThemePreviewBannerProps {
  themeName: string;
}

export const ThemePreviewBanner = ({ themeName }: ThemePreviewBannerProps) => {
  const { setTheme } = useTheme();
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-0 right-0 mx-auto w-max z-50 px-6 py-3 bg-card shadow-elevated rounded-lg border border-border flex items-center gap-4">
      <div>
        <p className="font-medium">
          Previewing{" "}
          <span className={
            themeName === "neon" 
              ? "text-[#C3073F] font-bold" 
              : themeName === "gold" 
                ? "text-[#FFD700] font-bold" 
                : themeName === "vibrant"
                  ? "text-[#FF6F61] font-bold"
                  : ""
          }>
            {themeName === "neon" ? "Neon Nights" : themeName === "gold" ? "Digital Gold" : themeName === "vibrant" ? "Vibrant Gradient" : themeName}
          </span>{" "}
          theme
        </p>
        <p className="text-sm text-muted-foreground">
          You can return to your previous theme at any time
        </p>
      </div>
      <div className="flex gap-2">
        <Button
          variant="default"
          onClick={() => {
            localStorage.setItem("theme", themeName);
            setIsVisible(false);
          }}
        >
          Apply Theme
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
