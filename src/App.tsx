import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState<Array<{ username: string; timestamp: string; ip: string }>>([]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleFailedAttempt = (username: string) => {
    const newAttempt = {
      username,
      timestamp: new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }),
      ip: "Unknown",
    };
    setFailedAttempts((prev) => [newAttempt, ...prev]);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {isAuthenticated ? (
          <Index onLogout={handleLogout} failedAttempts={failedAttempts} />
        ) : (
          <Login onLogin={handleLogin} onFailedAttempt={handleFailedAttempt} />
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
