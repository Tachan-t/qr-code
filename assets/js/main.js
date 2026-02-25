function showTool(toolId) {
    // Esconder todas as seções
    document.querySelectorAll('.tool-section').forEach(s => s.classList.add('hidden'));
    // Remover classe ativa de todos os botões
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    
    // Mostrar a seção clicada
    const target = document.getElementById(toolId);
    if(target) target.classList.remove('hidden');

    // Ativar o botão correspondente
    const btnKey = 'btn-' + toolId.split('-')[0];
    const activeBtn = document.getElementById(btnKey);
    if(activeBtn) activeBtn.classList.add('active');
    
    window.scrollTo(0, 0);
}