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

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

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

## License

[MIT License](LICENSE)

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Icons](https://react-icons.github.io/react-icons/)

---

This project was created as a demonstration of modern React application development with component-based architecture and type safety.
