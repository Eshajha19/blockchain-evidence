/**
 * EVID-DGC - Blockchain Evidence Management System
 * Main application logic
 */

let userAccount;

const roleNames = {
    1: 'Public Viewer',
    2: 'Investigator',
    3: 'Forensic Analyst',
    4: 'Legal Professional',
    5: 'Court Official',
    6: 'Evidence Manager',
    7: 'Auditor',
    8: 'Administrator'
};

const roleMapping = {
    1: 'public_viewer',
    2: 'investigator',
    3: 'forensic_analyst',
    4: 'legal_professional',
    5: 'court_official',
    6: 'evidence_manager',
    7: 'auditor',
    8: 'admin'
};

// Initialize application
function initializeApp() {
    console.log('Initializing EVID-DGC application...');
    
    try {
        // Initialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        
        // Initialize components
        initializeNavigation();
        initializeScrollUp();
        initializeRoleSelection();
        initializeSections();
        initializeParticles();
        initializeFAQ();
        initializeEmailLogin();
        
        // Add click handler for wallet connection
        const connectBtn = document.getElementById('connectWallet');
        if (connectBtn) {
            connectBtn.onclick = connectWallet;
        }
        
        // Initialize forms
        const registrationForm = document.getElementById('registrationForm');
        if (registrationForm) {
            registrationForm.addEventListener('submit', handleRegistration);
        }
        
        console.log('Application initialized successfully');
    } catch (error) {
        console.error('Initialization error:', error);
        showAlert('Application initialization failed. Please refresh the page.', 'error');
    }
}

// Navigation functions
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Email login functions
function showEmailLogin() {
    console.log('Showing email login modal...');
    const modal = document.getElementById('emailLoginModal');
    if (modal) {
        modal.classList.add('active');
    }
}

