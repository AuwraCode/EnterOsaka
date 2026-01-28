# BetScale Tracker

A minimalist web application for tracking business progress between two users. The goal is to monitor net profit (Profit) up to 5,000 PLN.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Configuration](#-configuration)
- [Deployment](#-deployment)
- [Usage Guide](#-usage-guide)
- [Security](#-security)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### Core Functionality
- **Progress Dashboard**: Two horizontal progress bars for Player A (Screampy) and Player B (Grzechu) showing percentage completion towards the goal (5,000 PLN)
- **Transaction Management**: Simple form to add transactions with amount, description, and date
- **Transaction History**: Comprehensive table showing all transactions from both players
- **Statistics Page**: Interactive charts and visualizations using Recharts
  - Progress to Goal line chart
  - Daily transaction amounts bar chart
- **Settings Page**: 
  - Admin panel with goal amount configuration
  - Player code setup and player selection
  - Transaction reset functionality

### User Experience
- **No Authentication Required**: Application works immediately without login
- **Responsive Design**: Fully optimized for mobile devices
- **Dark Theme**: Elegant "Old Money" style design
- **Real-time Updates**: Instant reflection of new transactions
- **Player Statistics**: Individual statistics per player (total, average per day, last transaction)

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **Charts**: Recharts 2.15

### Backend & Database
- **Database**: Supabase (PostgreSQL)
- **ORM/Client**: @supabase/ssr, @supabase/supabase-js
- **Authentication**: None (public application)

### Development Tools
- **Package Manager**: npm
- **Type Checking**: TypeScript 5.3
- **Linting**: ESLint (Next.js default)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase account (free tier works)
- Git

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/AuwraCode/EnterOsaka.git
cd EnterOsaka
```

2. **Install dependencies:**

```bash
npm install
```

3. **Set up Supabase:**

   - Create a project at [supabase.com](https://supabase.com)
   - Copy your project URL and anonymous key
   - Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_ACCESS_CODE=bet5000
NEXT_PUBLIC_ADMIN_CODE=admin123
```

4. **Run database migrations:**

   - Go to SQL Editor in Supabase dashboard
   - Execute migrations from `supabase/migrations/` in order:
     - `001_initial_schema.sql`
     - `006_allow_negative_amounts.sql` (allows negative transaction amounts)

5. **Start the development server:**

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

For detailed setup instructions, see [SETUP.md](./SETUP.md)

## 📁 Project Structure

```
EnterOsaka/
├── app/                          # Next.js App Router
│   ├── access/                  # Access page (code entry)
│   │   └── page.tsx
│   ├── dashboard/               # Dashboard pages
│   │   ├── layout.tsx           # Dashboard layout with auth check
│   │   ├── page.tsx             # Main dashboard
│   │   ├── settings/            # Settings page
│   │   │   └── page.tsx
│   │   └── statistics/          # Statistics page with charts
│   │       └── page.tsx
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page (redirects to dashboard)
│   └── globals.css              # Global styles
├── components/                   # React components
│   ├── DashboardContent.tsx     # Main dashboard component
│   ├── Navigation.tsx          # Navigation menu
│   ├── ProgressBars.tsx        # Progress bars for both players
│   ├── RewardCard.tsx          # Reward card with image and link
│   ├── TransactionForm.tsx     # Transaction input form
│   └── TransactionHistory.tsx  # Transaction history table
├── lib/                         # Utility libraries
│   └── supabase/
│       ├── client.ts           # Browser Supabase client
│       └── server.ts            # Server Supabase client
├── supabase/                    # Database migrations
│   └── migrations/
│       ├── 001_initial_schema.sql
│       ├── 002_remove_auth.sql
│       ├── 003_fix_rls.sql
│       ├── 004_force_disable_rls.sql
│       ├── 005_remove_user_id_column.sql
│       └── 006_allow_negative_amounts.sql
├── .env.example                 # Environment variables template
├── next.config.js               # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── vercel.json                  # Vercel deployment configuration
├── package.json                 # Dependencies and scripts
└── README.md                     # This file
```

## ⚙️ Configuration

### Environment Variables

| Variable | Required | Description | Default |
|----------|----------|-------------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Your Supabase project URL | - |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Your Supabase anonymous key | - |
| `NEXT_PUBLIC_ACCESS_CODE` | No | Access code for the application | `bet5000` |
| `NEXT_PUBLIC_ADMIN_CODE` | No | Admin panel access code | `admin123` |

### Database Schema

The application uses a single table `transactions`:

```sql
CREATE TABLE transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  player VARCHAR(1) NOT NULL CHECK (player IN ('A', 'B')),
  amount DECIMAL(10, 2) NOT NULL CHECK (amount != 0),
  description VARCHAR(255) NOT NULL,
  transaction_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🚀 Deployment

### Vercel (Recommended)

The application is ready for deployment on Vercel. See [VERCEL_DEPLOY.md](./VERCEL_DEPLOY.md) for detailed instructions.

**Quick Start:**

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Click "Deploy"

Vercel will automatically detect Next.js and configure the project.

### Other Platforms

For other hosting platforms:

1. Set environment variables in your hosting dashboard
2. Run `npm run build`
3. Deploy the `.next` folder or use the platform's build command

**Important**: Always set environment variables in your hosting platform's settings!

## 📱 Usage Guide

### Accessing the Application

1. Open the application URL
2. Enter the access code (default: `bet5000`)
3. You'll be redirected to the dashboard

### Adding Transactions

1. Select a player (Screampy - A or Grzechu - B)
2. Enter the transaction amount (can be negative for losses)
3. Add a description
4. Select the transaction date
5. Click "Add Transaction"

### Viewing Statistics

- Navigate to the **Statistics** page from the navigation menu
- View progress charts and daily transaction amounts
- Charts update automatically with new data

### Settings

- **Admin Panel**: Access with admin code to change goal amount or reset all transactions
- **Player Settings**: Set your personal player code and select which player you are

## 🎨 Design System

The application uses a minimalist dark theme inspired by "Old Money" aesthetics:

- **Colors**:
  - Background: Deep black (#0a0a0a)
  - Cards: Dark gray (#1a1a1a)
  - Borders: Medium gray (#3a3a3a)
  - Accent (Player A): Green (#22c55e)
  - Accent (Player B): Orange (#f97316)

- **Typography**: Inter font family
- **Spacing**: Generous white space for clean, professional look
- **Animations**: Smooth transitions and fade-in effects

## 🔒 Security

### Current State

- **Public Application**: All transactions are visible to everyone
- **No Authentication**: No user accounts or login required
- **No Row Level Security**: RLS is disabled for simplicity

### Future Considerations

If privacy is needed in the future:
- Add Supabase Authentication
- Enable Row Level Security (RLS)
- Implement user-specific data filtering

## 🧪 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Building for Production

```bash
npm run build
```

The build output will be in the `.next` folder.

## 🐛 Troubleshooting

### Common Issues

**Build fails with TypeScript errors:**
- Ensure all environment variables are set
- Check that `typeof window !== 'undefined'` guards are used for localStorage access

**Cannot connect to Supabase:**
- Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct
- Check that the `transactions` table exists in your database
- Ensure RLS is disabled or properly configured

**Charts not displaying:**
- Verify Recharts is installed: `npm install recharts`
- Check browser console for errors

For more troubleshooting tips, see [SETUP.md](./SETUP.md)

## 📝 License

Private project - All rights reserved.

## 👥 Contributing

This is a private project. Contributions are not currently accepted.

## 📞 Support

For issues or questions, please open an issue in the GitHub repository.

---

**Built with ❤️ using Next.js and Supabase**
