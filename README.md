# Nepal Science Navigators (NSN) Science Fair Website

A modern, responsive website for Nepal Science Navigators - Nepal's premier science fair competition platform.

## Features

- **Home Page**: Dynamic hero section with statistics and call-to-action
- **About Page**: Organization mission, vision, founder info, and board members
- **Categories**: Browse science fair competition categories
- **Schedule**: Event timeline with dates, times, and locations
- **Blog**: Articles and insights about science education
- **Gallery**: Photo gallery from past events
- **News**: Latest science news and updates
- **Notices**: Important announcements and updates
- **Videos**: YouTube video gallery
- **Contact**: Contact form for inquiries
- **Admin Dashboard**: Full content management system

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Shadcn/UI
- **Backend**: Node.js, Express.js
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **State Management**: TanStack Query
- **Routing**: Wouter
- **Authentication**: Passport.js with session-based auth

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/nsn-science-fair.git
cd nsn-science-fair
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5000`

## Environment Variables

Create a `.env` file in the root directory:

```env
# Required
SESSION_SECRET=your-secure-session-secret

# Optional - for MongoDB persistence (uses in-memory storage by default)
MONGODB_URI=mongodb://your-mongodb-connection-string
```

## Building for Production

```bash
npm run build
npm start
```

## Deployment

### Render

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set the following:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment Variables**: Add `SESSION_SECRET`

### Other Platforms

The app can be deployed to any Node.js hosting platform:
- Heroku
- Railway
- Fly.io
- DigitalOcean App Platform

## Admin Access

Default admin credentials:
- **Username**: admin
- **Password**: admin123

**Important**: Change the default password after first login!

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utility functions
│   └── index.html
├── server/                 # Backend Express application
│   ├── routes.ts           # API routes
│   ├── storage.ts          # Data storage layer
│   └── auth.ts             # Authentication setup
├── shared/                 # Shared types and schemas
│   ├── schema.ts           # Database schema
│   └── types.ts            # TypeScript types
└── package.json
```

## License

MIT License

## Support

For questions or support, contact info@nsnsciencefair.org
