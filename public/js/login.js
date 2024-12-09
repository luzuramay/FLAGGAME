document.getElementById('login-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('password').value;
    const responseMessage = document.getElementById('response-message');

    responseMessage.style.display = 'none';

    // Validações
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        responseMessage.style.display = 'block';
        responseMessage.textContent = 'E-mail inválido.';
        return;
    }

    if (password.length < 8) {
        responseMessage.style.display = 'block';
        responseMessage.textContent = 'A senha deve ter pelo menos 8 caracteres.';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
            credentials: 'same-origin'
        });

        const data = await response.json();
        console.log('Resposta da API:', data);

        if (response.ok) {
            if (data.user && data.token) {
                responseMessage.style.color = 'green';
                responseMessage.style.display = 'block';
                responseMessage.textContent = 'Login realizado com sucesso!';

                localStorage.setItem('authToken', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));

                window.location.href = '/inicio';
            } else {
                responseMessage.style.color = 'red';
                responseMessage.style.display = 'block';
                responseMessage.textContent = 'Dados inválidos ou resposta do servidor mal formada.';
            }
        } else {
            responseMessage.style.color = 'red';
            responseMessage.style.display = 'block';
            responseMessage.textContent = `Erro ao realizar login: ${data.message || 'Erro desconhecido'}`;
        }
    } catch (error) {
        console.error('Erro:', error);
        responseMessage.style.color = 'red';
        responseMessage.style.display = 'block';
        responseMessage.textContent = 'Erro de conexão com o servidor.';
    }
});
