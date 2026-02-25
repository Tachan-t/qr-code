/**
 * MÓDULO BACKGROUND REMOVER - FORCED LOAD
 */
async function removeBackground(input) {
    const file = input.files?.[0];
    if (!file) return;

    const loader = document.getElementById('bg-loader');
    const resultImg = document.getElementById('bg-result-img');

    loader.classList.remove('hidden');

    try {
        // Tentativa de carregar a biblioteca dinamicamente se ela falhar no HTML
        if (typeof imglyRemoveBackground === 'undefined') {
            console.log("Tentando recarregar biblioteca...");
            await import('https://cdn.jsdelivr.net/npm/@imgly/background-removal@1.4.5/dist/index.js');
        }

        const config = {
            publicPath: "https://cdn.jsdelivr.net/npm/@imgly/background-removal@1.4.5/dist/",
            fetchArgs: { mode: 'cors' } // Força o modo CORS para evitar o bloqueio
        };

        const imageBlob = await imglyRemoveBackground(file, config);
        
        if (processedImageUrl) URL.revokeObjectURL(processedImageUrl);
        processedImageUrl = URL.createObjectURL(imageBlob);
        resultImg.src = processedImageUrl;
        document.getElementById('bg-result-container').classList.remove('hidden');

    } catch (error) {
        console.error("Erro:", error);
        alert("O navegador ainda está bloqueando a IA. Solução: Use o Live Server do VS Code ou suba para o GitHub Pages.");
    } finally {
        loader.classList.add('hidden');
    }
}