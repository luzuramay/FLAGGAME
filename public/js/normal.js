// scripts.js
document.addEventListener('DOMContentLoaded', function() {
    const errorCount = document.getElementById('error-count').innerText;
    if (parseInt(errorCount) <= 0) {
        alert("Você errou muitas vezes! A próxima bandeira está sendo carregada...");
    }
});
