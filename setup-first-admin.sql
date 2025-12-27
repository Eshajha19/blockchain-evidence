-- First Admin Setup Script for EVID-DGC
-- Run this ONCE in Supabase SQL Editor to create the first administrator

-- Replace 'YOUR_WALLET_ADDRESS_HERE' with the actual wallet address of the first admin
-- Replace 'First Admin Name' with the actual name of the first admin

INSERT INTO users (
    wallet_address,
    full_name,
    role,
    department,
    jurisdiction,
    badge_number,
    account_type,
    created_by,
    is_active
) VALUES (
    '0x1234567890123456789012345678901234567890', -- Replace with actual wallet address
    'System Administrator',                        -- Replace with actual admin name
    'admin',
    'Administration',
    'System',
    'ADMIN-001',
    'real',
    'system_setup',
    true
) ON CONFLICT (wallet_address) DO NOTHING;

-- Verify the admin was created
SELECT 
    wallet_address,
    full_name,
    role,
    created_at,
    is_active
FROM users 
WHERE role = 'admin' 
ORDER BY created_at;

-- Show admin count
SELECT COUNT(*) as admin_count 
FROM users 
WHERE role = 'admin' AND is_active = true;