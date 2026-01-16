// MATH-SOLVER.JS - İleri Seviye Matematik ve Akademik Çözücü

class UltimateMathSolver {
    
    // ========== İNTEGRAL ==========
    solveIntegral(expr) {
        expr = this.clean(expr);
        
        // Basit integraller
        const simpleIntegrals = {
            'x': { result: 'x²/2 + C', steps: ['∫ x dx', 'x²/2 + C'] },
            'x^2': { result: 'x³/3 + C', steps: ['∫ x² dx', 'x³/3 + C'] },
            'x^3': { result: 'x⁴/4 + C', steps: ['∫ x³ dx', 'x⁴/4 + C'] },
            'x^4': { result: 'x⁵/5 + C', steps: ['∫ x⁴ dx', 'x⁵/5 + C'] },
            'x^5': { result: 'x⁶/6 + C', steps: ['∫ x⁵ dx', 'x⁶/6 + C'] },
            '1': { result: 'x + C', steps: ['∫ 1 dx', 'x + C'] },
            'sin(x)': { result: '-cos(x) + C', steps: ['∫ sin(x) dx', '-cos(x) + C'] },
            'cos(x)': { result: 'sin(x) + C', steps: ['∫ cos(x) dx', 'sin(x) + C'] },
            'e^x': { result: 'e^x + C', steps: ['∫ e^x dx', 'e^x + C'] },
            '1/x': { result: 'ln|x| + C', steps: ['∫ 1/x dx', 'ln|x| + C'] }
        };
        
        if (simpleIntegrals[expr]) return simpleIntegrals[expr];
        
        // ax şeklinde
        let match = expr.match(/^(\d+)x$/);
        if (match) {
            const a = parseInt(match[1]);
            return {
                result: `${a/2}x² + C`,
                steps: [`∫ ${a}x dx`, `${a}(x²/2)`, `${a/2}x² + C`]
            };
        }
        
        // ax^n şeklinde
        match = expr.match(/^(\d+)x\^(\d+)$/);
        if (match) {
            const a = parseInt(match[1]);
            const n = parseInt(match[2]);
            const result = (a/(n+1)).toFixed(3);
            return {
                result: `${result}x^${n+1} + C`,
                steps: [`∫ ${a}x^${n} dx`, `${a}/(${n+1}) × x^${n+1}`, `${result}x^${n+1} + C`]
            };
        }
        
        // Toplam (x^2 + 3x)
        if (expr.includes('+')) {
            const parts = expr.split('+').map(p => p.trim());
            let results = [];
            let steps = ['Terim terim integral:'];
            
            for (let part of parts) {
                const integ = this.solveIntegral(part);
                if (integ && !integ.error) {
                    results.push(integ.result.replace(' + C', ''));
                    steps.push(`∫ ${part} dx = ${integ.result}`);
                }
            }
            
            if (results.length > 0) {
                return { result: results.join(' + ') + ' + C', steps };
            }
        }
        
        return { error: `Desteklenmiyor: "${expr}". Dene: x, x^2, 2x, 3x^2, sin(x), cos(x), e^x` };
    }
    
