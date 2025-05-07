
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider, useTheme } from "@/components/ThemeProvider";
import { ThemePreviewBanner } from "@/components/ThemePreviewBanner";
import Index from "./pages/Index";
import PastActivity from "./pages/PastActivity";
import RaffleHistory from "./pages/RaffleHistory";
import NotFound from "./pages/NotFound";
import ActivityPreviewPage from "./pages/ActivityPreviewPage";
import ActivityCalendarPage from "./pages/ActivityCalendarPage";
import TermsPage from "./pages/TermsPage";
import { useEffect } from "react";

// New imports for other footer pages
const PrivacyPage = () => (
  <div className="container mx-auto py-10">
    <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
    <p className="text-muted-foreground">This page contains our privacy policy.</p>
  </div>
);

const LegalityPage = () => (
  <div className="container mx-auto py-10">
    <h1 className="text-3xl font-bold mb-6">Legality</h1>
    <p className="text-muted-foreground">This page contains information about the legality of our service.</p>
  </div>
);

// Theme preview component
const ThemeManager = () => {
  const { setTheme } = useTheme();
  const location = useLocation();
  
  useEffect(() => {
    // If we're on the neon-nights preview route, set theme to neon
    if (location.pathname === '/theme/neon-nights') {
      setTheme('neon');
      return;
    }
  }, [location.pathname, setTheme]);

  return (
    location.pathname === '/theme/neon-nights' && <ThemePreviewBanner themeName="neon" />
  );
};

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/history" element={<RaffleHistory />} />
              <Route path="/activity" element={<PastActivity />} />
              <Route path="/activity-preview" element={<ActivityPreviewPage />} />
              <Route path="/activity-calendar" element={<ActivityCalendarPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/legality" element={<LegalityPage />} />
              <Route path="/theme/neon-nights" element={<Index />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ThemeManager />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
