"use client";

import { IntegrationAppProvider } from "@integration-app/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <IntegrationAppProvider
      token={process.env.NEXT_PUBLIC_INTEGRATION_APP_TOKEN}
    >
      {children}
    </IntegrationAppProvider>
  );
}
