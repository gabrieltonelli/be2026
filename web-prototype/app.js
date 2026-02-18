// App State
const appState = {
    currentScreen: 'splash',
    selectedAmbits: ['laboral', 'social'],
    connectedNetworks: ['facebook'],
    user: {
        name: 'Usuario',
        networks: ['facebook']
    }
};

// Screen Navigation
function showScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    // Show target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        appState.currentScreen = screenId;
    }
}

// Splash Screen - Auto transition after 3 seconds
setTimeout(() => {
    showScreen('login');
}, 3500);

// Login Functions
function loginWith(network) {
    console.log(`Logging in with ${network}...`);

    // Show loading animation
    const button = event.target.closest('.btn-social');
    const originalText = button.querySelector('span').textContent;
    button.querySelector('span').textContent = 'Conectando...';
    button.disabled = true;

    // Simulate login delay
    setTimeout(() => {
        appState.connectedNetworks.push(network);
        appState.user.networks.push(network);
        showScreen('wizard-ambits');
    }, 1500);
}

function showMoreNetworks() {
    alert('Próximamente: Instagram, Twitter, TikTok y más...');
}

// Wizard Functions
function toggleAmbit(card) {
    const ambit = card.dataset.ambit;
    card.classList.toggle('selected');

    if (appState.selectedAmbits.includes(ambit)) {
        appState.selectedAmbits = appState.selectedAmbits.filter(a => a !== ambit);
    } else {
        appState.selectedAmbits.push(ambit);
    }

    console.log('Selected ambits:', appState.selectedAmbits);
}

function nextWizardStep(step) {
    if (step === 'workspace') {
        if (appState.selectedAmbits.length === 0) {
            showNotification('Por favor selecciona al menos un ámbito', 'warning');
            return;
        }
        showScreen('wizard-workspace');
    } else if (step === 'networks') {
        showScreen('wizard-networks');
    }
}

function joinWorkspace() {
    const code = document.getElementById('workspace-code').value.trim();
    if (code) {
        console.log('Joining workspace:', code);
        showNotification(`Uniéndote al workspace: ${code}`, 'success');
        setTimeout(() => {
            nextWizardStep('networks');
        }, 1000);
    } else {
        showNotification('Ingresa un código de workspace', 'warning');
    }
}

function connectNetwork(network) {
    console.log(`Connecting ${network}...`);
    const button = event.target;
    button.textContent = 'Conectando...';
    button.disabled = true;

    setTimeout(() => {
        appState.connectedNetworks.push(network);

        // Update UI
        const networkItem = button.closest('.network-item');
        networkItem.querySelector('.network-info').insertAdjacentHTML('beforeend', '');
        button.remove();
        networkItem.insertAdjacentHTML('beforeend', '<span class="network-status connected">Conectado ✓</span>');

        showNotification(`${network} conectado exitosamente`, 'success');
    }, 1500);
}

function finishWizard() {
    console.log('Wizard completed!');
    showScreen('contacts-list');

    // Confetti effect
    createConfetti();
}

// Contacts Functions
function startRating() {
    console.log('Starting rating flow...');
    showNotification('¡Próximamente! Pantalla de calificaciones en desarrollo 🚀', 'info');

    // Simulate button animation
    const button = event.target.closest('.btn-play');
    button.style.transform = 'scale(0.9)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 200);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: type === 'success' ? '#22c55e' : type === 'warning' ? '#f59e0b' : '#6366f1',
        color: 'white',
        padding: '1rem 2rem',
        borderRadius: '0.75rem',
        fontWeight: '600',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        zIndex: '9999',
        animation: 'slideInDown 0.3s ease',
        maxWidth: '90%',
        textAlign: 'center'
    });

    document.body.appendChild(notification);

    // Auto remove
    setTimeout(() => {
        notification.style.animation = 'slideOutUp 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Confetti Effect
function createConfetti() {
    const confettiCount = 50;
    const colors = ['#6366f1', '#8b5cf6', '#06b6d4', '#22c55e', '#fbbf24'];

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';

        Object.assign(confetti.style, {
            position: 'fixed',
            width: '10px',
            height: '10px',
            background: colors[Math.floor(Math.random() * colors.length)],
            left: Math.random() * 100 + '%',
            top: '-20px',
            opacity: Math.random(),
            transform: `rotate(${Math.random() * 360}deg)`,
            zIndex: '9999',
            pointerEvents: 'none'
        });

        document.body.appendChild(confetti);

        // Animate
        const duration = Math.random() * 3 + 2;
        const finalX = (Math.random() - 0.5) * 200;

        confetti.animate([
            { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
            { transform: `translate(${finalX}px, 100vh) rotate(${Math.random() * 720}deg)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => confetti.remove();
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInDown {
        from {
            transform: translate(-50%, -100%);
            opacity: 0;
        }
        to {
            transform: translate(-50%, 0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutUp {
        from {
            transform: translate(-50%, 0);
            opacity: 1;
        }
        to {
            transform: translate(-50%, -100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Keyboard shortcuts (for development)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        showScreen('login');
    }

    // Number keys 1-6 for quick screen navigation
    const screens = ['splash', 'login', 'wizard-ambits', 'wizard-workspace', 'wizard-networks', 'contacts-list'];
    const num = parseInt(e.key);
    if (num >= 1 && num <= 6) {
        showScreen(screens[num - 1]);
    }
});

// Log app state changes (development)
const originalShowScreen = showScreen;
window.showScreen = function (screenId) {
    console.log(`%c Screen: ${appState.currentScreen} → ${screenId}`, 'color: #6366f1; font-weight: bold');
    originalShowScreen(screenId);
};

// Welcome message
console.log('%c🚀 Be - Prototipo Web', 'font-size: 20px; color: #6366f1; font-weight: bold');
console.log('%cDesarrollado con ❤️', 'color: #8b5cf6');
console.log('%cAtajos de teclado:', 'font-weight: bold');
console.log('  1-6: Navegar entre pantallas');
console.log('  ESC: Volver al login');
