# CRM Quick Form

A modern, responsive web application for quickly creating contacts in multiple CRM platforms.

## Overview

CRM Quick Form provides a streamlined interface for creating contacts in different CRM systems like Pipedrive and HubSpot. Built with Next.js and styled with Tailwind CSS, it features a multi-step process that guides users through CRM selection and contact form submission, making it intuitive and efficient.

## Features

- **Multi-CRM Support**: Connect to Pipedrive or HubSpot from a single interface
- **Two-Step Process**: Select CRM first, then fill out contact details
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean, accessible interface with Tailwind CSS
- **Result Page**: Clear feedback on contact creation with relevant links
- **Streamlined Workflow**: Add multiple contacts to the same CRM with minimal clicks

## Tech Stack

- **Frontend**: Next.js 14 (React)
- **Styling**: Tailwind CSS
- **Languages**: TypeScript
- **Architecture**: Component-based with proper separation of concerns

## Project Structure

```
crm_quickform/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── CRMSelector.tsx    # CRM selection component
│   │   │   ├── CRMForm.tsx        # Contact form component
│   │   │   └── CRMResult.tsx      # Result display component
│   │   ├── types/
│   │   │   └── crm.ts             # TypeScript types for the app
│   │   ├── result/
│   │   │   └── page.tsx           # Result page
│   │   ├── globals.css            # Global styles
│   │   ├── layout.tsx             # App layout
│   │   └── page.tsx               # Main page (CRM selection & form)
│   └── lib/
│       └── integration.ts         # CRM integration API
├── public/                        # Static assets
├── tailwind.config.js             # Tailwind configuration
├── tsconfig.json                  # TypeScript configuration
└── package.json                   # Project dependencies
```

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- HubSpot account
- Pipedrive account

### Required Credentials

#### HubSpot

1. Go to [HubSpot Settings](https://app.hubspot.com/settings)
2. Navigate to Account Setup > Account Information
3. Find your Portal ID in the Account Information section
4. The base URL will be in the format: `https://app-{region}.hubspot.com`

#### Pipedrive

1. Log in to your Pipedrive account
2. The base URL will be in the format: `https://{company-name}.pipedrive.com`
3. You can find this in your browser's address bar when logged into Pipedrive

### Environment Setup

1. Create a `.env.local` file in the project root:

```env
# HubSpot Configuration
NEXT_PUBLIC_HUBSPOT_BASE_URL=https://app-{region}.hubspot.com
NEXT_PUBLIC_HUBSPOT_PORTAL_ID=your_portal_id

# Pipedrive Configuration
NEXT_PUBLIC_PIPEDRIVE_BASE_URL=https://{company-name}.pipedrive.com

# Integration App Token (if required)
NEXT_PUBLIC_INTEGRATION_APP_TOKEN=your_integration_token
```

2. Create a `.env.example` file (for reference):

```env
# HubSpot Configuration
NEXT_PUBLIC_HUBSPOT_BASE_URL=https://app-{region}.hubspot.com
NEXT_PUBLIC_HUBSPOT_PORTAL_ID=your_portal_id

# Pipedrive Configuration
NEXT_PUBLIC_PIPEDRIVE_BASE_URL=https://{company-name}.pipedrive.com

# Integration App Token
NEXT_PUBLIC_INTEGRATION_APP_TOKEN=your_integration_token
```

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/crm_quickform.git
   cd crm_quickform
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   - Copy `.env.example` to `.env.local`
   - Fill in your actual credentials

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. **Select CRM**: Choose between Pipedrive and HubSpot
2. **Fill Form**: Enter contact details in the form
3. **Submit**: Create the contact in the selected CRM
4. **View Result**: See confirmation and navigate to add more contacts

## Customization

### Adding More CRMs

To add support for additional CRM platforms:

1. Update the `CRMType` type in `src/app/types/crm.ts`
2. Add the new CRM to the `crmOptions` array in `CRMSelector.tsx`
3. Implement the connection in `src/lib/integration.ts`
4. Add corresponding environment variables

### Styling

The application uses Tailwind CSS for styling. Customize the look and feel by modifying:

- `tailwind.config.js` for theme settings
- Component-level classes for specific UI elements

## Accessibility

The application follows accessibility best practices:

- Semantic HTML
- ARIA attributes where appropriate
- Keyboard navigation
- Color contrast compliance
- Focus management

## Deployment

When deploying to platforms like Vercel:

1. Add all environment variables in your deployment platform's settings
2. Ensure all required environment variables are set
3. Never commit `.env.local` to version control

## License

[MIT License](LICENSE)

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Icons](https://react-icons.github.io/react-icons/)

---

This project was created as a demonstration of modern React application development with component-based architecture and type safety.
