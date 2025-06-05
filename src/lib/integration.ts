import { IntegrationAppClient } from '@integration-app/sdk';

// Initialize the Integration.app SDK
export const integrationApp = new IntegrationAppClient({
  token: process.env.NEXT_PUBLIC_INTEGRATION_APP_TOKEN,
}); 