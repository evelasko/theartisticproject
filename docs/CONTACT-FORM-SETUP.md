# Contact Form Email Setup Guide

This guide walks you through the complete setup process for enabling the contact form to send emails via Resend.

## 📋 Overview

The contact form implementation includes:

- ✅ **API Route**: `/app/api/contact/route.ts` - Handles email sending server-side
- ✅ **Contact Form**: `/components/ContactForm.tsx` - Updated with API integration
- ✅ **Resend Package**: Installed and ready to use
- ✅ **Email Template**: Professional HTML email design included
- ✅ **Error Handling**: Comprehensive validation and error messages
- ✅ **Success Feedback**: User-friendly success/error notifications

## 🚀 Manual Setup Required

### Step 1: Create a Resend Account

1. Go to [https://resend.com/signup](https://resend.com/signup)
2. Sign up using your email or GitHub account
3. Verify your email address
4. Complete the onboarding process

**Time required**: ~2 minutes

---

### Step 2: Generate API Key

1. Once logged in, navigate to the **API Keys** section:
   - Direct link: [https://resend.com/api-keys](https://resend.com/api-keys)
   - Or click on **API Keys** in the left sidebar

2. Click **"Create API Key"** button

3. Configure the API key:
   - **Name**: `The Artistic Project Production` (or any descriptive name)
   - **Permission**: Select **"Full access"** or **"Sending access"**
   - **Domain**: Leave as "All domains" for now

4. Click **"Add"** or **"Create"**

5. **IMPORTANT**: Copy the API key immediately!

   ```
   re_xxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

   ⚠️ You won't be able to see it again after closing the dialog

**Time required**: ~1 minute

---

### Step 3: Configure Environment Variables

1. In your project root, create a file named `.env.local`:

   ```bash
   cp .env.local.example .env.local
   ```

2. Open `.env.local` and add your API key:

   ```bash
   RESEND_API_KEY=re_your_actual_api_key_here
   ```

3. **For Testing** (Quick Start):

   ```bash
   # Use Resend's testing domain (no DNS setup needed)
   RESEND_FROM_EMAIL=onboarding@resend.dev
   ```

4. **For Production** (After Domain Setup - see Step 4):

   ```bash
   # Use your own domain
   RESEND_FROM_EMAIL=noreply@theartistic-project.com
   ```

**Example `.env.local` file for testing:**

```bash
RESEND_API_KEY=re_AbCdEf123456XyZ_your_actual_key
RESEND_FROM_EMAIL=onboarding@resend.dev
```

⚠️ **Security Note**:

- Never commit `.env.local` to git (it's already in `.gitignore`)
- Never share your API key publicly
- Use separate API keys for development and production

**Time required**: ~1 minute

---

### Step 4: Domain Verification (Production Only - Optional for Testing)

For production use, you should verify your domain to:

- ✅ Send emails from your own domain (e.g., `noreply@theartistic-project.com`)
- ✅ Improve email deliverability
- ✅ Remove Resend branding
- ✅ Send to any email address (not just verified ones)

#### Steps

1. Go to **Domains** in your Resend dashboard:
   - [https://resend.com/domains](https://resend.com/domains)

2. Click **"Add Domain"** button

3. Enter your domain: `theartistic-project.com`

4. Resend will provide DNS records to add. You'll need to add these records to your domain's DNS settings:

   **Example DNS Records** (your actual values will be different):

   ```
   Type: TXT
   Name: @
   Value: resend-verify=abc123...
   
   Type: MX
   Name: @
   Value: feedback-smtp.resend.com
   Priority: 10
   
   Type: TXT
   Name: @
   Value: v=spf1 include:_spf.resend.com ~all
   
   Type: CNAME
   Name: resend._domainkey
   Value: resend._domainkey.resend.com
   ```

5. **Add these DNS records** to your domain provider:
   - If using **Vercel DNS**: Add via Vercel dashboard
   - If using **Cloudflare**: Add via Cloudflare DNS management
   - If using **GoDaddy, Namecheap, etc.**: Add via their DNS management panel

6. Wait for DNS propagation (can take 5 minutes to 48 hours, usually ~15 minutes)

7. In Resend dashboard, click **"Verify"** button

8. Once verified, update `.env.local`:

   ```bash
   RESEND_FROM_EMAIL=noreply@theartistic-project.com
   ```

**Time required**: ~10-15 minutes + DNS propagation time

**Skip this step if**: You want to test immediately using `onboarding@resend.dev`

---

### Step 5: Verify Email Address (Testing Mode Only)

If you're using `onboarding@resend.dev` (testing mode), you can only send emails to verified email addresses.

1. Go to **Settings** → **Email Addresses** in Resend dashboard

2. Click **"Verify Email"**

3. Enter the email you want to test with (e.g., your personal email)

4. Click the verification link sent to your email

5. Now you can receive test emails from your contact form!

**Time required**: ~2 minutes

**Skip this step if**: You've completed domain verification (Step 4)

---

### Step 6: Restart Your Development Server

After setting up environment variables:

1. Stop your development server (if running)
   - Press `Ctrl+C` in terminal

2. Restart it:

   ```bash
   pnpm dev
   ```

3. Environment variables are now loaded!

**Time required**: ~30 seconds

---

### Step 7: Test the Contact Form

1. Open your website: [http://localhost:3000](http://localhost:3000)

2. Navigate to the contact form section

3. Fill out the form:
   - **Nombre**: Test User
   - **Email**: <your-verified-email@example.com>
   - **Teléfono**: +34 123 456 789
   - **Mensaje**: This is a test message from the contact form

4. Click **"Enviar propuesta"**

5. You should see:
   - Button text changes to "Enviando..."
   - Success message appears: "¡Mensaje enviado con éxito! Te responderemos pronto."
   - Form fields are cleared

6. Check your inbox at **<info@theartistic-project.com>**
   - Email should arrive within seconds
   - Subject: "Nueva consulta de contacto de Test User"
   - Professional HTML-formatted email with all form data

**Time required**: ~2 minutes

---

## 📧 Email Template Preview

The emails sent from your contact form will look like this:

### Subject Line

```
Nueva consulta de contacto de [Sender Name]
```

### Email Body

- **Professional header** with "Nueva Consulta de Contacto" title
- **Organized sections**:
  - Name (formatted)
  - Email (clickable mailto: link)
  - Phone (clickable tel: link if provided)
  - Message (in highlighted message box)
- **Footer** with timestamp (Spain timezone)
- **Reply-To header** automatically set to sender's email

---

## 🔧 Configuration Files

### Environment Variables (.env.local)

```bash
# Required
RESEND_API_KEY=re_your_api_key_here

# Optional (defaults to onboarding@resend.dev if not set)
RESEND_FROM_EMAIL=noreply@theartistic-project.com
```

### Recipient Email

Currently hardcoded in `/app/api/contact/route.ts` (line 7):

```typescript
const EMAIL_CONFIG = {
  from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
  to: "info@theartistic-project.com", // ← Change this if needed
  replyTo: "", // Automatically set to form submitter's email
};
```

To change the recipient email, edit this line in the API route.

---

## 🐛 Troubleshooting

### Problem: "Email service is not configured"

**Solution**:

- Check that `RESEND_API_KEY` is set in `.env.local`
- Restart your development server after adding environment variables
- Verify the API key is correct (starts with `re_`)

### Problem: "Failed to send email" (500 error)

**Possible causes**:

1. **Invalid API key**: Check your API key in Resend dashboard
2. **Invalid sender email**: Make sure domain is verified if using custom domain
3. **Rate limits**: Free tier has 100 emails/day limit
4. **Resend API down**: Check [Resend status page](https://resend.com/status)

**Solution**: Check browser console and server logs for detailed error messages

### Problem: Email sent but not received

**Possible causes**:

1. **Using `onboarding@resend.dev` without verified recipient**: Verify your email in Resend dashboard
2. **Email in spam folder**: Check spam/junk folder
3. **Invalid recipient email**: Verify `info@theartistic-project.com` exists

**Solution**:

- Check Resend dashboard → **Logs** to see email status
- Verify recipient email in Resend if using test domain

### Problem: Form submits but shows error message

**Solution**:

1. Open browser DevTools (F12) → Console tab
2. Look for error messages
3. Check Network tab for `/api/contact` request details
4. Verify all required fields are filled

### Problem: API key not loading

**Solution**:

- Make sure file is named exactly `.env.local` (not `.env.local.txt`)
- Ensure file is in project root (same directory as `package.json`)
- Restart development server after creating/editing `.env.local`
- Check file is not ignored by git (it should be in `.gitignore`)

---

## 📊 Monitoring & Logs

### Resend Dashboard

Access your Resend dashboard to monitor:

- **Emails sent**: Real-time email delivery status
- **API usage**: Track your API calls and limits
- **Error logs**: See failed email attempts
- **Analytics**: Open rates, bounce rates (if enabled)

Dashboard: [https://resend.com/emails](https://resend.com/emails)

### Application Logs

Check your server logs for detailed information:

- Successful email: `Email sent successfully: [email-id]`
- Configuration error: `RESEND_API_KEY is not configured`
- API error: `Resend API error: [error details]`

---

## 🔒 Security Best Practices

1. **Never commit `.env.local`** to git
   - ✅ Already in `.gitignore`
   - ⚠️ Double-check before pushing code

2. **Use separate API keys** for different environments:
   - Development: `RESEND_API_KEY_DEV`
   - Production: `RESEND_API_KEY_PROD`

3. **Rotate API keys** periodically
   - Generate new key in Resend dashboard
   - Update `.env.local`
   - Delete old key

4. **Monitor API usage** for suspicious activity
   - Check Resend dashboard regularly
   - Set up usage alerts if available

5. **Implement rate limiting** (future enhancement)
   - Currently relies on Resend's rate limits
   - Consider adding application-level rate limiting for extra security

---

## 🚀 Deployment to Production

When deploying to Vercel, Netlify, or other platforms:

### Vercel

1. Go to your project settings on Vercel
2. Navigate to **Environment Variables**
3. Add the following variables:

   ```
   RESEND_API_KEY = re_your_production_api_key
   RESEND_FROM_EMAIL = noreply@theartistic-project.com
   ```

4. Redeploy your application

### Other Platforms

Add the same environment variables in your platform's settings:

- **Netlify**: Site settings → Build & deploy → Environment
- **Railway**: Project → Variables
- **Render**: Environment → Environment Variables

⚠️ **Important**: Use a different API key for production than development!

---

## 📈 Upgrading from Free Tier

Resend free tier includes:

- ✅ 3,000 emails/month
- ✅ 100 emails/day
- ✅ 1 verified domain
- ✅ Full API access

If you need more:

- **Pro Plan**: $20/month for 50,000 emails
- **Business Plan**: $80/month for 100,000 emails
- **Custom**: Contact Resend for higher volumes

Upgrade at: [https://resend.com/pricing](https://resend.com/pricing)

---

## ✅ Setup Checklist

Use this checklist to ensure everything is configured correctly:

- [ ] Resend account created and verified
- [ ] API key generated and copied
- [ ] `.env.local` file created with API key
- [ ] Sender email configured (`RESEND_FROM_EMAIL`)
- [ ] (Optional) Domain verified in Resend dashboard
- [ ] (Testing only) Recipient email verified in Resend
- [ ] Development server restarted
- [ ] Contact form tested and email received
- [ ] Email appears professional and correctly formatted
- [ ] Reply-To works when replying to the email
- [ ] Success/error messages display correctly in form
- [ ] Production environment variables configured (if deploying)

---

## 📞 Support

### Resend Support

- Documentation: [https://resend.com/docs](https://resend.com/docs)
- Discord: [https://resend.com/discord](https://resend.com/discord)
- Email: <support@resend.com>

### Implementation Support

If you encounter issues with the implementation:

1. Check the troubleshooting section above
2. Review server logs and browser console
3. Verify all configuration steps were completed
4. Check Resend dashboard for API errors

---

## 🎉 You're All Set

Your contact form is now fully functional and ready to receive inquiries. Emails will be sent to **<info@theartistic-project.com>** with a professional design and all the form data neatly organized.

**Next steps**:

- Test thoroughly in development
- Monitor emails in Resend dashboard
- Deploy to production when ready
- Consider adding additional features (see below)

---

## 🔮 Future Enhancements (Optional)

Consider implementing these features later:

1. **Rate Limiting**: Prevent spam by limiting form submissions per IP
2. **reCAPTCHA**: Add Google reCAPTCHA to prevent bots
3. **Auto-reply**: Send confirmation email to form submitter
4. **Database Logging**: Store submissions in a database
5. **Admin Dashboard**: View all form submissions in one place
6. **Email Templates**: Create different templates for different form types
7. **Attachments**: Allow users to upload files with their inquiry
8. **Multi-language**: Detect user language and send emails accordingly

---

**Last Updated**: January 19, 2026
**Implementation Version**: 1.0
