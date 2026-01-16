// APP.JS - Ana Uygulama Kontrolü

// DOM Elements
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const messages = document.getElementById('messages');
const welcomeScreen = document.getElementById('welcomeScreen');
const messagesContainer = document.getElementById('messagesContainer');
const charCount = document.getElementById('charCount');
const themeBtn = document.getElementById('themeBtn');
const clearBtn = document.getElementById('clearBtn');
const mathCount = document.getElementById('mathCount');
const chatCount = document.getElementById('chatCount');
const modeBadge = document.getElementById('modeBadge');
const mathSidebar = document.getElementById('mathSidebar');
const chatSidebar = document.getElementById('chatSidebar');

// State
let currentMode = 'math'; // 'math' or 'chat'
let mathCounter = 0;
let chatCounter = 0;
let isDarkTheme = true;

// Background Animation
function createBackground() {
    const bg = document.getElementById('background');
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: rgba(99, 102, 241, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 15 + 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        bg.appendChild(particle);
    }
}

const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translate(0, 0); opacity: 0.3; }
        50% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px); opacity: 1; }
    }
`;
document.head.appendChild(style);
createBackground();

// Mode Switch
document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        currentMode = btn.getAttribute('data-mode');
        
        // Update sidebar
        if (currentMode === 'math') {
            mathSidebar.classList.remove('hidden');
            chatSidebar.classList.add('hidden');
            modeBadge.innerHTML = '<span class="badge-dot"></span> Matematik Modu';
            userInput.placeholder = "Matematik problemi yazın... (Örnek: integral x^2 dx)";
        } else {
            mathSidebar.classList.add('hidden');
            chatSidebar.classList.remove('hidden');
            modeBadge.innerHTML = '<span class="badge-dot"></span> Sohbet Modu';
            userInput.placeholder = "Mesajınızı yazın... (Örnek: Merhaba, nasılsın?)";
        }
    });
});

// Character Counter
userInput.addEventListener('input', () => {
    charCount.textContent = userInput.value.length;
    userInput.style.height = 'auto';
    userInput.style.height = userInput.scrollHeight + 'px';
});

// Theme Toggle
themeBtn.addEventListener('click', () => {
    isDarkTheme = !isDarkTheme;
    document.body.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
});

// Clear Chat
clearBtn.addEventListener('click', () => {
    messages.innerHTML = '';
    welcomeScreen.style.display = 'flex';
    mathCounter = 0;
    chatCounter = 0;
    mathCount.textContent = '0';
    chatCount.textContent = '0';
});

// Symbol Tools
document.querySelectorAll('.tool').forEach(btn => {
    btn.addEventListener('click', () => {
        const symbol = btn.getAttribute('data-symbol');
        const start = userInput.selectionStart;
        const text = userInput.value;
        userInput.value = text.substring(0, start) + symbol + text.substring(start);
        userInput.focus();
        userInput.selectionStart = userInput.selectionEnd = start + symbol.length;
        charCount.textContent = userInput.value.length;
    });
});

// Example Chips
document.querySelectorAll('.example').forEach(chip => {
    chip.addEventListener('click', () => {
        const text = chip.getAttribute('data-text');
        userInput.value = text;
        charCount.textContent = text.length;
        sendMessage();
    });
});

// Send Message
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    // Hide welcome
    if (welcomeScreen.style.display !== 'none') {
        welcomeScreen.style.display = 'none';
    }

    // Add user message
    addMessage(text, 'user');
    
    // Clear input
    userInput.value = '';
    charCount.textContent = '0';
    userInput.style.height = 'auto';

    // Process message
    setTimeout(() => {
        let response;
        
        if (currentMode === 'math') {
            response = processMathMessage(text);
            mathCounter++;
            mathCount.textContent = mathCounter;
        } else {
            response = chatAI.chat(text);
            chatCounter++;
            chatCount.textContent = chatCounter;
        }
        
        addMessage(response, 'ai');
    }, 500);
}

function processMathMessage(text) {
    const lower = text.toLowerCase();

    // İNTEGRAL
    if (lower.includes('integral') || lower.includes('∫')) {
        const expr = extractExpression(text, ['integral', '∫']);
        const result = mathSolver.solveIntegral(expr);
        return formatMathResult('İntegral', expr, result, '∫');
    }

    // TÜREV
    if (lower.includes('turev') || lower.includes('türev') || lower.includes('derivative')) {
        const expr = extractExpression(text, ['turev', 'türev', 'derivative', 'd/dx']);
        const result = mathSolver.solveDerivative(expr);
        return formatMathResult('Türev', expr, result, 'd/dx');
    }

    // LİMİT
    if (lower.includes('limit') || lower.includes('lim')) {
        const match = text.match(/limit\s+(.+?),?\s*x->(\S+)/i) ||
                      text.match(/lim\s*\(?(.+?)\)?.*?x->(\S+)/i);
        if (match) {
            const expr = match[1].trim();
            const point = match[2].trim();
            const result = mathSolver.solveLimit(expr, point);
            return formatMathResult('Limit', `lim(x→${point}) ${expr}`, result, 'lim');
        }
    }

    // DENKLEM
    if (lower.includes('coz') || lower.includes('çöz') || lower.includes('solve') || text.includes('=')) {
        const eqMatch = text.match(/[x\d\s\+\-\*\^()]+=[^=]+/);
        if (eqMatch) {
            const equation = eqMatch[0].trim();
            const result = mathSolver.solveEquation(equation);
            return formatMathResult('Denklem', equation, result, '=');
        }
    }

    // FİZİK
    if (lower.includes('fizik') || lower.includes('kuvvet') || lower.includes('f=ma') || lower.includes('e=mc')) {
        const result = mathSolver.solvePhysics(text);
        return formatMathResult('Fizik', text, result, '⚛️');
    }

    // KİMYA
    if (lower.includes('kimya') || lower.includes('mol') || lower.includes('ph')) {
        const result = mathSolver.solveChemistry(text);
        return formatMathResult('Kimya', text, result, '🧪');
    }

    // BİYOLOJİ
    if (lower.includes('biyoloji') || lower.includes('fotosentez') || lower.includes('hücre')) {
        const result = mathSolver.solveBiology(text);
        return formatMathResult('Biyoloji', text, result, '🧬');
    }

    // Matematik modunda genel yardım
    return `📐 **Matematik Modu**

