import { createAppKit } from "@reown/appkit/react";
import { WagmiProvider } from "wagmi";
import { baseSepolia } from "@reown/appkit/networks";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Home from "./pages/Home";
import PastActivity from "./pages/PastActivity";
import RaffleHistory from "./pages/RaffleHistory";
import NotFound from "./pages/NotFound";
import ActivityPreviewPage from "./pages/ActivityPreviewPage";
import ActivityCalendarPage from "./pages/ActivityCalendarPage";
import TermsPage from "./pages/TermsPage";
import ReferralLeaderboardPage from "./pages/ReferralLeaderboardPage";
import MarketingLandingPage from "./pages/MarketingLandingPage";
import MarketingLandingPage2 from "./pages/MarketingLandingPage2";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Layout } from "@/components/layout/Layout";

// New imports for other footer pages
const PrivacyPage = () => (
  <div className="container mx-auto py-10">
    <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
    <p className="text-muted-foreground">
      This page contains our privacy policy.
    </p>
  </div>
);

const LegalityPage = () => (
  <div className="container mx-auto py-10">
    <h1 className="text-3xl font-bold mb-6">Legality</h1>
    <p className="text-muted-foreground">
      This page contains information about the legality of our service.
    </p>
  </div>
);

const queryClient = new QueryClient();

// 1. Get projectId from https://cloud.reown.com
const projectId = "9d02f439d5aae2419d7a7583a53fa6cd";

// 2. Create a metadata object - optional
const metadata = {
  name: "Odds",
  description: "Odds Dapp Lottery System",
  url: "https://odds-fe.netlify.app",
  icons: [
    "https://preview--raffle-river.lovable.app/lovable-uploads/c955157a-772b-4ee5-b0e0-e45ef31ea9e0.png",
  ],
};

// 3. Set the networks
const networks = [baseSepolia] as [typeof baseSepolia];

// 4. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true,
});

// 5. Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  themeVariables: {
    "--w3m-accent": "#7C3AED",
    "--w3m-color-mix": "#8B5CF6",
    "--w3m-color-mix-strength": 20,
  },
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
    email: false, // default to true
    socials: [],
  },
});

function App() {
  return (
    <ThemeProvider>
      <WagmiProvider config={wagmiAdapter.wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<MarketingLandingPage2 />} />
                  <Route path="*" element={
                    <Layout>
                      <Routes>
                        <Route path="/home" element={<Home />} />
                        <Route path="/marketing" element={<MarketingLandingPage />} />
                        <Route path="/history" element={<RaffleHistory />} />
                        <Route path="/activity" element={<PastActivity />} />
                        <Route
                          path="/activity-preview"
                          element={<ActivityPreviewPage />}
                        />
                        <Route
                          path="/activity-calendar"
                          element={<ActivityCalendarPage />}
                        />
                        <Route path="/terms" element={<TermsPage />} />
                        <Route path="/privacy" element={<PrivacyPage />} />
                        <Route path="/legality" element={<LegalityPage />} />
                        <Route
                          path="/referrals"
                          element={<ReferralLeaderboardPage />}
                        />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </Layout>
                  } />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </AuthProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  );
}

export default App;
