let correctCount = 0;
let wrongCount = 0;

// Quando o jogador escolhe uma resposta
function checkAnswer(selectedState) {
    if (selectedState === correctState.state) {
        correctCount++;
    } else {
        wrongCount++;
    }

    // Passa para a próxima bandeira
    loadNextFlag();
}

// Função para carregar a próxima bandeira
function loadNextFlag() {
    const nextFlag = getNextFlag();
    displayFlag(nextFlag); // Exibe a próxima bandeira
}

// Quando o jogo terminar
function endGame() {
    // Armazena os valores no localStorage
    localStorage.setItem('correctCount', correctCount);
    localStorage.setItem('wrongCount', wrongCount);

    // Redireciona para a página de score
    window.location.href = '/score'; 
}