**Kullanılabilir Komutlar:**
• \`integral x^2\` - İntegral hesapla
• \`turev sin(x)\` - Türev al
• \`limit sin(x)/x, x->0\` - Limit hesapla
• \`coz x^2-4=0\` - Denklem çöz

**Akademik:**
• Fizik: F=ma, E=mc²
• Kimya: Mol, pH
• Biyoloji: Fotosentez, hücre

Bir problem sorun! 🚀`;
}

function extractExpression(text, keywords) {
    let expr = text;
    for (let kw of keywords) {
        const idx = expr.toLowerCase().indexOf(kw.toLowerCase());
        if (idx !== -1) {
            expr = expr.substring(idx + kw.length).trim();
            break;
        }
    }
    return expr.replace(/^:\s*/, '').replace(/dx\s*$/i, '').trim();
}

function formatMathResult(title, question, result, icon) {
    if (result.error) {
        return `<div class="solution" style="border-left-color: #ef4444; background: rgba(239, 68, 68, 0.1);">
            <h4 style="color: #ef4444;">${icon} ${title} - Hata</h4>
            <p><strong>Soru:</strong> ${question}</p>
            <p style="color: #ef4444;"><strong>Hata:</strong> ${result.error}</p>
        </div>`;
    }

    let html = `<div class="solution">
        <h4>${icon} ${title}</h4>
        <p><strong>Soru:</strong> ${escapeHtml(question)}</p>
        <p><strong>✅ Sonuç:</strong> <code>${escapeHtml(result.result)}</code></p>`;

    if (result.steps && result.steps.length > 0) {
        html += '<div class="steps"><strong>📝 Adımlar:</strong>';
        for (let step of result.steps) {
            html += `<div class="step">${escapeHtml(step)}</div>`;
        }
        html += '</div>';
    }

    html += '</div>';
    return html;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function addMessage(content, type) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${type}`;

    const avatar = document.createElement('div');
    avatar.className = 'msg-avatar';
    avatar.textContent = type === 'user' ? '👤' : '🤖';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'msg-content';
    contentDiv.innerHTML = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    msgDiv.appendChild(avatar);
    msgDiv.appendChild(contentDiv);
    messages.appendChild(msgDiv);

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Menu Items
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
    });
});

console.log('%c🚀 UltimateAI Hazır!', 'color: #6366f1; font-size: 24px; font-weight: bold;');
console.log('%c✅ Matematik motoru: AKTIF', 'color: #10b981; font-size: 14px;');
console.log('%c💬 Sohbet motoru: AKTIF', 'color: #8b5cf6; font-size: 14px;');
console.log('%c🎯 Mod:', currentMode, 'color: #f59e0b; font-size: 14px;');
