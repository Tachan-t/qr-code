/**
 * MÓDULO PALETTE EXTRACTOR - DevHub Pro
 */
function extractColors(input) {
    const file = input.files[0];
    if (!file) return;

    const preview = document.getElementById('palette-preview');
    const placeholder = document.getElementById('palette-placeholder');
    const container = document.getElementById('palette-container');
    const canvas = document.getElementById('palette-canvas') || document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            if (preview) {
                preview.src = e.target.result;
                preview.classList.remove('hidden');
            }
            if (placeholder) placeholder.classList.add('hidden');

            // Processamento em Canvas reduzido para performance
            canvas.width = 50; 
            canvas.height = 50;
            ctx.drawImage(img, 0, 0, 50, 50);

            const imageData = ctx.getImageData(0, 0, 50, 50).data;
            const colorCounts = {};

            for (let i = 0; i < imageData.length; i += 4) {
                if (imageData[i+3] < 125) continue; // Ignora transparência
                // Agrupa cores (quantização)
                const r = Math.round(imageData[i]/15)*15;
                const g = Math.round(imageData[i+1]/15)*15;
                const b = Math.round(imageData[i+2]/15)*15;
                const rgb = `${r},${g},${b}`;
                colorCounts[rgb] = (colorCounts[rgb] || 0) + 1;
            }

            const sortedColors = Object.entries(colorCounts)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5);

            renderPalette(sortedColors);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function renderPalette(colors) {
    const container = document.getElementById('palette-container');
    if (!container) return;
    container.innerHTML = "";

    colors.forEach(([rgbStr]) => {
        const [r, g, b] = rgbStr.split(',');
        const hex = "#" + ((1 << 24) + (parseInt(r) << 16) + (parseInt(g) << 8) + parseInt(b)).toString(16).slice(1).toUpperCase();
        
        const row = document.createElement('div');
        row.className = "flex items-center gap-4 bg-white/5 p-3 rounded-xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer";
        row.onclick = () => {
            navigator.clipboard.writeText(hex);
            alert(`Copiado: ${hex}`);
        };

        row.innerHTML = `
            <div class="w-10 h-10 rounded-lg shadow-inner" style="background-color: ${hex}"></div>
            <div class="flex-1">
                <p class="text-xs font-mono font-bold text-white">${hex}</p>
                <p class="text-[9px] opacity-40">RGB(${r}, ${g}, ${b})</p>
            </div>
            <span class="text-[9px] font-bold opacity-20 uppercase">Copy</span>
        `;
        container.appendChild(row);
    });
}