    // ========== TÜREV ==========
    solveDerivative(expr) {
        expr = this.clean(expr);
        
        // Basit türevler
        const simpleDerivatives = {
            'x': { result: '1', steps: ['d/dx(x) = 1'] },
            'x^2': { result: '2x', steps: ['d/dx(x²) = 2x'] },
            'x^3': { result: '3x²', steps: ['d/dx(x³) = 3x²'] },
            'x^4': { result: '4x³', steps: ['d/dx(x⁴) = 4x³'] },
            'x^5': { result: '5x⁴', steps: ['d/dx(x⁵) = 5x⁴'] },
            'sin(x)': { result: 'cos(x)', steps: ['d/dx(sin(x)) = cos(x)'] },
            'cos(x)': { result: '-sin(x)', steps: ['d/dx(cos(x)) = -sin(x)'] },
            'tan(x)': { result: 'sec²(x)', steps: ['d/dx(tan(x)) = sec²(x)'] },
            'e^x': { result: 'e^x', steps: ['d/dx(e^x) = e^x'] },
            'ln(x)': { result: '1/x', steps: ['d/dx(ln(x)) = 1/x'] }
        };
        
        if (simpleDerivatives[expr]) return simpleDerivatives[expr];
        
        // Sabit
        if (/^\d+$/.test(expr)) {
            return { result: '0', steps: ['Sabit sayının türevi = 0'] };
        }
        
        // x^n
        let match = expr.match(/^x\^(\d+)$/);
        if (match) {
            const n = parseInt(match[1]);
            const coef = n;
            const newPow = n - 1;
            const result = newPow === 0 ? `${coef}` : newPow === 1 ? `${coef}x` : `${coef}x^${newPow}`;
            return { result, steps: [`d/dx(x^${n}) = ${result}`] };
        }
        
        // ax^n
        match = expr.match(/^(\d+)x\^(\d+)$/);
        if (match) {
            const a = parseInt(match[1]);
            const n = parseInt(match[2]);
            const coef = a * n;
            const newPow = n - 1;
            const result = newPow === 0 ? `${coef}` : newPow === 1 ? `${coef}x` : `${coef}x^${newPow}`;
            return { result, steps: [`d/dx(${a}x^${n}) = ${result}`] };
        }
        
        // ax
        match = expr.match(/^(\d+)x$/);
        if (match) {
            return { result: match[1], steps: [`d/dx(${match[1]}x) = ${match[1]}`] };
        }
        
        // Toplam
        if (expr.includes('+')) {
            const parts = expr.split('+').map(p => p.trim());
            let results = [];
            let steps = ['Terim terim türev:'];
            
            for (let part of parts) {
                const deriv = this.solveDerivative(part);
                if (deriv && !deriv.error && deriv.result !== '0') {
                    results.push(deriv.result);
                    steps.push(`d/dx(${part}) = ${deriv.result}`);
                }
            }
            
            if (results.length > 0) {
                return { result: results.join(' + '), steps };
            }
        }
        
        return { error: `Desteklenmiyor: "${expr}". Dene: x, x^2, sin(x), cos(x), e^x, ln(x)` };
    }
    
    // ========== LİMİT ==========
    solveLimit(expr, point) {
        expr = this.clean(expr);
        
        // Özel limitler
        if (expr === 'sin(x)/x' && point === '0') {
            return { result: '1', steps: ['Önemli limit:', 'lim(x→0) sin(x)/x = 1'] };
        }
        
        if (expr === '(1-cos(x))/x' && point === '0') {
            return { result: '0', steps: ['lim(x→0) (1-cos(x))/x = 0'] };
        }
        
        if (expr === '(e^x-1)/x' && point === '0') {
            return { result: '1', steps: ['lim(x→0) (e^x-1)/x = 1'] };
        }
        
        // Basit yerine koyma
        if (point !== 'inf' && point !== '-inf') {
            const x = parseFloat(point);
            
            // x^n
            let match = expr.match(/^x\^(\d+)$/);
            if (match) {
                const n = parseInt(match[1]);
                const result = Math.pow(x, n);
                return { result: result.toString(), steps: [`x = ${x}`, `${x}^${n} = ${result}`] };
            }
            
            // x
            if (expr === 'x') {
                return { result: point, steps: [`lim(x→${point}) x = ${point}`] };
            }
        }
        
        // Sonsuz limit
        if (point === 'inf') {
            if (expr === '1/x') {
                return { result: '0', steps: ['lim(x→∞) 1/x = 0'] };
            }
            if (expr === 'x') {
                return { result: '∞', steps: ['lim(x→∞) x = ∞'] };
            }
        }
        
        return { error: `Limit hesaplanamadı: "${expr}" x→${point}` };
    }
    
    // ========== DENKLEM ÇÖZME ==========
    solveEquation(eq) {
        eq = this.clean(eq);
        
        // Doğrusal: ax + b = c
        let match = eq.match(/^([+-]?\d*\.?\d*)x([+-]\d+\.?\d*)=([+-]?\d+\.?\d*)$/);
        if (match) {
            const a = match[1] === '' || match[1] === '+' ? 1 : match[1] === '-' ? -1 : parseFloat(match[1]);
            const b = parseFloat(match[2]);
            const c = parseFloat(match[3]);
            const x = (c - b) / a;
            
            return {
                result: `x = ${x}`,
                steps: [
                    `${a}x ${b >= 0 ? '+' : ''} ${b} = ${c}`,
                    `${a}x = ${c - b}`,
                    `x = ${x}`
                ]
            };
        }
        
        // Karesel: x^2 + bx + c = 0
        match = eq.match(/^x\^2([+-]\d+\.?\d*)x([+-]\d+\.?\d*)=0$/);
        if (match) {
            const a = 1;
            const b = parseFloat(match[1]);
            const c = parseFloat(match[2]);
            const disc = b * b - 4 * a * c;
            
            if (disc < 0) {
                return {
                    result: 'Reel çözüm yok',
                    steps: [`Δ = ${disc} < 0`, 'Reel kökler yok']
                };
            }
            
            const x1 = (-b + Math.sqrt(disc)) / 2;
            const x2 = (-b - Math.sqrt(disc)) / 2;
            
            return {
                result: disc === 0 ? `x = ${x1}` : `x₁ = ${x1.toFixed(2)}, x₂ = ${x2.toFixed(2)}`,
                steps: [
                    `x² ${b >= 0 ? '+' : ''} ${b}x ${c >= 0 ? '+' : ''} ${c} = 0`,
                    `Δ = ${disc.toFixed(2)}`,
                    disc === 0 ? `x = ${x1}` : `x₁ = ${x1.toFixed(2)}, x₂ = ${x2.toFixed(2)}`
                ]
            };
        }
        
        return { error: `Denklem çözülemedi: "${eq}". Dene: 2x+5=11 veya x^2-5x+6=0` };
    }
    
