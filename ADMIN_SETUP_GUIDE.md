# 🔐 EVID-DGC - Secure Admin Management Setup Guide

## 🚨 IMPORTANT SECURITY CHANGES

This system now implements **strict admin-controlled user management**. Self-registration has been **DISABLED** for security.

## 📋 Quick Setup Checklist

### 1. Database Setup
```sql
-- Run in Supabase SQL Editor
-- 1. First, run the main schema:
\i database-schema.sql

-- 2. Then create your first admin:
\i setup-first-admin.sql
-- (Edit the wallet address in setup-first-admin.sql first!)
```

### 2. Backend Server Setup
```bash
# Install dependencies
npm install

# Start the secure API server
npm start

# For development with auto-reload
npm run dev

# Frontend only (for testing)
npm run frontend
```

### 3. First Admin Configuration
1. Edit `setup-first-admin.sql`
2. Replace `0x1234567890123456789012345678901234567890` with your actual wallet address
3. Replace `System Administrator` with your actual name
4. Run the SQL script in Supabase

## 🔒 Security Features Implemented

### ✅ Admin-Only User Creation
- **No self-registration** - All accounts must be created by admins
- **Role validation** - Only valid roles can be assigned
- **Admin limit** - Maximum 10 administrators system-wide
- **Audit logging** - All admin actions are logged

### ✅ Access Control
- **Wallet validation** - Only registered wallets can access the system
- **Role-based permissions** - Each role has specific access levels
- **Active status checking** - Deactivated users cannot log in
- **Admin verification** - All admin operations verify admin status

### ✅ User Management
- **Soft delete only** - User data is preserved for audit purposes
- **Self-deletion prevention** - Users cannot delete their own accounts
- **Admin self-deletion prevention** - Admins cannot delete themselves

## 👥 User Roles Available

| Role | Code | Description | Self-Register |
|------|------|-------------|---------------|
| 👁️ Public Viewer | `public_viewer` | View public cases and evidence | ❌ No |
| 🕵️ Investigator | `investigator` | Create and manage cases | ❌ No |
| 🔬 Forensic Analyst | `forensic_analyst` | Analyze evidence | ❌ No |
| ⚖️ Legal Professional | `legal_professional` | Legal review | ❌ No |
| 🏛️ Court Official | `court_official` | Court proceedings | ❌ No |
| 📋 Evidence Manager | `evidence_manager` | Manage evidence lifecycle | ❌ No |
| 🔍 Auditor | `auditor` | System auditing | ❌ No |
| 👑 Administrator | `admin` | Full system access | ❌ Admin-only |

## 🔧 API Endpoints

### Public Endpoints
- `GET /api/health` - Health check
- `GET /api/user/:wallet` - Get user info (if exists)

### Admin-Only Endpoints (Require admin verification)
- `POST /api/admin/create-user` - Create regular user account
- `POST /api/admin/create-admin` - Create admin account
- `POST /api/admin/delete-user` - Soft delete user account
- `POST /api/admin/users` - Get all users list

### Blocked Endpoints
- `POST /api/user/delete-self` - Returns 403 Forbidden
- `POST /api/admin/*` - Returns 403 if not admin

## 🚀 User Flow Examples

### New User Trying to Access System
1. User connects MetaMask wallet
2. System checks if wallet exists in database
3. If wallet not found → Redirect to "Pending Approval" page
4. User sees message: "Contact administrator for access"
5. User must contact admin to get account created

### Admin Creating New User
1. Admin logs into admin dashboard
2. Admin fills "Create New User" form:
   - Wallet address (0x format)
   - Full name
   - Role selection (7 options, no admin)
   - Department, jurisdiction, badge number
3. System validates admin permissions
4. System creates user account
5. User can now log in immediately

### Admin Creating Another Admin
1. Admin uses "Create New Administrator" form
2. System checks admin limit (max 10)
3. System validates admin permissions
4. New admin account created
5. Action logged for audit

## 🛡️ Security Validations

### Wallet Address Validation
```javascript
// Must match this pattern
/^0x[a-fA-F0-9]{40}$/
```

### Role Validation
```javascript
// Only these roles allowed
['public_viewer', 'investigator', 'forensic_analyst', 
 'legal_professional', 'court_official', 'evidence_manager', 
 'auditor', 'admin']
```

### Admin Verification Process
1. Check wallet address format
2. Query database for user record
3. Verify role = 'admin'
4. Verify is_active = true
5. Proceed with admin operation

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    wallet_address TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN (...)),
    department TEXT,
    badge_number TEXT,
    jurisdiction TEXT,
    account_type TEXT DEFAULT 'real',
    created_by TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    last_updated TIMESTAMPTZ DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE
);
```

### Admin Actions Table
```sql
CREATE TABLE admin_actions (
    id SERIAL PRIMARY KEY,
    admin_wallet TEXT NOT NULL,
    action_type TEXT NOT NULL,
    target_wallet TEXT,
    details JSONB,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);
```

## 🚨 Emergency Procedures

### If Admin Account Gets Locked
1. Access Supabase directly
2. Run SQL to reactivate:
```sql
UPDATE users 
SET is_active = true 
WHERE wallet_address = 'ADMIN_WALLET_ADDRESS';
```

### If All Admins Are Lost
1. Use `setup-first-admin.sql` script
2. Create new admin account directly in database
3. New admin can then manage other accounts

### If Database Connection Fails
- System falls back to localStorage (limited functionality)
- Users with localStorage data can still access
- Admin functions will not work without database

## 📈 Monitoring and Auditing

### Admin Actions Logged
- `create_user` - Regular user creation
- `create_admin` - Admin user creation  
- `delete_user` - User deactivation
- `create_test_account` - Test account creation
- `delete_test_account` - Test account deletion

### Audit Query Examples
```sql
-- View all admin actions
SELECT * FROM admin_actions ORDER BY timestamp DESC;

-- Count users by role
SELECT role, COUNT(*) FROM users WHERE is_active = true GROUP BY role;

-- Find inactive users
SELECT * FROM users WHERE is_active = false;
```

## 🔧 Configuration

### Environment Variables
```bash
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
PORT=3001
```

### Rate Limiting
- General API: 100 requests per 15 minutes
- Admin API: 50 requests per 15 minutes

## 🚀 Deployment

### Local Development
```bash
npm run dev          # Start API server with auto-reload
npm run frontend     # Start frontend only
```

### Production (Render.com)
1. Connect GitHub repository
2. Set environment variables
3. Deploy with `render.yaml`
4. Run database setup scripts

## 📞 Support

For issues with the admin management system:
1. Check admin permissions in database
2. Verify wallet address format
3. Check API server logs
4. Review audit trail in admin_actions table

---

**🔐 Security First - All user accounts must be created by administrators**