# 🔐 EVID-DGC - Blockchain Evidence Management System

**Secure admin-controlled evidence management system with role-based access control.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)](https://nodejs.org/)
[![Supabase](https://img.shields.io/badge/Database-Supabase-green)](https://supabase.com/)
[![Deployment](https://img.shields.io/badge/Deploy-Render-blue)](https://render.com/)

## ✨ Features

- 🔒 **Admin-Only User Management** - Secure user creation by administrators
- 👥 **8 User Roles** - Complete role-based access control system
- 🧪 **Test User System** - Create and login as test users for development
- 📊 **Admin Dashboard** - Comprehensive system oversight and management
- 💾 **Database Storage** - Supabase PostgreSQL backend with RLS
- 📱 **Modern UI** - Professional responsive design with accessibility
- 🔐 **Wallet Integration** - MetaMask blockchain authentication
- 📧 **Email Authentication** - Traditional email/password login option
- 🔍 **Audit Logging** - Complete activity tracking and compliance
- 🌐 **Multi-Platform** - Deploy on Render, Vercel, or Netlify

## 📚 Documentation

### Quick Links
- 🚀 [Quick Start](#-quick-start)
- 📖 [Complete Documentation](#-complete-documentation)
- 🔧 [API Reference](docs/API_DOCUMENTATION.md)
- 👥 [User Roles Guide](docs/USER_ROLES.md)
- 🚨 [Troubleshooting](docs/TROUBLESHOOTING.md)
- 🤝 [Contributing](CONTRIBUTING.md)

### Complete Documentation

| Topic | Description | Link |
|-------|-------------|------|
| **Environment Setup** | Configure .env variables and Supabase | [📄 Environment Setup](docs/ENVIRONMENT_SETUP.md) |
| **Blockchain Config** | Network setup and MetaMask configuration | [⛓️ Blockchain Setup](docs/BLOCKCHAIN_SETUP.md) |
| **Local Development** | Development environment and workflow | [💻 Local Development](docs/LOCAL_DEVELOPMENT.md) |
| **Deployment Guide** | Deploy to Render, Vercel, or Netlify | [🚀 Deployment](docs/DEPLOYMENT.md) |
| **API Documentation** | Complete API reference and examples | [📡 API Docs](docs/API_DOCUMENTATION.md) |
| **User Roles** | Roles, permissions, and access control | [👤 User Roles](docs/USER_ROLES.md) |
| **Troubleshooting** | Common issues and solutions | [🔧 Troubleshooting](docs/TROUBLESHOOTING.md) |
| **Contributing** | How to contribute to the project | [🤝 Contributing](CONTRIBUTING.md) |

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher)
- **MetaMask** browser extension
- **Supabase** account

### 1. Environment Setup
```bash
# Clone repository
git clone https://github.com/Gooichand/blockchain-evidence.git
cd blockchain-evidence

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your Supabase credentials
```

### 2. Database Setup
```sql
-- Run in Supabase SQL Editor:
-- 1. Execute database-schema.sql
-- 2. Execute setup-first-admin.sql with your wallet address
```

### 3. Start Application
```bash
# Full system (API + Frontend)
npm start

# Frontend only (development)
cd public && python -m http.server 8080
```

### 4. Access System
```
Full System: http://localhost:3001
Frontend Only: http://localhost:8080
```

> 📚 **Need detailed setup?** See [Local Development Guide](docs/LOCAL_DEVELOPMENT.md)

## 📁 Project Structure

```
├── public/                    # Frontend files
│   ├── index.html            # Main login/registration page
│   ├── admin.html            # Admin dashboard
│   ├── dashboard.html        # Role router
│   ├── dashboard-*.html      # Role-specific dashboards
│   ├── app.js               # Main application logic
│   ├── storage.js           # Database client
│   └── styles.css           # Styling
├── server.js                 # Express API server
├── database-schema.sql       # Database setup
├── setup-first-admin.sql     # First admin creation
└── package.json             # Dependencies
```

## 👥 User Roles

| Role | Access Level | Self-Register | Key Permissions |
|------|-------------|---------------|----------------|
| 👁️ **Public Viewer** | View public cases | ✅ Yes | Browse public information |
| 🕵️ **Investigator** | Create and manage cases | ✅ Yes | Case creation, evidence upload |
| 🔬 **Forensic Analyst** | Analyze evidence | ✅ Yes | Technical analysis, reports |
| ⚖️ **Legal Professional** | Legal review | ✅ Yes | Legal documentation, case review |
| 🏛️ **Court Official** | Court proceedings | ✅ Yes | Judicial processes, scheduling |
| 📋 **Evidence Manager** | Manage evidence lifecycle | ✅ Yes | Chain of custody, storage |
| 🔍 **Auditor** | System auditing | ✅ Yes | Compliance, audit reports |
| 👑 **Administrator** | Full system access | ❌ Admin-only | User management, system config |

> 📚 **Detailed permissions:** See [User Roles Documentation](docs/USER_ROLES.md)

## 📊 Analytics & Monitoring

### Google Analytics Integration
- ✅ **Page View Tracking** - Monitor user navigation patterns
- ✅ **Custom Event Tracking** - Track user actions and system usage
- ✅ **Role-Based Analytics** - Understand usage by user role
- ✅ **Privacy-Compliant** - No PII or sensitive data tracked

### Setup Analytics
1. Get Google Analytics Measurement ID (G-XXXXXXXXXX)
2. Update `public/analytics.js` with your ID
3. Deploy and monitor usage patterns
4. See `GOOGLE_ANALYTICS_SETUP.md` for detailed setup

### Tracked Events
- 🔐 User authentication (login/logout)
- 👤 User registration by role
- 📁 Dashboard navigation
- 🔍 Feature usage patterns
- ⚖️ Admin actions (anonymized)

## 🔧 Admin Features

### User Management
- ✅ Create regular user accounts
- ✅ Create additional admin accounts (max 10)
- ✅ View all system users
- ✅ Soft delete user accounts
- ✅ Audit logging for all actions

### Test System
- ✅ Create test accounts for role testing
- ✅ Quick login as test users
- ✅ Test mode indicators in UI
- ✅ Easy role switching for development

### System Monitoring
- ✅ Real-time user statistics
- ✅ System health indicators
- ✅ Activity monitoring
- ✅ Database status checks

## 🛡️ Security Features

- **Admin-Only User Creation** - Only admins can create other admins
- **Role Validation** - Strict role enforcement and validation
- **Input Sanitization** - XSS prevention and data validation
- **Audit Logging** - All admin actions logged for compliance
- **Rate Limiting** - API endpoint protection
- **Soft Delete** - User data preserved for audit purposes

## 🔄 User Flow

### New User Registration
1. Connect MetaMask wallet
2. Select role (7 options available)
3. Fill registration form
4. Immediate access to role-specific dashboard

### Admin User Management
1. Admin logs into admin dashboard
2. Create users with "Create New User" form
3. Create additional admins with "Create New Administrator" form
4. Manage existing users in user table
5. All actions logged for audit

### Test User Development
1. Admin creates test accounts
2. Click "Login As User" to test role interfaces
3. Test mode clearly indicated in UI
4. Easy switching between roles for testing

## 🌐 Deployment

### Local Development
```bash
npm run dev          # API server with auto-reload
cd public && python -m http.server 8080  # Frontend only
```

### Production (Render.com)
1. Connect GitHub repository
2. Set environment variables:
   - `SUPABASE_URL`
   - `SUPABASE_KEY`
3. Deploy with render.yaml configuration
4. Run database setup scripts in Supabase

## 📊 API Endpoints

### Public Endpoints
- `GET /api/health` - System health check
- `GET /api/user/:wallet` - Get user information by wallet address

### Admin-Only Endpoints
- `POST /api/admin/create-user` - Create regular user account
- `POST /api/admin/create-admin` - Create admin user account
- `POST /api/admin/delete-user` - Soft delete user account
- `POST /api/admin/users` - Get all system users

> 📡 **Complete API docs:** See [API Documentation](docs/API_DOCUMENTATION.md)

## 🌐 Deployment Options

### Supported Platforms
- **Render** (Recommended) - Free tier with auto-deploy
- **Vercel** - Serverless with global CDN
- **Netlify** - Static hosting with edge functions

### Quick Deploy
```bash
# Render (recommended)
1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically

# Vercel
vercel --prod

# Netlify
netlify deploy --prod
```

> 🚀 **Deployment guide:** See [Deployment Documentation](docs/DEPLOYMENT.md)

## 💰 Cost: $0

- **Supabase Database**: FREE (500MB)
- **Render Hosting**: FREE
- **All Features**: FREE

## 🔒 Security Checklist

- ✅ Admin role cannot be self-registered
- ✅ Users cannot delete their own accounts
- ✅ Non-admins cannot access admin endpoints
- ✅ All admin actions are logged
- ✅ Maximum 10 admin accounts enforced
- ✅ Input validation and sanitization
- ✅ Rate limiting on API endpoints
- ✅ Soft delete only (data preserved)

## 📞 Support & Community

### Getting Help
- 📚 **Documentation**: Check [docs/](docs/) directory
- 🐛 **Issues**: Report bugs on [GitHub Issues](https://github.com/Gooichand/blockchain-evidence/issues)
- 💬 **Discussions**: Join [GitHub Discussions](https://github.com/Gooichand/blockchain-evidence/discussions)
- 🚑 **Troubleshooting**: See [Troubleshooting Guide](docs/TROUBLESHOOTING.md)

### Quick Diagnostics
1. **Database**: Check Supabase connection and credentials
2. **Environment**: Verify all environment variables are set
3. **Browser**: Check console for JavaScript errors
4. **Network**: Test API endpoints with `/api/health`
5. **Audit**: Review `admin_actions` table for system logs

### Contributing
We welcome contributions! See [Contributing Guide](CONTRIBUTING.md) for:
- Code style guidelines
- Development workflow
- Pull request process
- Testing requirements

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🚀 Roadmap

- [ ] Smart contract integration for evidence hashing
- [ ] Multi-signature admin operations
- [ ] Advanced audit reporting
- [ ] Mobile application
- [ ] API rate limiting dashboard
- [ ] Evidence encryption at rest
- [ ] Integration with external forensic tools

---
### ⭐ Stargazers

<a href="https://github.com/Gooichand/blockchain-evidence/stargazers">
  <img src="https://reporoster.com/stars/Gooichand/blockchain-evidence?type=svg&limit=100&names=false" alt="Stargazers" />
</a>

---

### 🍴 Forkers

<a href="https://github.com/Gooichand/blockchain-evidence/network/members">
  <img src="https://reporoster.com/forks/Gooichand/blockchain-evidence?type=svg&limit=100&names=false" alt="Forkers" />
</a>

---

**Thank you for your support! ❤️**
**🔐 Secure Evidence Management with Admin Controls** ⚖️
