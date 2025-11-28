# Nepal Science Navigators (NSN) Science Fair Website

A modern, responsive website for Nepal Science Navigators - Nepal's premier science fair competition platform.

## Features

- **12 Pages**: Home, About, Categories, Schedule, Blog, Gallery, News, Notices, Videos, Contact, Admin Dashboard, Admin Login
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Smooth Animations**: Framer Motion animations throughout
- **Admin Dashboard**: Full content management system
- **Contact Form**: User inquiry submission

## Tech Stack

- React 18 + TypeScript
- Express.js backend
- Tailwind CSS + Shadcn/UI
- Framer Motion animations
- Wouter routing

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app runs at `http://localhost:5000`

## Deployment to Render

### Option 1: Deploy from GitHub

1. Push this code to a GitHub repository
2. Go to [Render Dashboard](https://dashboard.render.com)
3. Click "New" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment Variables**:
     - `SESSION_SECRET` = (generate a random string)
     - `NODE_ENV` = `production`

### Option 2: Deploy with render.yaml

Create a `render.yaml` file in your repo:

```yaml
services:
  - type: web
    name: nsn-science-fair
    runtime: node
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: SESSION_SECRET
        generateValue: true
      - key: NODE_ENV
        value: production
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `SESSION_SECRET` | Yes (production) | Secret for session encryption |
| `NODE_ENV` | No | Set to `production` for production builds |

## Admin Access

Default credentials:
- **Username**: `admin`
- **Password**: `admin123`

**Important**: Change the default password after first login!

## Project Structure

```
├── client/           # React frontend
│   ├── src/
│   │   ├── components/
│   │   └── pages/
├── server/           # Express backend
│   ├── routes.ts
│   ├── storage.ts
│   └── auth.ts
└── shared/           # Shared types
```

## Data Storage

The application uses in-memory storage with preloaded mock data. Data resets on server restart, which is ideal for demo/showcase purposes.

## License

MIT