function closeEmailLogin() {
    const modal = document.getElementById('emailLoginModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function showEmailRegistration() {
    const modal = document.getElementById('emailRegistrationModal');
    if (modal) {
        modal.classList.add('active');
    }
}

function closeEmailRegistration() {
    const modal = document.getElementById('emailRegistrationModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Email login handler
function handleEmailLogin(event) {
    event.preventDefault();
    console.log('Handling email login...');
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        showAlert('Please enter both email and password', 'error');
        return;
    }
    
    // Admin login check
    if (email.toLowerCase() === 'gc67766@gmail.com' && password === '@Gopichand1@') {
        const adminData = {
            email: 'gc67766@gmail.com',
            fullName: 'System Administrator',
            role: 8,
            department: 'Administration',
            isRegistered: true,
            walletAddress: '0x29bb7718d5c6da6e787deae8fd6bb3459e8539f2',
            loginType: 'email',
            accountType: 'admin'
        };
        
        localStorage.setItem('emailUser_' + email, JSON.stringify(adminData));
        localStorage.setItem('currentUser', 'email_' + email);
        
        showAlert('Admin login successful!', 'success');
        closeEmailLogin();
        displayAdminOptions(adminData);
        toggleSections('adminOptions');
        return;
    }
    
    // Check localStorage for email users
    const emailUserKey = 'emailUser_' + email;
    const userData = localStorage.getItem(emailUserKey);
    
    if (userData) {
        const user = JSON.parse(userData);
        if (user.password === password) {
            localStorage.setItem('currentUser', 'email_' + email);
            closeEmailLogin();
            displayUserInfo(user);
            toggleSections('alreadyRegistered');
            showAlert('Login successful!', 'success');
        } else {
            showAlert('Invalid password', 'error');
        }
    } else {
        showAlert('User not found. Please register first.', 'error');
    }
}

// Handle email registration
function handleEmailRegistration(event) {
    event.preventDefault();
    console.log('Handling email registration...');

    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;
    const fullName = document.getElementById('regFullName').value;
    const role = parseInt(document.getElementById('regRole').value);

    if (password !== confirmPassword) {
        showAlert('Passwords do not match.', 'error');
        return;
    }

    if (password.length < 6) {
        showAlert('Password must be at least 6 characters.', 'error');
        return;
    }

    const existingUser = localStorage.getItem('emailUser_' + email);
    if (existingUser) {
        showAlert('Account already exists.', 'error');
        return;
    }

    const userData = {
        email,
        password,
        fullName,
        role,
        department: 'General',
        jurisdiction: 'General',
        isRegistered: true,
        registrationDate: new Date().toISOString(),
        loginType: 'email'
    };

    localStorage.setItem('emailUser_' + email, JSON.stringify(userData));
    localStorage.setItem('currentUser', 'email_' + email);

    showAlert('Registration successful!', 'success');
    closeEmailRegistration();

    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1500);
}

// Initialize email login functionality
function initializeEmailLogin() {
    const emailLoginForm = document.getElementById('emailLoginForm');
    if (emailLoginForm) {
        emailLoginForm.addEventListener('submit', handleEmailLogin);
    }
    
    const emailRegForm = document.getElementById('emailRegistrationForm');
    if (emailRegForm) {
        emailRegForm.addEventListener('submit', handleEmailRegistration);
    }
}

// Wallet connection
async function connectWallet() {
    console.log('Attempting to connect wallet...');
    closeErrorModal();

    if (!navigator.onLine) {
        showErrorModal('No Internet Connection', 'Please check your network settings and try again.');
        return;
    }

    try {
        showLoading(true);

        if (!window.ethereum) {
            if (config && config.DEMO_MODE) {
                console.log('Demo mode: Using mock wallet');
                userAccount = '0x1234567890123456789012345678901234567890';
                await new Promise(resolve => setTimeout(resolve, 1500));
                updateWalletUI();
                await checkRegistrationStatus();
                showLoading(false);
                return;
            }

            showLoading(false);
            showErrorModal(
                'MetaMask Not Found',
                'MetaMask is not installed. Please install it to use this application.',
                'Install MetaMask',
                () => window.open('https://metamask.io/download/', '_blank')
            );
            return;
        }

        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
        });

        if (accounts.length === 0) {
            showLoading(false);
            showErrorModal('Account Access Required', 'Please unlock your MetaMask wallet and select an account.');
            return;
        }

        userAccount = accounts[0];
        console.log('Wallet connected:', userAccount);
        
        localStorage.setItem('wasConnected', 'true');
        
        updateWalletUI();
        await checkRegistrationStatus();
        showLoading(false);

    } catch (error) {
        showLoading(false);
        console.error('Wallet connection error:', error);

        if (error.code === 4001) {
            showErrorModal('Connection Rejected', 'You rejected the connection request. This app requires a wallet connection to function.', 'Try Again', connectWallet);
        } else {
            showErrorModal('Connection Failed', error.message || 'An unexpected error occurred.');
        }
    }
}

function updateWalletUI() {
    const walletAddr = document.getElementById('walletAddress');
    const walletStatus = document.getElementById('walletStatus');
    const connectBtn = document.getElementById('connectWallet');

    if (walletAddr) {
        walletAddr.textContent = userAccount;
    }

    if (walletStatus) {
        walletStatus.classList.remove('hidden');
    }

    if (connectBtn) {
        connectBtn.innerHTML = '<i data-lucide="check"></i> Connected';
        connectBtn.disabled = true;
        connectBtn.classList.add('btn-success');
        lucide.createIcons();
    }
}

// Check registration status
async function checkRegistrationStatus() {
    console.log('Checking registration status for:', userAccount);
    
    if (!userAccount) {
        showAlert('Please connect your wallet first', 'error');
        return;
    }
    
    const savedUser = localStorage.getItem('evidUser_' + userAccount);
    
    if (savedUser) {
        const userData = JSON.parse(savedUser);
        console.log('Found existing user:', userData);
        displayUserInfo(userData);
        
        if (userData.role === 'admin' || userData.role === 8) {
            displayAdminOptions(userData);
            toggleSections('adminOptions');
        } else {
            toggleSections('alreadyRegistered');
        }
    } else {
        console.log('No existing user found, creating test users and showing registration');
        createTestUsers();
        toggleSections('registration');
    }
}

