document.getElementById('signup-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const nickname = document.getElementById('nickname').value.trim();
    const email = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const responseMessage = document.getElementById('response-message');

    // Validações no cliente
    if (nickname.length < 3 || nickname.length > 30) {
        responseMessage.style.display = 'block';
        responseMessage.textContent = 'O apelido deve ter entre 3 e 30 caracteres.';
        return;
    }

    if (/\s/.test(nickname)) {
        responseMessage.style.display = 'block';
        responseMessage.textContent = 'O apelido não pode conter espaços.';
        return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
        responseMessage.style.display = 'block';
        responseMessage.textContent = 'E-mail inválido.';
        return;
    }

    if (password !== confirmPassword) {
        responseMessage.style.display = 'block';
        responseMessage.textContent = 'As senhas não coincidem.';
        return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/;
    if (!passwordRegex.test(password)) {
        responseMessage.style.display = 'block';
        responseMessage.textContent = 'A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula e um caractere especial como @.';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nickname, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            responseMessage.style.color = 'green';
            responseMessage.style.display = 'block';
            responseMessage.textContent = 'Cadastro realizado com sucesso!';
            setTimeout(() => {
                window.location.href = '/login';
            }, 2000);
        } else {
            const errorMessages = data.errors?.map(err => err.message).join(', ') || data.message || 'Erro ao realizar cadastro.';
            responseMessage.style.color = 'red';
            responseMessage.style.display = 'block';
            responseMessage.textContent = errorMessages;
        }
    } catch (error) {
        responseMessage.style.color = 'red';
        responseMessage.style.display = 'block';
        responseMessage.textContent = 'Erro de conexão com o servidor.';
    }
});
