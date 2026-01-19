# Quick Start: Contact Form Setup (5 Minutes)

## 🚀 Fast Track Setup

Follow these steps to get your contact form working in under 5 minutes.

---

## Step 1: Sign Up for Resend (2 min)

1. Go to: **<https://resend.com/signup>**
2. Sign up with email or GitHub
3. Verify your email

---

## Step 2: Get API Key (1 min)

1. Go to: **<https://resend.com/api-keys>**
2. Click **"Create API Key"**
3. Name it: `The Artistic Project`
4. Permission: **Full access**
5. Click **"Create"**
6. **Copy the API key** (starts with `re_`)

---

## Step 3: Configure Environment (1 min)

1. Create `.env.local` file in project root:

   ```bash
   cp .env.local.example .env.local
   ```

2. Open `.env.local` and paste:

   ```bash
   RESEND_API_KEY=re_your_actual_api_key_here
   RESEND_FROM_EMAIL=onboarding@resend.dev
   ```

3. Replace `re_your_actual_api_key_here` with your real API key

---

## Step 4: Verify Your Email (1 min)

1. Go to: **<https://resend.com/settings/emails>**
2. Click **"Verify Email"**
3. Enter: **<info@theartistic-project.com>**
4. Click the link in the verification email

---

## Step 5: Test It! (30 sec)

1. Restart dev server:

   ```bash
   pnpm dev
   ```

2. Open: **<http://localhost:3000>**

3. Fill out the contact form and submit

4. Check **<info@theartistic-project.com>** for the email!

---

## ✅ Done

Your contact form is now working!

📖 **For full documentation**, see: `docs/CONTACT-FORM-SETUP.md`

---

## 🐛 Not Working?

### "Email service is not configured"

- Restart your dev server after adding `.env.local`

### Email not received

- Check spam folder
- Verify you verified your email at resend.com/settings/emails

### Still stuck?

- See full troubleshooting guide in `docs/CONTACT-FORM-SETUP.md`
- Check browser console (F12) for errors
