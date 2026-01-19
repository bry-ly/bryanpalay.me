# Portfolio

A [Next.js](https://nextjs.org) portfolio site built with TypeScript, Tailwind CSS, and Radix UI.

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy environment variables:
   ```bash
   cp .env.example .env
   ```
4. Fill in required environment variables (see [Environment Setup](#environment-setup))
5. Start development server:
   ```bash
   npm run dev
   ```
6. Open [http://localhost:3000](http://localhost:3000)

## Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `next dev` | Start development server with hot reload |
| `build` | `next build` | Create production build |
| `start` | `next start` | Start production server |
| `lint` | `eslint` | Run ESLint for code quality checks |

## Environment Setup

Copy `.env.example` to `.env` and configure:

| Variable | Required | Description |
|----------|----------|-------------|
| `APP_URL` | Yes | Base URL of the website |
| `NEXT_PUBLIC_DMCA_URL` | No | DMCA protection badge URL |
| `GITHUB_API_TOKEN` | Yes | GitHub API token for fetching data |
| `RESEND_API_KEY` | Yes | Resend API key for email delivery |
| `CONTACT_EMAIL` | Yes | Email address for contact form submissions |

### Obtaining API Keys

- **GitHub Token**: [Create token](https://github.com/settings/tokens) with `read:user` scope
- **Resend API Key**: [Get key](https://resend.com/api-keys) after creating account

## Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI
- **Animation**: Motion, React Three Fiber
- **Email**: Resend
- **Content**: MDX

---

## Operations Runbook

### Deployment

#### Vercel (Recommended)

1. Connect repository to [Vercel](https://vercel.com)
2. Configure environment variables in Vercel dashboard
3. Deploy triggers automatically on push to main branch

#### Manual Deployment

```bash
npm run build
npm run start
```

### Common Issues and Fixes

| Issue | Cause | Solution |
|-------|-------|----------|
| Build type errors | TypeScript strict mode | Fix type issues shown in build output |
| Missing env vars | Environment not configured | Add required vars to `.env` or Vercel |
| 500 on contact form | Invalid `RESEND_API_KEY` | Verify API key is valid |
| GitHub data missing | Invalid `GITHUB_API_TOKEN` | Regenerate token with correct scopes |

### Rollback (Vercel)

1. Go to Vercel Dashboard > Deployments
2. Find the last working deployment
3. Click "..." menu > "Promote to Production"

### Rollback (Git)

```bash
git log --oneline
git revert <commit-hash>
git push origin main
```

---

## Contributing

1. Follow existing code patterns
2. Run linting before submitting:
   ```bash
   npm run lint
   ```
3. Verify build succeeds:
   ```bash
   npm run build
   ```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Next.js GitHub](https://github.com/vercel/next.js)
- [Next.js Deployment](https://nextjs.org/docs/app/building-your-application/deploying)
