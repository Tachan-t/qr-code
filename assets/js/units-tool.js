/**
 * MÓDULO DESIGN UNITS - DevHub Pro
 */

// 1. Lógica PX <-> REM
function convertUnits(source) {
    const pxInput = document.getElementById('px-input');
    const remInput = document.getElementById('rem-input');
    const base = 16; // Base padrão do navegador

    if (source === 'px') {
        const val = parseFloat(pxInput.value);
        remInput.value = !isNaN(val) ? (val / base).toFixed(3) : "";
    } else {
        const val = parseFloat(remInput.value);
        pxInput.value = !isNaN(val) ? (val * base).toFixed(0) : "";
    }
}

// 2. Lógica de Cores (HEX -> RGB & HSL)
function convertColors() {
    let hex = document.getElementById('hex-input').value.trim();
    const preview = document.getElementById('color-preview');
    const rgbOut = document.getElementById('rgb-output');
    const hslOut = document.getElementById('hsl-output');

    // Validação básica de HEX
    if (!/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        if (/^([A-Fa-f0-9]{3}){1,2}$/.test(hex)) hex = '#' + hex;
        else return;
    }

    // HEX to RGB
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
    } else {
        r = parseInt(hex.substring(1, 3), 16);
        g = parseInt(hex.substring(3, 5), 16);
        b = parseInt(hex.substring(5, 7), 16);
    }

    const rgb = `rgb(${r}, ${g}, ${b})`;
    rgbOut.innerText = rgb;
    preview.style.backgroundColor = hex;

    // RGB to HSL
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    hslOut.innerText = `${Math.round(h * 360)}°, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%`;
}