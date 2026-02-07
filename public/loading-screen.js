document.addEventListener('DOMContentLoaded', function () {
    console.log('Loading screen initialized');
    
    const loadingScreen = document.getElementById('loading-screen');
    const progressFill = document.querySelector('.progress-fill');
    const progressPercentage = document.querySelector('.progress-percentage');
    const progressText = document.querySelector('.progress-text');
    const messages = document.querySelectorAll('.loading-messages .message');

    let currentMessage = 0;
    let messageInterval = null;
    let loadingCompleted = false;
    let loadingTimeouts = [];

    const MINIMUM_DISPLAY_TIME = 3000; 
    const startTime = Date.now();
    
    console.log('Loading screen elements found:', {
        loadingScreen: !!loadingScreen,
        progressFill: !!progressFill,
        progressPercentage: !!progressPercentage,
        progressText: !!progressText,
        messages: messages.length
    });

    /* ------------------ INIT ------------------ */
    function initLoadingScreen() {
        console.log('Initializing loading screen...');
        
        if (messages.length > 0) {
            messages.forEach(msg => msg.classList.remove('active'));
            messages[0].classList.add('active');
            currentMessage = 0;
            console.log('First message activated');
        }
        
        simulateLoading();
        startMessageCycle();
        console.log('Loading screen initialized successfully');
    }

    /* ------------------ FAKE PROGRESS ------------------ */
    function simulateLoading() {
        console.log('Starting simulated loading...');
        const steps = [
            { progress: 20, text: 'Initializing Blockchain Layer...' },
            { progress: 40, text: 'Loading Digital Evidence Database...' },
            { progress: 60, text: 'Verifying Chain of Custody...' },
            { progress: 80, text: 'Applying Access Controls...' },
            { progress: 95, text: 'Finalizing Audit Logs...' }
        ];

        steps.forEach((step, index) => {
            const timeoutId = setTimeout(() => {
                if (!loadingCompleted) {
                    console.log(`Setting progress to ${step.progress}%: ${step.text}`);
                    setProgress(step.progress);
                    if (progressText) progressText.textContent = step.text;
                }
            }, index * 600);
            
            loadingTimeouts.push(timeoutId);
        });
    }

    /* ------------------ MESSAGE CYCLING ------------------ */
    function startMessageCycle() {
        if (messages.length === 0) return;
        
        console.log('Starting message cycle');
        
        messageInterval = setInterval(() => {
            messages[currentMessage].classList.remove('active');
            currentMessage = (currentMessage + 1) % messages.length;
            messages[currentMessage].classList.add('active');
            console.log(`Switched to message ${currentMessage + 1}`);
        }, 2000);
    }

    function stopMessageCycle() {
        console.log('Stopping message cycle');
        if (messageInterval) {
            clearInterval(messageInterval);
            messageInterval = null;
        }
        
        loadingTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
        loadingTimeouts = [];
    }

    /* ------------------ PROGRESS ------------------ */
    function setProgress(value) {
        console.log(`Progress: ${value}%`);
        if (progressFill) progressFill.style.width = `${value}%`;
        if (progressPercentage) progressPercentage.textContent = `${value}%`;
    }

    /* ------------------ PUBLIC API ------------------ */
    window.completeLoading = function () {
        console.log('completeLoading() called');
        console.log('Loading completed flag:', loadingCompleted);
        console.log('Elapsed time:', Date.now() - startTime, 'ms');
        
        if (loadingCompleted) {
            console.log('Loading already completed, skipping');
            return;
        }
        

        const elapsed = Date.now() - startTime;
        const remainingTime = Math.max(0, MINIMUM_DISPLAY_TIME - elapsed);
        
        console.log(`Remaining display time: ${remainingTime}ms`);

        setTimeout(() => {
            console.log('Executing completion sequence');
            setProgress(100);
            stopMessageCycle();

            if (!loadingScreen) {
                console.error('Loading screen element not found!');
                return;
            }
            
            console.log('Adding fade-out class to loading screen');
            loadingScreen.classList.add('fade-out');

            setTimeout(() => {
                console.log('Hiding loading screen');
                if (loadingScreen) {
                    loadingScreen.style.display = 'none';
                    loadingCompleted = true;
                    console.log('Loading screen hidden');
                    console.log('Page should now be visible');
                }
            }, 800);
        }, remainingTime);
    };

    const safetyTimeout = setTimeout(() => {
        console.warn('Safety timeout triggered - forcing loading screen to complete');
        if (typeof window.completeLoading === 'function' && !loadingCompleted) {
            window.completeLoading();
        }
    }, 5000);
    
    loadingTimeouts.push(safetyTimeout);

    initLoadingScreen();
    
    window.debugLoadingScreen = {
        forceComplete: function() {
            console.log('Manual force complete triggered');
            if (typeof window.completeLoading === 'function') {
                window.completeLoading();
            }
        },
        getStatus: function() {
            return {
                loadingCompleted,
                elapsedTime: Date.now() - startTime,
                progress: progressPercentage ? progressPercentage.textContent : 'unknown'
            };
        }
    };
    
    console.log('Loading screen ready. Use debugLoadingScreen.forceComplete() to manually dismiss.');
});