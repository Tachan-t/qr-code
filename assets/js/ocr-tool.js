/**
 * MÓDULO OCR ENGINE - DevHub Pro
 */
async function processOCR(input) {
    const file = input.files[0];
    if (!file) return;

    // Referências da UI
    const statusText = document.getElementById('ocr-status-text') || { innerText: "" };
    const progressBar = document.getElementById('ocr-bar');
    const progressContainer = document.getElementById('ocr-progress-container');
    const resultArea = document.getElementById('ocr-result');
    const preview = document.getElementById('image-preview');
    const placeholder = document.getElementById('upload-placeholder');

    // 1. Mostrar Preview
    const reader = new FileReader();
    reader.onload = (e) => {
        if (preview) {
            preview.src = e.target.result;
            preview.classList.remove('hidden');
        }
        if (placeholder) placeholder.classList.add('hidden');
    };
    reader.readAsDataURL(file);

    // 2. Resetar Progresso
    if (progressContainer) progressContainer.classList.remove('hidden');
    if (resultArea) resultArea.value = "";
    if (progressBar) progressBar.style.width = "0%";

    try {
        const worker = Tesseract.createWorker({
            logger: m => {
                if (m.status === 'recognizing text' && progressBar) {
                    const progress = Math.round(m.progress * 100);
                    progressBar.style.width = `${progress}%`;
                }
            }
        });

        await worker.load();
        await worker.loadLanguage('por+eng');
        await worker.initialize('por+eng');
        
        const { data: { text } } = await worker.recognize(file);
        
        if (resultArea) {
            resultArea.value = text.trim() === "" ? "Nenhum texto detectado." : text;
        }

        await worker.terminate();
    } catch (error) {
        console.error("Erro OCR:", error);
        if (resultArea) resultArea.value = "Erro ao processar imagem.";
    }
}

// Função auxiliar para limpar
function clearOCR() {
    location.reload(); // Forma mais rápida de resetar o estado da IA
}