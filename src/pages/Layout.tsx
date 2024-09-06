import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Toaster } from "@/components/ui/sonner";

function Layout() {
  return (
    <ThemeProvider storageKey="vite-ui-theme">
      <main className="fullHeight bg-[#f5f5f5] dark:bg-[#1E1E1E] flex dark:text-[#E0E0E0] text-[#333333] w-full">
        <div className="grow w-full">
          <Outlet />
          <Toaster richColors />
        </div>
      </main>
      <div className="fixed bottom-3 left-3">
        <ThemeToggle></ThemeToggle>
      </div>
    </ThemeProvider>
  );
}

export default Layout;
