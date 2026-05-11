# Deployment Guide

## Production Deployment Steps

### 1. Frontend Deployment (Vercel)

```bash
# Login to Vercel
npm i -g vercel
vercel login

# Deploy from frontend directory
cd frontend
vercel

# Configure environment variables in Vercel Dashboard
# VITE_API_URL=https://your-backend-api.com/api
```

### 2. Backend Deployment (Heroku)

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
cd backend
heroku create your-app-name

# Set environment variables
heroku config:set MONGODB_URI=your_mongodb_atlas_uri
heroku config:set JWT_SECRET=your_strong_secret_key
heroku config:set NODE_ENV=production
heroku config:set PYTHON_AI_SERVICE_URL=https://your-ai-service.herokuapp.com
heroku config:set CORS_ORIGIN=https://your-frontend.vercel.app

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

### 3. AI Service Deployment (Heroku)

```bash
# Create Procfile in ai-service directory
echo "web: uvicorn app:app --host 0.0.0.0 --port \$PORT" > Procfile

# Create app
cd ai-service
heroku create your-ai-service-name

# Set environment variables
heroku config:set FASTAPI_ENV=production
heroku config:set PORT=5000

# Deploy
git push heroku main
```

### 4. Database Setup (MongoDB Atlas)

```bash
# 1. Go to https://www.mongodb.com/cloud/atlas
# 2. Create account and organization
# 3. Create cluster
# 4. Add IP whitelist (0.0.0.0/0 for all, or specific IPs)
# 5. Create database user
# 6. Get connection string
# 7. Use in MONGODB_URI environment variable
```

## Environment Variables by Stage

### Production Backend (.env)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/prescription-checker
JWT_SECRET=super_strong_random_secret_key_min_32_chars
NODE_ENV=production
PORT=5000
PYTHON_AI_SERVICE_URL=https://your-ai-service.herokuapp.com
CORS_ORIGIN=https://your-frontend-domain.vercel.app
```

### Production Frontend (.env.production)
```
VITE_API_URL=https://your-backend-api.herokuapp.com/api
VITE_APP_NAME=AI Prescription Checker
```

### Production AI Service (.env)
```
FASTAPI_ENV=production
PORT=5000
CSV_DATA_PATH=./data/drug_interactions.csv
```

## Performance Optimization

### Frontend
```bash
# Build optimization
npm run build

# Analyze bundle size
npm install --save-dev webpack-bundle-analyzer

# Enable compression in Vite
```

### Backend
```bash
# Enable Redis caching
npm install redis

# Enable gzip compression
npm install compression

# Use connection pooling for MongoDB
```

## Monitoring & Logging

### Heroku Logs
```bash
heroku logs --tail --app your-app-name
```

### Setup Application Monitoring
```bash
npm install --save @sentry/node
```

## Security Hardening

### SSL/TLS Certificates
- Vercel handles SSL automatically
- Heroku provides free SSL with custom domain

### Security Headers
```javascript
// Add to backend/server.js
import helmet from 'helmet'
app.use(helmet())
```

### Rate Limiting
```javascript
npm install express-rate-limit

import rateLimit from 'express-rate-limit'
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})

app.use('/api/', limiter)
```

## Backup & Recovery

### MongoDB Backups
```bash
# Enable automated backups in MongoDB Atlas
# Daily snapshots retained for 7 days
```

### Database Migration
```bash
# Export data
mongoexport --uri "mongodb+srv://..." --collection prescriptions --out prescriptions.json

# Import data
mongoimport --uri "mongodb+srv://..." --collection prescriptions --file prescriptions.json
```

## Troubleshooting

### Application won't start
```bash
# Check logs
heroku logs --tail

# Restart app
heroku restart --app your-app-name
```

### Database connection fails
```bash
# Verify connection string format
# mongodb+srv://username:password@host/database

# Check IP whitelist in MongoDB Atlas
# Add 0.0.0.0/0 or specific IP ranges
```

### CORS errors
```bash
# Verify CORS_ORIGIN matches frontend URL
# Check for trailing slashes
```

### API timeout
```bash
# Increase Heroku timeout settings
# Monitor API response times
# Consider caching frequently accessed data
```

## Rollback Strategy

```bash
# View release history
heroku releases --app your-app-name

# Rollback to previous version
heroku releases:rollback v5 --app your-app-name
```

## Scaling

### Horizontal Scaling
```bash
# Add dynos on Heroku
heroku ps:scale web=2 --app your-app-name
```

### Database Scaling
- Upgrade MongoDB Atlas cluster tier for better performance
- Enable sharding for large datasets

## Continuous Deployment

### GitHub Actions
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: heroku/deploy-branch@v3
        with:
          appdir: "backend"
          heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
          heroku_app_name: "your-app-name"
```

## Post-Deployment Checklist

- [ ] Test login/registration
- [ ] Test prescription creation
- [ ] Test drug interaction checking
- [ ] Test PDF generation
- [ ] Verify email notifications (if implemented)
- [ ] Check API response times
- [ ] Monitor error logs
- [ ] Test on mobile devices
- [ ] Verify HTTPS everywhere
- [ ] Test database backups
- [ ] Monitor server resources
- [ ] Check security headers
- [ ] Review access logs
- [ ] Test disaster recovery

## Support

For deployment issues, consult:
- Vercel Documentation: https://vercel.com/docs
- Heroku Documentation: https://devcenter.heroku.com
- MongoDB Atlas Documentation: https://docs.atlas.mongodb.com
