# 🚀 VOLA PARTY - Deployment Guide

## **Quick Recommendation**
- **Frontend:** DigitalOcean App Platform / Hostinger (cPanel)
- **Backend:** DigitalOcean Droplet / Hostinger VPS
- **Database:** DigitalOcean Managed MongoDB or self-hosted on same server

---

## **Option 1: DigitalOcean (Recommended)**

### **1. Frontend Deployment (React App)**

#### On DigitalOcean App Platform (Easiest)
```bash
# 1. Build the React app
cd frontend
npm run build

# 2. Create app.json in frontend root
{
  "name": "vola-party-admin",
  "static_sites": [
    {
      "name": "vola-admin-frontend",
      "source_dir": "build",
      "routes": [
        {
          "path": "/",
          "match_scope": "all"
        }
      ]
    }
  ]
}

# 3. Push to GitHub
git push origin main

# 4. Go to DigitalOcean > App Platform > Create App
# - Connect GitHub repo
# - Select frontend folder
# - Deploy automatically on push
```

**Frontend URL:** `https://vola-admin-frontend.ondigitalocean.app`

---

### **2. Backend Deployment (Node.js)**

#### On DigitalOcean Droplet
```bash
# 1. Create a Droplet (Ubuntu 22.04, 2GB RAM minimum)

# 2. SSH into Droplet
ssh root@YOUR_DROPLET_IP

# 3. Install dependencies
apt update && apt upgrade -y
apt install -y nodejs npm mongodb git

# 4. Clone project
cd /var/www
git clone YOUR_REPO_URL vola-party
cd vola-party/admin/backend

# 5. Install Node packages
npm install

# 6. Create .env file
cat > .env << EOF
PORT=5020
MONGODB_URI=mongodb://localhost:27017/vola
JWT_SECRET=YourSecureJWTSecret_ChangeThis
NODE_ENV=production
EOF

# 7. Install PM2 for process management
npm install -g pm2

# 8. Start app with PM2
pm2 start index.js --name "vola-backend"
pm2 startup
pm2 save

# 9. Setup Nginx reverse proxy
apt install -y nginx

# Create /etc/nginx/sites-available/vola-backend
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:5020;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}

# Enable site
ln -s /etc/nginx/sites-available/vola-backend /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx

# 10. Setup SSL (Free Let's Encrypt)
apt install -y certbot python3-certbot-nginx
certbot --nginx -d yourdomain.com
```

**Backend URL:** `https://yourdomain.com` (or `https://api.yourdomain.com`)

---

### **3. Database Setup**

#### Option A: DigitalOcean Managed MongoDB
1. Create Managed Database in DigitalOcean console
2. Get connection string
3. Update in backend `.env`:
```
MONGODB_URI=mongodb+srv://user:password@cluster.db.ondigitalocean.com/vola
```

#### Option B: Self-hosted MongoDB on same Droplet
```bash
# Already installed above, just enable:
systemctl start mongodb
systemctl enable mongodb

# Create database and user
mongosh
> use vola
> db.createUser({
    user: "admin",
    pwd: "SecurePassword",
    roles: ["dbOwner"]
  })
```

---

## **Option 2: Hostinger (cPanel)**

### **1. Frontend Deployment**

```bash
# 1. Build React app
cd frontend
npm run build

# 2. Upload 'build' folder contents via FTP to:
# /public_html/admin/ (or your domain root)

# 3. Create .htaccess for React Router
cat > /public_html/admin/.htaccess << EOF
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /admin/
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /admin/index.html [L]
</IfModule>
EOF
```

**Frontend URL:** `https://yourdomain.com/admin`

---

### **2. Backend Deployment**

```bash
# 1. Get Node.js access (requires Hostinger Business plan+)
# Go to cPanel > Setup Node.js App

# 2. Create Node.js application
# - App mode: Production
# - Application root: /admin/backend
# - Application Startup File: index.js
# - Port: 5020

# 3. Upload backend code via FTP to /admin/backend

# 4. Create .env file via cPanel File Manager
PORT=5020
MONGODB_URI=mongodb://localhost:27017/vola
JWT_SECRET=YourSecureJWTSecret_ChangeThis
NODE_ENV=production

# 5. Install dependencies
# SSH into account and run:
cd /home/yourusername/public_html/admin/backend
npm install

# 6. Start application via cPanel Node.js manager
```

