# 🔐 EVID-DGC - Blockchain Evidence Management System

**Secure admin-controlled evidence management system with role-based access.**

## ✨ Features

- 🔒 **Admin-Only User Management** - Secure user creation by administrators
- 👥 **8 User Roles** - Complete role-based access control
- 🧪 **Test User System** - Create and login as test users for development
- 📊 **Admin Dashboard** - Comprehensive system oversight
- 💾 **Database Storage** - Supabase PostgreSQL backend
- 📱 **Modern UI** - Professional responsive design

## 🚀 Quick Start

### 1. Database Setup
```sql
-- Run database-schema.sql in Supabase SQL Editor
-- Then run setup-first-admin.sql with your wallet address
```

### 2. Start Application
```bash
# Backend API server
npm install
npm start

# Or frontend only
cd public
python -m http.server 8080
```

### 3. Access System
```
http://localhost:3001  # Full system with API
http://localhost:8080  # Frontend only
```

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

| Role | Access Level | Self-Register |
|------|-------------|---------------|
| 👁️ **Public Viewer** | View public cases | ✅ Yes |
| 🕵️ **Investigator** | Create and manage cases | ✅ Yes |
| 🔬 **Forensic Analyst** | Analyze evidence | ✅ Yes |
| ⚖️ **Legal Professional** | Legal review | ✅ Yes |
| 🏛️ **Court Official** | Court proceedings | ✅ Yes |
| 📋 **Evidence Manager** | Manage evidence lifecycle | ✅ Yes |
| 🔍 **Auditor** | System auditing | ✅ Yes |
| 👑 **Administrator** | Full system access | ❌ Admin-only |

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

### Public
- `GET /api/health` - Health check
- `GET /api/user/:wallet` - Get user info

### Admin-Only
- `POST /api/admin/create-user` - Create regular user
- `POST /api/admin/create-admin` - Create admin user
- `POST /api/admin/delete-user` - Soft delete user
- `POST /api/admin/users` - Get all users

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

## 📞 Support

For setup or usage questions:
1. Check database connection in Supabase
2. Verify environment variables are set
3. Review browser console for errors
4. Check admin_actions table for audit logs

---

**🔐 Secure Evidence Management with Admin Controls** ⚖️