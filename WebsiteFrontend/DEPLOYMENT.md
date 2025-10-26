# Pinnacle Protection Services - Deployment Guide

This guide will help you deploy the Pinnacle Protection Services website to a live server.

---

## 🚀 Quick Deploy Options

### Option 1: Deploy via Publish Tab (Recommended)
1. Go to the **Publish tab** in your development environment
2. Click **"Publish Project"**
3. Your site will be live with a public URL instantly
4. Share the provided URL with your client

### Option 2: Traditional Web Hosting
Follow the steps below for deploying to traditional hosting providers.

---

## 📋 Pre-Deployment Checklist

Before deploying, ensure you have:

- [ ] Reviewed all content for accuracy
- [ ] Tested all phone numbers work (click-to-call)
- [ ] Tested email link works (click-to-email)
- [ ] Verified logo displays correctly
- [ ] Tested form validation
- [ ] Checked mobile responsiveness
- [ ] Tested on multiple browsers
- [ ] Prepared custom domain (if applicable)
- [ ] SSL certificate ready for HTTPS

---

## 🌐 Deployment to Traditional Hosting

### Step 1: Choose a Hosting Provider

**Recommended Options:**
- **Netlify** (Free tier available, great for static sites)
- **Vercel** (Free tier, automatic HTTPS)
- **GitHub Pages** (Free, requires GitHub account)
- **Traditional Hosting**: GoDaddy, HostGator, Bluehost, SiteGround

### Step 2: Prepare Files

Your complete file structure should be:
```
pinnacle-protection/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── README.md
├── DEPLOYMENT.md
└── .gitignore
```

### Step 3: Upload Files