    // ========== FİZİK ==========
    solvePhysics(query) {
        query = query.toLowerCase();
        
        // F = m * a
        if (query.includes('f=ma') || query.includes('kuvvet')) {
            const mMatch = query.match(/m=(\d+\.?\d*)/);
            const aMatch = query.match(/a=(\d+\.?\d*)/);
            
            if (mMatch && aMatch) {
                const m = parseFloat(mMatch[1]);
                const a = parseFloat(aMatch[1]);
                const F = m * a;
                
                return {
                    result: `F = ${F} N`,
                    steps: [
                        'Newton\'un 2. Yasası: F = m × a',
                        `F = ${m} × ${a}`,
                        `F = ${F} N`
                    ]
                };
            }
            
            return {
                result: 'F = m × a',
                steps: ['Newton\'un 2. Yasası', 'F = Kuvvet (N)', 'm = Kütle (kg)', 'a = İvme (m/s²)']
            };
        }
        
        // E = m * c^2
        if (query.includes('e=mc') || query.includes('enerji')) {
            return {
                result: 'E = mc²',
                steps: [
                    'Einstein Denkl emi',
                    'E = Enerji (J)',
                    'm = Kütle (kg)',
                    'c = Işık hızı (3×10⁸ m/s)'
                ]
            };
        }
        
        // v = s / t
        if (query.includes('hız') || query.includes('v=')) {
            return {
                result: 'v = s / t',
                steps: ['Hız formülü', 'v = Hız (m/s)', 's = Yol (m)', 't = Zaman (s)']
            };
        }
        
        return { error: 'Fizik sorusu anlaşılamadı. Dene: F=ma, E=mc², hız formülü' };
    }
    
    // ========== KİMYA ==========
    solveChemistry(query) {
        query = query.toLowerCase();
        
        // Mol hesabı
        if (query.includes('mol') || query.includes('avogadro')) {
            return {
                result: 'n = m / M',
                steps: [
                    'Mol formülü',
                    'n = Mol sayısı',
                    'm = Kütle (g)',
                    'M = Molar kütle (g/mol)',
                    'Avogadro sayısı: 6.022 × 10²³'
                ]
            };
        }
        
        // pH hesabı
        if (query.includes('ph')) {
            return {
                result: 'pH = -log[H⁺]',
                steps: [
                    'pH formülü',
                    'pH = -log[H⁺]',
                    '[H⁺] = Hidrojen iyonu konsantrasyonu',
                    'pH < 7: Asit',
                    'pH = 7: Nötr',
                    'pH > 7: Baz'
                ]
            };
        }
        
        return { error: 'Kimya sorusu anlaşılamadı. Dene: mol, pH hesabı' };
    }
    
    // ========== BİYOLOJİ ==========
    solveBiology(query) {
        query = query.toLowerCase();
        
        if (query.includes('fotosentez')) {
            return {
                result: '6CO₂ + 6H₂O + Işık → C₆H₁₂O₆ + 6O₂',
                steps: [
                    'Fotosentez denklemi',
                    'Karbondioksit + Su + Güneş ışığı',
                    '→ Glikoz + Oksijen',
                    'Klorofil gereklidir'
                ]
            };
        }
        
        if (query.includes('hücre')) {
            return {
                result: 'Hücre Yapısı',
                steps: [
                    'Temel hücre bileşenleri:',
                    '• Hücre zarı',
                    '• Sitoplazma',
                    '• Çekirdek (DNA)',
                    '• Mitokondri',
                    '• Ribozom'
                ]
            };
        }
        
        return { error: 'Biyoloji sorusu anlaşılamadı. Dene: fotosentez, hücre yapısı' };
    }
    
    // Yardımcı fonksiyon
    clean(str) {
        return str.toLowerCase()
            .replace(/\s+/g, '')
            .replace(/\*/g, '')
            .replace(/dx/g, '')
            .trim();
    }
}

// Global instance
window.mathSolver = new UltimateMathSolver();
