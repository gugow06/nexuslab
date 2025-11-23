# NexusLab - AI-Powered Career Development Platform

## Overview

NexusLab is a comprehensive career development platform that combines AI-powered mentoring, personalized learning paths, digital lab simulations, and professional opportunities. The platform helps users transition from their current position to their target role through structured learning trails, skill tracking, gamification, and well-being support.

The application provides:
- **AI Career Mentorship**: Personalized guidance using OpenAI integration
- **Career Roadmaps**: Visual pathways from current to target positions with AI-generated steps
- **Learning Trails**: Structured courses with modules and progress tracking
- **Digital Labs**: Scenario-based simulations for hands-on practice
- **Skills Passport**: Comprehensive skill tracking and proficiency management
- **Opportunity Marketplace**: Job/opportunity matching with application tracking
- **Community Features**: Gamification with challenges, achievements, and leaderboards
- **Well-being Tracking**: Mood logging with AI-powered wellness suggestions

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Routing**
- React 18+ with Wouter for client-side routing
- TypeScript for type safety across the application
- Vite as the build tool and development server

**UI Component System**
- shadcn/ui component library (New York style variant) for consistent, accessible components
- Radix UI primitives as the foundation for complex components
- TailwindCSS for utility-first styling with custom design tokens
- Lucide React for iconography
- Framer Motion for animations and transitions

**State Management**
- TanStack Query (React Query) for server state management, caching, and data synchronization
- React Hook Form with Zod for form state and validation
- React Context for theme management (light/dark mode)

**Design System**
- Custom color system using CSS variables for theme support
- Typography hierarchy with Inter (UI/body) and JetBrains Mono (code/technical)
- Spacing primitives based on Tailwind's scale
- Component library following design guidelines in `design_guidelines.md`
- Inspiration drawn from Linear, Notion, Coursera, and Duolingo

### Backend Architecture

**Server Framework**
- Express.js application with TypeScript
- Separate entry points for development (`index-dev.ts`) and production (`index-prod.ts`)
- Development mode uses Vite middleware for HMR
- Production mode serves pre-built static files

**API Design**
- RESTful API routes organized in `server/routes.ts`
- Route handlers grouped by domain (auth, AI, users, skills, trails, labs, opportunities, wellbeing, gamification)
- Request validation using Zod schemas shared between client and server
- Error handling with appropriate HTTP status codes

**Authentication & Security**
- Session-based authentication (structure suggests session storage)
- Password hashing using bcrypt (10 salt rounds)
- User roles: user, admin, company
- Password validation in login/registration flows

### Data Storage Solutions

**Database**
- PostgreSQL as primary database (via Neon serverless)
- Drizzle ORM for type-safe database queries and migrations
- WebSocket support for real-time capabilities (neonConfig with ws)

**Schema Design**
The database follows a normalized relational structure with the following core entities:

- **Users**: Central entity with authentication, profile, and career goal data
- **Skills**: Categorized skill catalog with descriptions
- **UserSkills**: Junction table tracking user skill proficiency levels
- **CareerRoutes**: AI-generated career pathways with steps and milestones
- **LearningTrails**: Structured learning content with difficulty and category
- **TrailModules**: Individual modules within trails
- **UserTrailProgress**: Tracks completion status per user per module
- **Labs**: Scenario-based simulations with complexity ratings
- **LabResults**: User lab completion data with scores and AI feedback
- **Opportunities**: Job/role listings with requirements
- **Applications**: User applications to opportunities with status tracking
- **WellbeingLogs**: Mood and wellness tracking entries
- **UserGamification**: XP, levels, and streak tracking
- **Challenges**: Time-bound challenges with reward systems
- **UserChallenges**: Junction tracking user challenge progress
- **Achievements**: Badge/achievement definitions
- **UserAchievements**: User-earned achievements

Relations are defined using Drizzle's relational API for type-safe joins and queries.

### External Dependencies

**AI Integration**
- OpenAI API (via Replit AI Integrations service)
- GPT-5 model for AI-powered features
- Functions implemented:
  - `generateCareerRoute`: Creates personalized career roadmaps
  - `generateSkillRecommendations`: Suggests skills for career transitions
  - `generateLabFeedback`: Provides feedback on lab performance
  - `generateWellnessSuggestion`: Offers well-being recommendations
  - `chatWithAI`: Powers the Nexus.AI chat assistant
- JSON-structured responses for structured data generation

**Third-Party UI Libraries**
- @radix-ui/* (v1.x): Accessible component primitives
- @tanstack/react-query (v5.x): Data fetching and caching
- cmdk: Command palette interface
- framer-motion: Animation library
- react-day-picker: Calendar/date selection
- recharts: Data visualization (via chart components)
- vaul: Drawer component
- embla-carousel-react: Carousel functionality
- input-otp: OTP input component

**Development Tools**
- @replit/vite-plugin-runtime-error-modal: Error overlay
- @replit/vite-plugin-cartographer: Development tooling
- @replit/vite-plugin-dev-banner: Development banner

**Database & Infrastructure**
- @neondatabase/serverless: Neon PostgreSQL client
- drizzle-orm & drizzle-kit: ORM and migration tools
- connect-pg-simple: PostgreSQL session store
- ws: WebSocket library for Neon

**Validation & Utilities**
- zod: Schema validation (shared schemas via drizzle-zod)
- @hookform/resolvers: React Hook Form Zod integration
- bcrypt: Password hashing
- date-fns: Date manipulation
- clsx & tailwind-merge: Class name utilities (via cn helper)
- class-variance-authority: Component variant management

**Build & Deployment**
- Vercel (indicated as deployment target)
- esbuild: Production server bundling
- tsx: TypeScript execution for development
- PostCSS with Autoprefixer: CSS processing