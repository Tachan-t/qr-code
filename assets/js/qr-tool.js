function hexToRgb(hex) {
    const r = parseInt(hex.substr(1, 2), 16);
    const g = parseInt(hex.substr(3, 2), 16);
    const b = parseInt(hex.substr(5, 2), 16);
    return { r, g, b };
}

function validateContrast(dark, light) {
    const rgb1 = hexToRgb(dark);
    const rgb2 = hexToRgb(light);
    const lum1 = (0.299 * rgb1.r + 0.587 * rgb1.g + 0.114 * rgb1.b);
    const lum2 = (0.299 * rgb2.r + 0.587 * rgb2.g + 0.114 * rgb2.b);
    const diff = Math.abs(lum1 - lum2);
    
    const badge = document.getElementById('contrast-status');
    if (!badge) return;

    badge.classList.remove('badge-success', 'badge-warning');

    if (diff > 125) {
        badge.innerText = "CONTRASTE SEGURO";
        badge.classList.add('badge-success');
    } else {
        badge.innerText = "CONTRASTE BAIXO";
        badge.classList.add('badge-warning');
    }
}

function generateQR() {
    const text = document.getElementById('qr-input').value || " ";
    const dark = document.getElementById('color-dark').value;
    const light = document.getElementById('color-light').value;
    
    const qrContainer = document.getElementById('qrcode');
    const mockupContainer = document.getElementById('mockup-qr');

    if(!qrContainer || !mockupContainer) return;

    qrContainer.innerHTML = "";
    mockupContainer.innerHTML = "";

    new QRCode(qrContainer, {
        text: text, width: 220, height: 220,
        colorDark: dark, colorLight: light,
        correctLevel: QRCode.CorrectLevel.H
    });

    new QRCode(mockupContainer, {
        text: text, width: 70, height: 70,
        colorDark: dark, colorLight: light
    });

    validateContrast(dark, light);
}

function downloadQR() {
    const img = document.querySelector('#qrcode img');
    if (img) {
        const link = document.createElement('a');
        link.download = 'devhub-qr.png';
        link.href = img.src;
        link.click();
    }
}

// Inicializar ao carregar a página
window.addEventListener('DOMContentLoaded', generateQR);