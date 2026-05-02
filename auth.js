// Sistema de Autenticação Completo
class AuthSystem {
    constructor() {
        this.usersKey = 'galeria_users';
        this.currentUserKey = 'galeria_current_user';
        this.init();
    }

    // Inicializa o sistema
    init() {
        this.loadUsers();
        this.checkLoginStatus();
    }

    // Carrega usuários do LocalStorage
    loadUsers() {
        const users = localStorage.getItem(this.usersKey);
        this.users = users ? JSON.parse(users) : [];
    }

    // Salva usuários no LocalStorage
    saveUsers() {
        localStorage.setItem(this.usersKey, JSON.stringify(this.users));
    }

    // REGISTRO - Validação principal aqui!
    register(name, email, password) {
        // 1. Validação de email duplicado (MELHOR LUGAR)
        if (this.users.find(user => user.email === email)) {
            return { success: false, message: 'Email já cadastrado!' };
        }

        // 2. Validações básicas
        if (!name || name.length < 2) {
            return { success: false, message: 'Nome deve ter pelo menos 2 caracteres' };
        }
        if (!email || !this.isValidEmail(email)) {
            return { success: false, message: 'Email inválido' };
        }
        if (password.length < 6) {
            return { success: false, message: 'Senha deve ter pelo menos 6 caracteres' };
        }

        // 3. Cria usuário
        const newUser = {
            id: Date.now(),
            name,
            email,
            password: btoa(password) // Codifica senha (não é criptografia real)
        };

        this.users.push(newUser);
        this.saveUsers();
        
        return { success: true, message: 'Conta criada com sucesso!' };
    }

    // LOGIN
    login(email, password) {
        const user = this.users.find(u => 
            u.email === email && 
            u.password === btoa(password)
        );

        if (!user) {
            return { success: false, message: 'Email ou senha incorretos!' };
        }

        // Salva usuário logado
        localStorage.setItem(this.currentUserKey, JSON.stringify(user));
        return { success: true, user, message: 'Login realizado com sucesso!' };
    }

    // Verifica se está logado
    isLoggedIn() {
        const user = localStorage.getItem(this.currentUserKey);
        return !!user;
    }

    // Pega usuário atual
    getCurrentUser() {
        const user = localStorage.getItem(this.currentUserKey);
        return user ? JSON.parse(user) : null;
    }

    // Logout
    logout() {
        localStorage.removeItem(this.currentUserKey);
    }

    // Valida email
    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Verifica status de login na página
    checkLoginStatus() {
        if (this.isLoggedIn()) {
            const user = this.getCurrentUser();
            console.log(`Usuário logado: ${user.name}`);
            // Redireciona para página principal se já estiver logado
            if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
                // window.location.href = 'dashboard.html'; // Página após login
            }
        }
    }
}

// Inicializa sistema global
const auth = new AuthSystem();  