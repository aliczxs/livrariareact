import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [isLogin, setIsLogin] = useState(true); // Alternar entre Login e Cadastro
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Indica se o usuário está logado
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [email, setEmail] = useState('');

    // Dados da tela de produtos
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const response = await fetch('http://localhost:8080/produtos');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setProdutos(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProdutos();
    }, []);

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        console.log(`Login realizado com o usuário: ${usuario}`);
        setIsAuthenticated(true);
        alert('Login realizado com sucesso!');
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        console.log(`Cadastro realizado com o usuário: ${usuario}, email: ${email}`);
        alert('Cadastro realizado com sucesso!');
        setIsLogin(true); // Voltar para a tela de login após cadastro
    };

    if (!isAuthenticated) {
        return (
            <div className="app">
                <header className="header">
                    <h1 className="logo"><i className="fas fa-book"></i> Avaliação de Livros</h1>
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
                    <div className="social-icons">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                    </div>
                    <p>&copy; 2024 Avaliação de Livros. Todos os direitos reservados.</p>
                </footer>
            </div>
        );
    }

    return (
        <div>
            <header className="header">
                <div className="header-container">
                    <h1 className="logo"><i className="fas fa-book"></i> Avaliação de Livros</h1>
                    <nav>
                        <ul className="nav">
                            <li><a href="#" className="nav-link"><i className="fas fa-home"></i> Início</a></li>
                            <li><a href="#" className="nav-link"><i className="fas fa-star"></i> Avaliações</a></li>
                            <li><a href="#" className="nav-link"><i className="fas fa-envelope"></i> Contato</a></li>
                        </ul>
                    </nav>
                </div>
            </header>

            <main className="main">
                <h2>Explore e Avalie os Livros</h2>
                <div className="card-container">
                    {loading ? (
                        <p>Carregando...</p>
                    ) : error ? (
                        <p>Erro: {error}</p>
                    ) : (
                        produtos.map(produto => (
                            <Card
                                key={produto.id}
                                id={produto.id}
                                title={produto.titulo}
                                author={produto.autor}
                                description={produto.descricao}
                                rating={produto.classificacao}
                                imagemUrl={produto.imagemUrl}
                            />
                        ))
                    )}
                </div>
            </main>
            <footer className="footer">
                <div className="social-icons">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                </div>
                <p>&copy; 2024 Avaliação de Livros. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
}

function Card({ id, title, author, description, rating, imagemUrl }) {
    const [avaliacao, setAvaliacao] = useState('');
    const [showInput, setShowInput] = useState(false);

    const handleAvaliar = () => {
        setShowInput(true);
    };

    const handleSubmit = () => {
        console.log(`Livro ID ${id}: Avaliação enviada - ${avaliacao}`);
        setShowInput(false);
        setAvaliacao('');
        alert(`Avaliação do livro "${title}" enviada com sucesso!`);
    };

    return (
        <div className="card">
            <img src={imagemUrl} alt={`Imagem do livro ${title}`} className="product-image" />
            <h3>{title}</h3>
            <p className="author">Autor: {author}</p>
            <p>{description}</p>
            <p className="rating">Classificação: {rating}/5</p>
            <button className="rate-button" onClick={handleAvaliar}>Avaliar Livro</button>
            {showInput && (
                <div className="avaliacao-container">
                    <input
                        type="text"
                        placeholder="Digite sua avaliação"
                        value={avaliacao}
                        onChange={(e) => setAvaliacao(e.target.value)}
                        className="avaliacao-input"
                    />
                    <button className="submit-button" onClick={handleSubmit}>Enviar</button>
                </div>
            )}
        </div>
    );
}

export default App;
