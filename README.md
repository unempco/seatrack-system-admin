# Seatrack System Admin

An admin dashboard application for tracking check-in and check-out of equipment — such as devices and storage units — by employees who are part of a testing team. Built with React, TypeScript, and a curated stack of modern tools, using Supabase as the backend (API/Database).

## 📋 Overview

Seatrack System Admin allows a testing team to keep a reliable record of equipment movement: who took a device or storage unit out, and when it was returned. It provides authentication, multi-language support, theming, and pre-built data table components for managing this data efficiently.

## 🏗️ Tech Stack

### Core Framework

- **React 19** - Latest React with concurrent features
- **TypeScript 5.9** - Strict type-safe development
- **Vite 7** - Lightning-fast build tool and dev server
- **SWC** - Ultra-fast JavaScript/TypeScript compiler for hot module replacement

### Backend

- **Supabase** - Backend-as-a-service providing the API and database

### Routing & State Management

- **TanStack React Router** - Type-safe file-based routing with automatic code splitting
- **TanStack React Query (v5)** - Powerful server state management and caching
- **TanStack React Table (v8)** - Headless table component for complex data management

### UI & Styling

- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Unstyled, accessible component primitives
- **Shadcn Components** - Pre-built accessible UI components
- **Phosphor Icons** - Beautiful, customizable icon library
- **Sonner** - Beautiful toast notifications

### Forms & Validation

- **React Hook Form** - Performant, flexible form handling
- **Zod** - TypeScript-first schema validation

### Internationalization

- **i18next** - Internationalization framework
- **react-i18next** - React bindings for i18next
- **Supported Languages**: English (en), Spanish (es)

### Additional Libraries

- **date-fns & dayjs** - Date manipulation utilities
- **js-cookie** - Cookie handling
- **next-themes** - Theme management (light/dark/system)
- **class-variance-authority** - CSS utility composition
- **clsx & tailwind-merge** - Class name utilities

### Development Tools

- **ESLint** - Code linting and quality
- **Prettier** - Code formatting with import sorting
- **TypeScript Strict Mode** - Maximum type safety

## 📁 Project Structure

```
src/
├── core/                    # Shared core utilities
│   ├── api/                 # HTTP request handling and API utilities
│   ├── components/          # Reusable UI components
│   │   ├── data/           # Data table components (paginator, search, etc.)
│   │   ├── form-fields/    # Form field components
│   │   └── ui/             # Basic UI primitives
│   ├── constants/          # App-wide constants
│   ├── errors/             # Error definitions
│   ├── hooks/              # Reusable React hooks
│   ├── lib/                # Utility functions
│   └── types/              # Shared TypeScript types
├── layout/                  # Layout components and theme system
│   ├── components/         # Layout UI (header, sidebar, breadcrumb)
│   ├── contexts/           # Theme provider context
│   ├── hooks/              # Layout-related hooks
│   └── lib/                # Layout utilities
├── modules/                 # Feature modules
│   ├── auth/               # Authentication module
│   └── shared/             # Shared module components
├── routes/                  # File-based routing structure
│   ├── __root.tsx          # Root route with app layout
│   └── app/                # Protected routes
├── locales/                 # i18n translation files
│   ├── en/                 # English translations
│   └── es/                 # Spanish translations
├── styles/                  # Global styles
├── i18n.ts                 # i18next configuration
├── main.tsx                # Application entry point
└── project.config.ts       # Application configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (22+ recommended)
- pnpm (or npm/yarn)
- A Supabase project (URL and anon key)

### Installation

```bash
# Install dependencies
pnpm install

# Copy the environment variables template
cp .env.example .env

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Lint code
pnpm lint

# Format code
pnpm format
```

## 🔐 Authentication

Authentication is handled through Supabase, providing:

- Secure sign-in backed by Supabase Auth
- Session persistence and automatic session refresh
- Protected routes with authentication context
- Role-based access control ready for extension

## 🌍 Internationalization

The app supports multiple languages with easy switching:

- Default language detection from user preferences
- Language switching through `useTranslation()` hook
- Translation files organized by language in `src/locales/`

```typescript
import { useTranslation } from 'react-i18next';

const { t, i18n } = useTranslation();
i18n.changeLanguage('es'); // Switch to Spanish
```

## 🎨 Theme Support

Built-in dark/light/system theme support:

```typescript
import { useTheme } from '@/layout/hooks/use-theme';

const { theme, setTheme } = useTheme();
setTheme('dark');
```

## 📊 Data Tables

Pre-built data table components with:

- Sorting and filtering
- Server-side pagination
- Search functionality
- Row selection with checkboxes
- Customizable columns

## 🔧 Configuration

Key configuration files:

- `vite.config.ts` - Vite build configuration (base path for GitHub Pages)
- `tsconfig.json` - TypeScript configuration
- `eslint.config.js` - Linting rules
- `prettier.config.js` - Code formatting
- `tailwind.config.js` - Tailwind CSS configuration
- `src/project.config.ts` - Application configuration (branding, etc.)

### Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
# Router Configuration
VITE_BROWSER_HISTORY=true  # Use browser history instead of hash history

# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## 🔄 CI/CD

The repository includes two GitHub Actions workflows:

- **`ci.yml`** - Runs on pull requests targeting `main` or `develop`. It checks Prettier formatting (`pnpm exec prettier --check .`) and verifies the project builds successfully (`pnpm build`), failing fast on formatting issues, TypeScript errors, or Vite build/compilation errors. Keep this in mind before opening a PR — run `pnpm format` and `pnpm build` locally to catch issues early.
- **`deploy.yml`** - Handles the actual deployment to GitHub Pages (see below).

## 🚢 Deployment

The project is currently deployed to **GitHub Pages** via the included `deploy.yml` workflow.

### Running locally or on your own server

Copy `.env.example` to `.env` and set the values described above.

### Deploying via the GitHub Pages workflow

If you want to keep using `deploy.yml` for GitHub Pages, the environment variables must instead be configured as **Production environment variables** in the repository settings (Settings → Environments → Production), since the workflow builds the app in CI and doesn't read a local `.env` file.

### Base path

By default, the project is configured to run under the path GitHub Pages provides automatically: `<organization>.github.io/<repository-name>`. If a custom domain is set up in the future, update the `base` option in `vite.config.ts` accordingly.

## 📝 Development Guidelines

- Use **TanStack Router** for all routing - avoid manual route management
- Leverage **React Query** for server state - use hooks from `useQuery`, `useMutation`
- Keep components **small and focused** - extract reusable components to `core/components`
- Use **Zod schemas** for form validation
- Add translations to locale files instead of hardcoding strings
- Follow the **modular structure** - group related features in `modules/`

## 🤝 Contributing

- Run `pnpm lint` before committing
- Run `pnpm format` to format code
- Follow TypeScript strict mode practices
- Add translations for new user-facing strings

## 📄 License

This project is private and proprietary.
