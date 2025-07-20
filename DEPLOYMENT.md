# 🚀 Deploy to Netlify

This guide will help you deploy your Vibe Coding landing page to Netlify.

## 📋 Prerequisites

1. **GitHub Account**: Your code should be in a GitHub repository
2. **Netlify Account**: Sign up at [netlify.com](https://netlify.com)
3. **Supabase Setup**: Make sure your database tables are created (see `supabase-setup.sql`)

## 🎯 Deployment Steps

### Method 1: Deploy from GitHub (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Choose GitHub and select your repository
   - Configure build settings:
     - **Build command**: `npm run build`
     - **Publish directory**: `out`
   - Click "Deploy site"

3. **Set Environment Variables**
   - In your Netlify dashboard, go to Site settings > Environment variables
   - Add your Supabase credentials:
     ```
     NEXT_PUBLIC_SUPABASE_URL=https://yqrirceubuzhehkdbpfe.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
     ```

### Method 2: Deploy from Local Build

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Install Netlify CLI: `npm install -g netlify-cli`
   - Login: `netlify login`
   - Deploy: `netlify deploy --prod --dir=out`

## 🔧 Configuration Files

### `netlify.toml`
- Build settings and redirects
- Security headers
- Cache optimization

### `next.config.js`
- Static export configuration
- ESLint/TypeScript error handling

## 🌐 Post-Deployment

1. **Test your site**
   - Visit your Netlify URL
   - Test the form submission
   - Check Supabase dashboard for data

2. **Custom Domain** (Optional)
   - In Netlify dashboard, go to Domain settings
   - Add your custom domain
   - Configure DNS records

3. **Environment Variables**
   - Ensure Supabase credentials are set
   - Test form functionality

## 🐛 Troubleshooting

### Build Errors
- Check that all dependencies are in `package.json`
- Verify Node.js version (18+ recommended)
- Check build logs in Netlify dashboard

### Form Not Working
- Verify Supabase environment variables
- Check browser console for errors
- Ensure database tables exist

### 404 Errors
- Check `netlify.toml` redirect rules
- Verify static export is working

## 📊 Performance

Your site includes:
- ✅ Static generation for fast loading
- ✅ Image optimization
- ✅ CSS/JS minification
- ✅ Cache headers for static assets
- ✅ Security headers

## 🔒 Security

- HTTPS enabled by default
- Security headers configured
- XSS protection
- Content type sniffing prevention

## 📈 Analytics (Optional)

Add analytics to your site:
- Google Analytics
- Plausible Analytics
- Fathom Analytics

## 🎉 Success!

Your Vibe Coding landing page is now live on Netlify! 🚀

**Next steps:**
1. Test all functionality
2. Set up custom domain
3. Configure analytics
4. Monitor performance 