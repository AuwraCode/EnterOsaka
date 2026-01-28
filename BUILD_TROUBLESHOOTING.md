# Build Troubleshooting Guide

## Common Build Errors on Vercel

### Error: "Missing Supabase environment variables"

**Solution:**
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add the following required variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Redeploy the project

### Error: "TypeScript compilation failed"

**Possible causes:**
- Missing type definitions
- Type errors in code

**Solution:**
1. Run `npm run build` locally to see the exact error
2. Fix TypeScript errors
3. Ensure all dependencies are in `package.json`

### Error: "Module not found"

**Solution:**
1. Ensure `package.json` includes all dependencies
2. Run `npm install` locally to verify
3. Check that `node_modules` is in `.gitignore` (it should be)

### Error: "Build timeout"

**Solution:**
- Vercel has a default timeout of 45 minutes
- If your build takes longer, contact Vercel support or optimize your build

## Pre-deployment Checklist

- [ ] All environment variables are set in Vercel
- [ ] `npm run build` succeeds locally
- [ ] No TypeScript errors (`npm run build` should show none)
- [ ] All dependencies are in `package.json` (not just `package-lock.json`)
- [ ] `.env.local` is in `.gitignore` (should not be committed)
- [ ] Node.js version is compatible (project uses Node 18+)

## Verifying Build Locally

Before deploying, always test the production build locally:

```bash
npm run build
npm run start
```

Visit `http://localhost:3000` and verify everything works.

## Getting Build Logs from Vercel

1. Go to Vercel Dashboard
2. Click on your project
3. Go to "Deployments" tab
4. Click on the failed deployment
5. Check the "Build Logs" section for detailed error messages

## Contact

If build issues persist, check:
- Vercel build logs for specific error messages
- GitHub Issues for known problems
- Next.js documentation for build configuration
