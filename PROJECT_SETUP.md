# Project Setup & Dependencies

This document serves as a reference for all libraries, frameworks, and technologies used in this project.

## Core Framework & Runtime
- **Next.js**: 16.0.1 (App Router)
- **React**: 19.2.0
- **React DOM**: 19.2.0
- **TypeScript**: ^5

## Styling & UI Framework
- **Tailwind CSS**: ^4 (Latest version with PostCSS)
- **shadcn/ui**: Configured with "new-york" style
  - Base color: Neutral
  - CSS Variables: Enabled
  - Icon Library: Lucide React
  - RSC: Enabled
  - TSX: Enabled

## UI Components Library (shadcn/ui)
All 54 components installed:
- Accordion, Alert, Alert Dialog, Aspect Ratio
- Avatar, Badge, Breadcrumb, Button, Button Group
- Calendar, Card, Carousel, Chart
- Checkbox, Collapsible, Command
- Context Menu, Dialog, Drawer, Dropdown Menu
- Empty, Field, Form
- Hover Card, Input, Input Group, Input OTP
- Item, KBD, Label, Menubar
- Navigation Menu, Pagination, Popover
- Progress, Radio Group, Resizable
- Scroll Area, Select, Separator
- Sheet, Sidebar, Skeleton, Slider
- Sonner, Spinner, Switch
- Table, Tabs, Textarea
- Toggle, Toggle Group, Tooltip

## Icon Library
- **Lucide React**: ^0.552.0

## Animation Library
- **Framer Motion**: ^12.23.24

## Supporting Libraries
- **@radix-ui**: All Radix UI primitives (used by shadcn)
- **class-variance-authority**: ^0.7.1
- **clsx**: ^2.1.1
- **tailwind-merge**: ^3.3.1
- **next-themes**: ^0.4.6 (Theme provider)
- **react-hook-form**: ^7.66.0
- **@hookform/resolvers**: ^5.2.2
- **zod**: ^4.1.12 (Schema validation)
- **date-fns**: ^4.1.0
- **react-day-picker**: ^9.11.1
- **cmdk**: ^1.1.1 (Command menu)
- **embla-carousel-react**: ^8.6.0
- **recharts**: ^2.15.4
- **sonner**: ^2.0.7 (Toast notifications)
- **vaul**: ^1.1.2 (Drawer component)
- **react-resizable-panels**: ^3.0.6
- **input-otp**: ^1.4.2

## Development Tools
- **ESLint**: ^9
- **eslint-config-next**: 16.0.1
- **tw-animate-css**: ^1.4.0

## Project Configuration
- **Import Alias**: `@/*` (configured in tsconfig.json)
- **Component Path**: `@/components`
- **UI Components Path**: `@/components/ui`
- **Utils Path**: `@/lib/utils`
- **Hooks Path**: `@/hooks`

## Notes
- Project uses App Router (not Pages Router)
- All components are TypeScript-based
- Dark mode support via CSS variables
- RSC (React Server Components) enabled

