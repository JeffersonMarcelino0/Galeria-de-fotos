const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

loginForm.addEventListener('submit', (event) => {
    // 1. Impede a página de recarregar imediatamente
    event.preventDefault();

    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // 2. Validação
    if (!emailRegex.test(emailValue)) {
        alert('E-mail inválido!');
        return;
    }

    if (passwordValue.length < 6) {
        alert('A senha precisa de pelo menos 6 dígitos!');
        return;
    }

    // 3. "Salvando" os dados para visualização
    // Criamos um objeto com os dados digitados
    const dadosUsuario = {
        email: emailValue,
        senha: passwordValue, // Em um sistema real, nunca salvamos senha pura assim!
        dataLogin: new Date().toLocaleString('pt-BR')
    };

    // Salvamos no navegador como uma String JSON
    localStorage.setItem('usuarioLogado', JSON.stringify(dadosUsuario));

    alert('Dados validados e salvos no navegador!');
    
    // Mostra no console para você conferir
    console.log('Dados salvos com sucesso:', dadosUsuario);

    window.location.href = "registro.html"; // Substitua pelo nome da sua página
});