# Deployment Guide - Vercel

This guide will help you deploy your League of Legends Stats website to Vercel.

## Prerequisites

- A GitHub account
- A Vercel account (sign up at [vercel.com](https://vercel.com))
- Your project pushed to a GitHub repository

## Step-by-Step Deployment

### 1. Prepare Your Repository

First, commit all your changes and push to GitHub:

```bash
git add .
git commit -m "Initial commit - League of Legends Stats website"
git push origin main
```

### 2. Import Project to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Vercel will automatically detect Next.js configuration

### 3. Configure Build Settings

Vercel should automatically detect these settings:

- **Framework Preset**: Next.js
- **Build Command**: `next build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### 4. Environment Variables (Optional)

If you need any environment variables in the future, add them in the Vercel dashboard under:
`Settings → Environment Variables`

### 5. Deploy

Click "Deploy" and Vercel will:
1. Install dependencies
2. Build your Next.js application
3. Deploy to their global CDN
4. Provide you with a production URL

## Deployment Details

### Build Process

When you deploy, Vercel will:
1. Install all npm packages
2. Run `next build` which:
   - Compiles TypeScript
   - Optimizes images
   - Generates static pages for all champions
   - Creates optimized bundles
3. Deploy to edge network

### Static Site Generation

All champion pages are pre-rendered at build time using `generateStaticParams`:
- Home page (`/`)
- All champion detail pages (`/champions/[id]`)

This means:
- ⚡ Lightning-fast page loads
- 🌍 Excellent SEO
- 💰 Free hosting on Vercel
- 🚀 Global CDN distribution

### Build Time

Expected build time: 2-5 minutes
- Depends on number of champions (170+)
- Each champion page is statically generated

## Continuous Deployment

Vercel automatically sets up continuous deployment:

- **Production**: Commits to `main` branch
- **Preview**: Pull requests get preview URLs
- **Instant Rollback**: Easily rollback to previous deployments

### Automatic Deployments

Every time you push to GitHub:
```bash
git add .
git commit -m "Update feature"
git push origin main
```

Vercel will automatically:
1. Detect the push
2. Build the project
3. Deploy if build succeeds
4. Send you a deployment notification

## Custom Domain (Optional)

To use a custom domain:

1. Go to your project in Vercel
2. Settings → Domains
3. Add your domain
4. Follow DNS configuration instructions
5. Vercel handles SSL automatically

Example:
- `lolstats.example.com`
- `champions.example.com`

## Performance Optimization

Vercel automatically provides:
- ✅ Global CDN distribution
- ✅ Automatic SSL certificates
- ✅ Image optimization
- ✅ Edge caching
- ✅ Compression (Brotli/Gzip)
- ✅ HTTP/2 and HTTP/3

## Monitoring

View deployment logs and analytics in Vercel dashboard:
- Build logs
- Function logs
- Performance metrics
- Web vitals

## Troubleshooting

### Build Fails

If build fails, check:
1. All dependencies are in `package.json`
2. TypeScript errors are fixed
3. All required files are committed
4. Node version compatibility (use Node 20+)

### Images Not Loading

If champion images don't load:
1. Ensure `public/cdragon/` directory has data
2. Check image paths in code
3. Verify Community Dragon CDN is accessible

### Large Repository Size

If repository is too large:
- The `public/cdragon/` folder contains ~170 JSON files and icons
- Total size should be under 50MB
- This is acceptable for Vercel

## Update Champion Data

To update champion data after deployment:

1. Run locally:
```bash
npm run update-data
```

2. Commit changes:
```bash
git add public/cdragon/
git commit -m "Update champion data"
git push origin main
```

3. Vercel will automatically redeploy with new data

## Best Practices

### Branch Strategy
- `main` - Production branch
- `develop` - Development branch
- Feature branches for new features

### Preview Deployments
- Create pull requests for new features
- Vercel creates preview URLs
- Test before merging to main

### Performance
- Images are served from Community Dragon CDN
- Only JSON data is hosted on Vercel
- Minimal bandwidth usage

## Cost

**Free Tier Includes:**
- Unlimited deployments
- 100GB bandwidth/month
- Automatic SSL
- Global CDN
- This project easily fits in free tier

## Support

If you encounter issues:
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Discord](https://vercel.com/discord)
- [Next.js Documentation](https://nextjs.org/docs)

## Production Checklist

Before deploying to production:
- [ ] All features tested locally
- [ ] No console errors
- [ ] All images loading correctly
- [ ] Responsive design tested
- [ ] Dark mode tested
- [ ] All champion pages work
- [ ] No TypeScript errors
- [ ] Build succeeds locally
- [ ] README updated
- [ ] Repository pushed to GitHub

## Post-Deployment

After successful deployment:
1. Test the production URL
2. Check all champion pages load
3. Test on different devices
4. Verify images load correctly
5. Check page load performance
6. Share your website! 🎉

## Example Production URL

After deployment, your site will be available at:
```
https://your-project-name.vercel.app
```

You can share this URL or configure a custom domain!

---

**Ready to deploy?** Head to [vercel.com/new](https://vercel.com/new) and import your project!