function createTestUsers() {
    const testUsers = [
        { role: 'public_viewer', name: 'Test Public Viewer', wallet: '0xtest1000000000000000000000000000000000001' },
        { role: 'investigator', name: 'Test Investigator', wallet: '0xtest1000000000000000000000000000000000002' },
        { role: 'forensic_analyst', name: 'Test Forensic Analyst', wallet: '0xtest1000000000000000000000000000000000003' },
        { role: 'legal_professional', name: 'Test Legal Professional', wallet: '0xtest1000000000000000000000000000000000004' },
        { role: 'court_official', name: 'Test Court Official', wallet: '0xtest1000000000000000000000000000000000005' },
        { role: 'evidence_manager', name: 'Test Evidence Manager', wallet: '0xtest1000000000000000000000000000000000006' },
        { role: 'auditor', name: 'Test Auditor', wallet: '0xtest1000000000000000000000000000000000007' }
    ];

    testUsers.forEach(user => {
        const existingUser = localStorage.getItem('evidUser_' + user.wallet);
        if (!existingUser) {
            const userData = {
                fullName: user.name,
                email: `${user.role}@test.com`,
                role: user.role,
                department: 'Test Department',
                jurisdiction: 'Test',
                badgeNumber: `TEST-${user.role.toUpperCase()}`,
                isRegistered: true,
                registrationDate: new Date().toISOString(),
                walletAddress: user.wallet,
                accountType: 'test'
            };
            localStorage.setItem('evidUser_' + user.wallet, JSON.stringify(userData));
        }
    });
}

function displayAdminOptions(userData) {
    const userName = document.getElementById('adminUserName');
    const userRoleName = document.getElementById('adminUserRoleName');

    if (userName) {
        userName.textContent = userData.fullName || 'Administrator';
    }

    if (userRoleName) {
        userRoleName.textContent = 'Administrator';
    }
}

function displayUserInfo(userData) {
    const userName = document.getElementById('userName');
    const userRoleName = document.getElementById('userRoleName');

    if (userName) {
        userName.textContent = userData.fullName || 'User';
    }

    if (userRoleName) {
        let roleName;
        if (typeof userData.role === 'number') {
            roleName = roleNames[userData.role];
        } else if (typeof userData.role === 'string') {
            roleName = userData.role.split('_').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ');
        } else {
            roleName = 'User';
        }
        userRoleName.textContent = roleName;
    }
}

function toggleSections(active) {
    const sections = ['wallet', 'registration', 'alreadyRegistered', 'adminOptions'];

    sections.forEach(id => {
        const element = document.getElementById(id + 'Section');
        if (element) {
            element.classList.toggle('hidden', id !== active);
        }
    });
}

// Registration handler
async function handleRegistration(event) {
    event.preventDefault();

    try {
        const role = parseInt(document.getElementById('userRole')?.value);
        const fullName = document.getElementById('fullName')?.value;
        const badgeNumber = document.getElementById('badgeNumber')?.value;
        const department = document.getElementById('department')?.value;
        const jurisdiction = document.getElementById('jurisdiction')?.value;

        if (!role || !fullName) {
            showAlert('Please select a role and enter your full name.', 'error');
            return;
        }

        const userData = {
            fullName,
            role,
            badgeNumber: badgeNumber || '',
            department: department || 'General',
            jurisdiction: jurisdiction || 'General',
            isRegistered: true,
            registrationDate: new Date().toISOString(),
            walletAddress: userAccount
        };

        localStorage.setItem('evidUser_' + userAccount, JSON.stringify(userData));
        localStorage.setItem('currentUser', userAccount);

        showAlert('Registration successful! Redirecting to dashboard...', 'success');

        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 2000);

    } catch (error) {
        console.error('Registration failed:', error);
        showAlert('Registration failed. Please try again.', 'error');
    }
}

// Navigation functions
function goToDashboard() {
    window.location.href = 'dashboard.html';
}

function goToAdminDashboard() {
    window.location.href = 'admin.html';
}

function logout() {
    localStorage.clear();
    userAccount = null;

    const walletStatus = document.getElementById('walletStatus');
    const connectBtn = document.getElementById('connectWallet');

    if (walletStatus) walletStatus.classList.add('hidden');
    if (connectBtn) {
        connectBtn.innerHTML = '<i data-lucide="link"></i> Connect MetaMask';
        connectBtn.disabled = false;
        connectBtn.classList.remove('btn-success');
        lucide.createIcons();
    }

    initializeSections();
    showAlert('Logged out successfully', 'info');
}

