import React, { useState } from 'react';
import './App.css';

function App() {
    const [isLogin, setIsLogin] = useState(true);
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [email, setEmail] = useState('');

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        // Aqui você pode adicionar a lógica de login
        console.log(`Login realizado com o usuário: ${usuario}`);
        alert('Login realizado com sucesso!');
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        // Aqui você pode adicionar a lógica de cadastro
        console.log(`Cadastro realizado com o usuário: ${usuario}, email: ${email}`);
        alert('Cadastro realizado com sucesso!');
    };

    return (
        <div className="app">
            <header className="header">
                <h1 className="logo">Avaliação de Livros</h1>
            </header>

            <main className="main">
                {isLogin ? (
                    <div className="login-container">
                        <h2>Login</h2>
                        <form onSubmit={handleLoginSubmit}>
                            <div className="input-group">
                                <label htmlFor="usuario">Usuário:</label>
                                <input
                                    type="text"
                                    id="usuario"
                                    value={usuario}
                                    onChange={(e) => setUsuario(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="senha">Senha:</label>
                                <input
                                    type="password"
                                    id="senha"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="submit-button">Entrar</button>
                        </form>
                        <p>
                            Não tem uma conta?{' '}
                            <span className="toggle-link" onClick={() => setIsLogin(false)}>
                                Cadastre-se aqui
                            </span>
                        </p>
                    </div>
                ) : (
                    <div className="register-container">
                        <h2>Cadastro</h2>
                        <form onSubmit={handleRegisterSubmit}>
                            <div className="input-group">
                                <label htmlFor="usuario">Usuário:</label>
                                <input
                                    type="text"
                                    id="usuario"
                                    value={usuario}
                                    onChange={(e) => setUsuario(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="senha">Senha:</label>
                                <input
                                    type="password"
                                    id="senha"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="submit-button">Cadastrar</button>
                        </form>
                        <p>
                            Já tem uma conta?{' '}
                            <span className="toggle-link" onClick={() => setIsLogin(true)}>
                                Faça login aqui
                            </span>
                        </p>
                    </div>
                )}
            </main>

            <footer className="footer">
                <p>&copy; 2024 Avaliação de Livros. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
}

export default App;