**Note:** Hostinger's Node.js support is limited. For better reliability, use VPS plan.

---

## **Quick Deployment Checklist**

### **Frontend Setup**
- [ ] Update API baseURL in `src/util/Config.js`:
```javascript
exports.baseURL = 'https://yourdomain.com'; // Backend URL
```
- [ ] Build: `npm run build`
- [ ] Deploy to hosting
- [ ] Test login/registration flows

### **Backend Setup**
- [ ] Create `.env` with production values
- [ ] Update `config.js` with production database URI
- [ ] Install dependencies: `npm install`
- [ ] Setup database (MongoDB)
- [ ] Start with PM2: `pm2 start index.js`
- [ ] Setup Nginx/reverse proxy
- [ ] Enable HTTPS with SSL certificate

### **Database Setup**
- [ ] Create MongoDB database `vola`
- [ ] Create admin user with password
- [ ] Test connection from backend

### **Domain & DNS**
- [ ] Point domain DNS to hosting provider
- [ ] Setup SSL certificate (Let's Encrypt)
- [ ] Test HTTPS access

---

## **Environment Variables Template**

### **Backend (.env)**
```
PORT=5020
NODE_ENV=production
MONGODB_URI=mongodb+srv://admin:password@yourcluster.mongodb.net/vola
JWT_SECRET=YourVerySecureRandomString_Min32Chars
CORS_ORIGIN=https://yourdomain.com
EMAIL=your-email@gmail.com
STRIPE_KEY=sk_live_xxxxx
FIREBASE_CONFIG={}
```

### **Frontend (build time)**
```javascript
// src/util/Config.js
exports.baseURL = 'https://yourdomain.com';
exports.key = 'EmonProject2024';
exports.projectName = 'Vola Party';
```

---

## **Post-Deployment Testing**

```bash
# Test backend
curl -X POST https://yourdomain.com/admin/login \
  -H "Content-Type: application/json" \
  -H "key: EmonProject2024" \
  -d '{"email":"test@example.com","password":"password"}'

# Test frontend
# Visit https://yourdomain.com/login
# Try registration and login flow
```

---

## **Performance & Security Tips**

1. **Enable GZIP compression** in Nginx
2. **Setup firewall** - only allow needed ports
3. **Use environment variables** - never commit secrets
4. **Setup HTTPS/SSL** - mandatory for authentication
5. **Enable CORS** - restrict to your domain only
6. **Rate limiting** - prevent brute force attacks
7. **Database backups** - daily automated backups
8. **Monitor logs** - setup error tracking (Sentry)
9. **CDN** - use CloudFlare for frontend caching
10. **Auto-scaling** - setup on DigitalOcean for traffic spikes

---

## **Recommended Architecture**

```
DigitalOcean Recommendation:
├── App Platform (Frontend - $5-12/month)
├── Droplet 2GB RAM (Backend + MongoDB - $12-18/month)
└── Domain ($3-5/year)

Total: ~$20-30/month for full deployment

Hostinger Alternative:
├── Business Plan with cPanel (Frontend + Backend - $8-20/month)
└── Domain (included)

Note: Hostinger has limitations for Node.js on shared hosting
```

---

## **Troubleshooting**

### **Frontend shows blank page**
- Check browser console for API URL errors
- Verify `Config.js` has correct backend URL
- Clear browser cache

### **Backend connection refused**
- Verify Droplet IP and port are accessible
- Check firewall rules (allow port 80, 443, 5020)
- Verify PM2 process is running: `pm2 list`

### **MongoDB connection error**
- Verify MongoDB is running: `systemctl status mongodb`
- Check connection string in `.env`
- Verify database user credentials

### **CORS errors**
- Update `config.js` CORS_ORIGIN
- Verify frontend domain matches backend config

---

**For questions or issues, check logs:**
```bash
# Backend logs
pm2 logs vola-backend

# Nginx logs
tail -f /var/log/nginx/error.log
tail -f /var/log/nginx/access.log

# MongoDB logs
journalctl -u mongodb -f
```

---

**Deployment completed! Your Vola Party admin panel is now live.** 🎉