#### For Netlify (Drag & Drop):
1. Go to [netlify.com](https://netlify.com)
2. Sign up for free account
3. Drag the entire project folder to Netlify
4. Site goes live immediately with free HTTPS
5. Optional: Connect custom domain

#### For cPanel/Traditional Hosting:
1. Log into your hosting control panel
2. Open File Manager
3. Navigate to `public_html` or `www` directory
4. Upload all files maintaining folder structure:
   - Upload `index.html` to root
   - Create `css` folder, upload `style.css`
   - Create `js` folder, upload `main.js`
5. Set correct file permissions (644 for files, 755 for folders)
6. Visit your domain to verify

#### For GitHub Pages:
1. Create GitHub account (if needed)
2. Create new repository named `pinnacle-protection`
3. Upload all files to repository
4. Go to Settings → Pages
5. Select branch (main/master) and root directory
6. Save and wait for deployment
7. Access via `username.github.io/pinnacle-protection`

---

## 🔐 SSL Certificate Setup

**HTTPS is essential for:**
- Security and trust
- Google ranking
- Modern browser compatibility
- Professional appearance

### Free SSL Options:
1. **Let's Encrypt** (most hosting providers include this)
2. **Cloudflare** (free plan includes SSL)
3. **Netlify/Vercel** (automatic HTTPS included)

### Activation:
1. Most modern hosts have "1-click SSL" in control panel
2. Enable "Force HTTPS" to redirect HTTP to HTTPS
3. Update any hardcoded HTTP links to HTTPS

---

## 📧 Form Submission Setup

The current form uses JavaScript simulation. For production, you need backend processing.

### Quick Solutions:

#### Option 1: Formspree (Easiest)
1. Sign up at [formspree.io](https://formspree.io)
2. Get your form endpoint URL
3. Update form action in `index.html`:
```html
<form id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```
4. Emails will be sent to `Pinnacle4protection@gmail.com`

#### Option 2: Netlify Forms (If using Netlify)
1. Add `netlify` attribute to form:
```html
<form name="contact" method="POST" data-netlify="true">
```
2. Forms submissions appear in Netlify dashboard
3. Set up email notifications in settings

#### Option 3: Custom Backend
Create a PHP script (`process-form.php`):
```php
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "Pinnacle4protection@gmail.com";
    $subject = "New Quote Request from Website";
    
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $service = $_POST['service'];
    $message = $_POST['message'];
    
    $body = "New quote request:\n\n";
    $body .= "Name: $firstName $lastName\n";
    $body .= "Email: $email\n";
    $body .= "Phone: $phone\n";
    $body .= "Service: $service\n";
    $body .= "Message:\n$message\n";
    
    mail($to, $subject, $body);
    header("Location: thank-you.html");
}
?>
```

Update form in `index.html`:
```html
<form id="contactForm" action="process-form.php" method="POST">
```

---

## 📊 Analytics Setup (Post-Deployment)

### Google Analytics 4
1. Create account at [analytics.google.com](https://analytics.google.com)
2. Create property for your website
3. Get your Measurement ID (G-XXXXXXXXXX)
4. Add to `<head>` of `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Set Up Conversion Goals:
- Form submission
- Phone number clicks
- Email clicks
- "Get Quote" button clicks

---

## 🔍 SEO Configuration

### 1. Update Meta Tags in `index.html`

Add these additional tags inside `<head>`:

```html
<!-- Enhanced Meta Tags -->
<meta name="keywords" content="security guards Saskatchewan, Saskatoon security, security services, armed guards, unarmed guards, mobile patrol, event security, Prince Albert security">
<meta name="author" content="Pinnacle Protection Services">
<meta name="robots" content="index, follow">

<!-- Open Graph (Facebook) -->
<meta property="og:type" content="website">
<meta property="og:title" content="Pinnacle Protection Services | 24/7 Active Security">
<meta property="og:description" content="We Stop Offenders, Not Just Observe & Report. Professional security services in Saskatchewan since 2004.">
<meta property="og:image" content="https://yoursite.com/images/og-image.jpg">
<meta property="og:url" content="https://yoursite.com">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Pinnacle Protection Services">
<meta name="twitter:description" content="24/7 Active Security - We Stop Offenders, Not Just Observe & Report">
<meta name="twitter:image" content="https://yoursite.com/images/twitter-image.jpg">

<!-- Schema.org Markup -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Pinnacle Protection Services",
  "image": "https://pinnaclesecurityguards.ca/wp-content/uploads/2022/03/Pinnacle-V3Logo.png",
  "@id": "https://yoursite.com",
  "url": "https://yoursite.com",
  "telephone": "306-960-6564",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Saskatoon",
    "addressRegion": "SK",
    "addressCountry": "CA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 52.1332,
    "longitude": -106.6700
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "19:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Saturday", "Sunday"],
      "opens": "10:00",
      "closes": "14:00"
    }
  ],
  "sameAs": [
    "https://www.facebook.com/pinnacleprotection",
    "https://www.linkedin.com/company/pinnacleprotection"
  ]
}
</script>
```

### 2. Create sitemap.xml

Create a file named `sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yoursite.com/</loc>
    <lastmod>2025-01-26</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

### 3. Create robots.txt

Create a file named `robots.txt`:
```
User-agent: *
Allow: /
Sitemap: https://yoursite.com/sitemap.xml
```

---

## 📞 Phone Tracking Setup (Optional)

To track which marketing channels generate calls:

