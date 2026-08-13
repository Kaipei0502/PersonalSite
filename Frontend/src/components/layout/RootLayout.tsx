import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function RootLayout() {
  return (
    <div className="flex min-h-screen min-w-0 flex-col text-slate-900">
      <Header />

      <main className="min-w-0 flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