function disconnectWallet() {
    userAccount = null;
    localStorage.removeItem('wasConnected');

    const walletStatus = document.getElementById('walletStatus');
    const connectBtn = document.getElementById('connectWallet');

    if (walletStatus) walletStatus.classList.add('hidden');
    if (connectBtn) {
        connectBtn.innerHTML = '<i data-lucide="link"></i> Connect MetaMask';
        connectBtn.disabled = false;
        connectBtn.classList.remove('btn-success');
        lucide.createIcons();
    }

    initializeSections();
    showAlert('Wallet disconnected successfully', 'info');
}

// Initialize sections
function initializeSections() {
    const sections = ['walletStatus', 'registrationSection', 'alreadyRegisteredSection', 'adminOptionsSection'];
    sections.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.classList.add('hidden');
        }
    });
    
    const walletSection = document.getElementById('walletSection');
    if (walletSection) {
        walletSection.classList.remove('hidden');
    }
}

// Initialize navigation
function initializeNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');

            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        });

        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            }
        });
    }
}

// Initialize scroll up button
function initializeScrollUp() {
    const scrollBtn = document.getElementById('scrollUpBtn');

    if (scrollBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        });

        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Initialize role selection
function initializeRoleSelection() {
    const roleCards = document.querySelectorAll('.role-card');
    const userRoleInput = document.getElementById('userRole');

    roleCards.forEach(card => {
        card.addEventListener('click', () => {
            roleCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');

            const roleValue = parseInt(card.getAttribute('data-role'));
            if (userRoleInput) {
                userRoleInput.value = roleValue;
            }
        });
    });
}

// Initialize particles
function initializeParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 25 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Initialize FAQ
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                item.classList.toggle('active');
                lucide.createIcons();
            });
        }
    });
}

// Loading functions
function showLoading(show, message = 'Loading...') {
    const loader = document.getElementById('loader');
    if (loader) {
        if (show) {
            loader.classList.remove('hidden');
        } else {
            loader.classList.add('hidden');
        }
    }
}

// Alert system
function showAlert(message, type = 'info') {
    const existingAlerts = document.querySelectorAll('.alert');
    existingAlerts.forEach(alert => alert.remove());

    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
            <i data-lucide="${getAlertIcon(type)}" style="width: 16px; height: 16px;"></i>
            <span>${message}</span>
        </div>
    `;

    document.body.appendChild(alert);

    lucide.createIcons();

    setTimeout(() => {
        if (alert.parentNode) {
            alert.remove();
        }
    }, 5000);

    alert.addEventListener('click', () => {
        alert.remove();
    });
}

function getAlertIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'x-circle',
        warning: 'alert-triangle',
        info: 'info'
    };
    return icons[type] || 'info';
}

// Error modal functions
function showErrorModal(title, description, actionText = null, actionCallback = null) {
    const modal = document.getElementById('errorModal');
    const titleEl = document.getElementById('errorTitle');
    const descEl = document.getElementById('errorDescription');
    const actionBtn = document.getElementById('errorActionBtn');

    if (modal && titleEl && descEl) {
        titleEl.textContent = title;
        descEl.innerHTML = description;

        if (actionText && actionCallback) {
            actionBtn.textContent = actionText;
            actionBtn.onclick = actionCallback;
            actionBtn.classList.remove('hidden');
        } else {
            actionBtn.classList.add('hidden');
        }
        modal.classList.add('active');
    } else {
        showAlert(`${title}: ${description}`, 'error');
    }
}

function closeErrorModal() {
    const modal = document.getElementById('errorModal');
    if (modal) modal.classList.remove('active');
}

// Ethereum event listeners
if (window.ethereum) {
    window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
            disconnectWallet();
        } else {
            location.reload();
        }
    });

    window.ethereum.on('chainChanged', () => {
        location.reload();
    });
}

// Global exports
window.EVID_DGC = {
    connectWallet,
    disconnectWallet,
    logout,
    showAlert,
    scrollToSection
};

// Global error handlers
window.addEventListener('error', function(event) {
    console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
});