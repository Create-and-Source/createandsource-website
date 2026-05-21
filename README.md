# Create & Source Website

## Quick Start (Local Development)

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Deploy to Vercel (Go Live)

### Step 1: Set Up EmailJS (5 minutes)
1. Go to https://www.emailjs.com and create a free account
2. Add an email service (Gmail works great) — copy the **Service ID**
3. Create an email template with these variables:
   - `{{from_name}}` — sender's name
   - `{{from_email}}` — sender's email
   - `{{organization}}` — their company
   - `{{message}}` — their message
4. Copy the **Template ID**
5. Go to Account → API Keys → copy your **Public Key**
6. Open `src/App.jsx` and replace these three placeholders:
   - `YOUR_SERVICE_ID` → your Service ID
   - `YOUR_TEMPLATE_ID` → your Template ID
   - `YOUR_PUBLIC_KEY` → your Public Key

### Step 2: Push to GitHub
```bash
git init
git add .
git commit -m "Create & Source website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/createandsource-website.git
git push -u origin main
```

### Step 3: Deploy on Vercel (5 minutes)
1. Go to https://vercel.com and sign up with GitHub
2. Click "New Project"
3. Import your `createandsource-website` repo
4. Framework: Vite (auto-detected)
5. Click "Deploy"
6. Your site is live at a `.vercel.app` URL

### Step 4: Connect Your Domain
1. In Vercel dashboard → your project → Settings → Domains
2. Add `createandsource.com`
3. Vercel will give you DNS records
4. Update your domain DNS (wherever you bought createandsource.com) to point to Vercel
5. Remove the old Wix DNS entries
6. SSL is automatic

## EmailJS Template Example

Subject: `New inquiry from {{from_name}}`

Body:
```
Name: {{from_name}}
Email: {{from_email}}
Organization: {{organization}}

Message:
{{message}}
```

## Project Structure
```
├── index.html          # HTML entry point with meta tags
├── package.json        # Dependencies
├── vite.config.js      # Vite configuration
└── src/
    ├── main.jsx        # React entry point
    └── App.jsx         # The entire website (all pages)
```
