import { useEffect } from "react";
import { useRouteError } from "react-router-dom";
import PageState from "../components/ui/PageState";

export default function RouteErrorPage() {
  const error = useRouteError();

  useEffect(() => {
    console.error("Unhandled route error", error);
  }, [error]);

  return (
    <main className="section-shell flex min-h-screen items-center justify-center">
      <div className="w-full max-w-2xl">
        <PageState
          kind="error"
          title="頁面發生未預期的錯誤"
          description="請重新載入頁面；如果問題持續發生，請稍後再試。"
          onRetry={() => window.location.reload()}
        />
      </div>
    </main>
  );
}
