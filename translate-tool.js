/**
 * MÓDULO VOICE & TRANSLATE - Versão Ultra Estável (Google Engine)
 */

async function translateText() {
    const textInput = document.getElementById('text-input');
    const textOutput = document.getElementById('text-output');
    const langFrom = document.getElementById('lang-from').value.split('-')[0];
    const langTo = document.getElementById('lang-to').value.split('-')[0];
    const loader = document.getElementById('loader');

    const text = textInput.value.trim();
    if (!text) return;

    textOutput.value = "";
    if (loader) loader.classList.remove('hidden');

    try {
        // Usando a API livre do Google Translate (mais segura e precisa)
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${langFrom}&tl=${langTo}&dt=t&q=${encodeURIComponent(text)}`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error("Erro na rede.");

        const data = await response.json();

        // O Google retorna um array complexo, precisamos de extrair a primeira parte
        if (data && data[0] && data[0][0] && data[0][0][0]) {
            textOutput.value = data[0][0][0];
        } else {
            textOutput.value = "Não foi possível traduzir.";
        }

    } catch (error) {
        console.error("Erro:", error);
        textOutput.value = "Erro na conexão com o servidor de tradução.";
    } finally {
        if (loader) loader.classList.add('hidden');
    }
}

// Função de Áudio (Mantida)
function speakText(areaId, langId) {
    const text = document.getElementById(areaId).value;
    const lang = document.getElementById(langId).value; // Pega o código completo (ex: ja-JP)

    if (!text) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    // O navegador tentará encontrar a melhor voz instalada para este idioma
    utterance.lang = lang; 
    utterance.rate = 0.9;
    
    window.speechSynthesis.speak(utterance);
}

/**
 * Inverte os idiomas e os textos das áreas de entrada/saída
 */
function swapLanguages() {
    const langFrom = document.getElementById('lang-from');
    const langTo = document.getElementById('lang-to');
    const textInput = document.getElementById('text-input');
    const textOutput = document.getElementById('text-output');

    // 1. Inverter os valores dos Selects
    const tempLang = langFrom.value;
    langFrom.value = langTo.value;
    langTo.value = tempLang;

    // 2. Inverter os conteúdos dos Textareas
    const tempText = textInput.value;
    textInput.value = textOutput.value;
    textOutput.value = tempText;
    
    // Pequeno feedback visual no console
    console.log("Idiomas invertidos!");
}