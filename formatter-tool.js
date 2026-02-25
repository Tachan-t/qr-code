function updateMetrics() {
    const code = document.getElementById('code-input').value;
    const lineSpan = document.getElementById('line-count');
    const charSpan = document.getElementById('char-count');
    
    if(lineSpan) lineSpan.innerText = code.split('\n').length;
    if(charSpan) charSpan.innerText = code.length;
}

function analyzeAndFormat(type) {
    const input = document.getElementById('code-input');
    const report = document.getElementById('analysis-results');
    let code = input.value.trim();

    if (!code) return;

    try {
        const start = performance.now();
        if (type === 'json') {
            input.value = JSON.stringify(JSON.parse(code), null, 4);
        } else if (type === 'html') {
            let formatted = '';
            let indent = 0;
            const nodes = code.replace(/>\s*</g, '><').split(/(?=<)|(?<=>)/);
            nodes.forEach(node => {
                if (node.match(/^\/\w/)) indent--;
                formatted += '    '.repeat(Math.max(0, indent)) + node + '\n';
                if (node.match(/^<?\w[^>]*[^\/]>$/) && !node.startsWith('</')) indent++;
            });
            input.value = formatted.trim();
        }
        const end = performance.now();
        report.innerHTML = `<div class="p-3 bg-white/5 rounded-xl border border-white/10">
            <p class="text-white font-bold">✅ SINTAXE VÁLIDA</p>
            <p class="opacity-50 text-[10px] mt-1">Tempo: ${(end - start).toFixed(2)}ms</p>
        </div>`;
        updateMetrics();
    } catch (e) {
        report.innerHTML = `<div class="p-3 bg-red-500/10 rounded-xl border border-red-500/20 text-red-400">
            <p class="font-bold uppercase text-[10px]">Erro de Sintaxe</p>
            <p class="text-[9px] mt-1">${e.message}</p>
        </div>`;
    }
}