### CallRail (Recommended)
1. Sign up at [callrail.com](https://callrail.com)
2. Get tracking phone numbers
3. Replace phone numbers in website with tracking numbers
4. Track calls in CallRail dashboard

### Alternative: Google Ads Call Tracking
If running Google Ads, use built-in call tracking extensions.

---

## 🧪 Testing Checklist

After deployment, test the following:

### Functionality Tests:
- [ ] All pages load correctly
- [ ] Logo displays properly
- [ ] Navigation menu works (desktop & mobile)
- [ ] All internal links work
- [ ] Phone numbers are clickable (mobile)
- [ ] Email link opens mail client
- [ ] Form submits successfully
- [ ] Form validation works
- [ ] Success/error messages display
- [ ] Back-to-top button appears on scroll
- [ ] Smooth scrolling works

### Browser Tests:
- [ ] Chrome (desktop & mobile)
- [ ] Safari (desktop & mobile)
- [ ] Firefox
- [ ] Edge
- [ ] Samsung Internet (Android)

### Device Tests:
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (iPad)
- [ ] Mobile (iPhone/Android)

### Performance Tests:
- [ ] Run Google PageSpeed Insights
- [ ] Run GTmetrix
- [ ] Check mobile speed
- [ ] Verify images load properly

### SEO Tests:
- [ ] Meta tags present
- [ ] Title shows correctly
- [ ] Description shows in search preview
- [ ] Favicon displays (add if missing)
- [ ] HTTPS working
- [ ] No broken links

---

## 🎯 Post-Launch Tasks

### Week 1:
- [ ] Submit to Google Search Console
- [ ] Submit to Bing Webmaster Tools
- [ ] Set up Google Business Profile
- [ ] Install Google Analytics
- [ ] Test all forms thoroughly
- [ ] Monitor error logs

### Month 1:
- [ ] Review analytics data
- [ ] Check conversion rates
- [ ] Gather client feedback
- [ ] Test A/B variations of CTAs
- [ ] Start content marketing (blog)
- [ ] Build backlinks

### Ongoing:
- [ ] Weekly analytics review
- [ ] Monthly performance audits
- [ ] Regular content updates
- [ ] Monitor uptime
- [ ] Backup website regularly

---

## 🔧 Troubleshooting Common Issues

### Issue: Form not submitting
**Solution**: Verify form action URL is correct and backend is configured

### Issue: Styles not loading
**Solution**: Check CSS file path is correct (`css/style.css`)

### Issue: JavaScript not working
**Solution**: Check JS file path and browser console for errors

### Issue: Images not displaying
**Solution**: Verify image URLs are accessible (currently using external URLs)

### Issue: Mobile menu not working
**Solution**: Check JavaScript loaded and no console errors

### Issue: Slow loading
**Solution**: 
- Enable gzip compression on server
- Use CDN for static assets
- Optimize images
- Enable browser caching

---

## 📱 Custom Domain Setup

### Connecting Your Domain:

1. **Purchase Domain** (if needed)
   - Recommended: Namecheap, Google Domains, GoDaddy

2. **Update DNS Settings**
   
   For Netlify/Vercel:
   - Add CNAME record: `www` → `your-site.netlify.app`
   - Add A record: `@` → (provided IP address)

   For Traditional Hosting:
   - Point A record to server IP
   - Update nameservers (if needed)

3. **Wait for Propagation** (can take 24-48 hours)

4. **Enable SSL** on new domain

---

## 🎓 Training & Handoff

### For Client Training:
1. Provide access credentials (hosting, domain, email)
2. Document how to update content
3. Show how to check form submissions
4. Explain analytics dashboard
5. Provide contact for technical support

### Documentation to Provide:
- Login credentials (secure document)
- Hosting control panel guide
- Form submission access
- Analytics dashboard access
- Emergency contact information

---

## 🆘 Support & Maintenance

### Recommended Maintenance Schedule:

**Daily**: Monitor form submissions
**Weekly**: Check analytics, review any errors
**Monthly**: Update content, check all links
**Quarterly**: Security updates, performance audit
**Annually**: Renew domain/hosting, design refresh

### Emergency Contacts:
- Hosting Support: [Your hosting provider]
- Developer Support: [Your contact]
- Domain Registrar: [Domain provider]

---

## 🎉 Launch Announcement

Once live, announce on:
- [ ] Company social media
- [ ] Email to existing clients
- [ ] Update Google Business Profile
- [ ] Update business cards
- [ ] Update email signatures
- [ ] Update vehicles/marketing materials

---

## 📊 Success Metrics to Track

### Key Performance Indicators:
- Form submission rate
- Phone call volume
- Email inquiries
- Time on site
- Bounce rate
- Pages per session
- Traffic sources
- Conversion rate by source

### Goals (First 3 Months):
- 50+ form submissions
- 100+ phone inquiries
- 1000+ monthly visitors
- 2%+ conversion rate

---

**Need help with deployment? Contact your developer or use the Publish tab for instant deployment!**

Good luck with your launch! 🚀
