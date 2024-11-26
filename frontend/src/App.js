import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
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

    return (
        <div>
            <header className="header">
                <div className="header-container">
                    <h1 className="logo">Avaliação de Livros</h1>
                    <nav>
                        <ul className="nav">
                            <li><a href="#" className="nav-link"><i className="fas fa-home"></i> Início</a></li>
                            <li><a href="#" className="nav-link"><i className="fas fa-star"></i> Avaliações</a></li>
                            <li><a href="#" className="nav-link"><i className="fas fa-envelope"></i> Contato</a></li>
                        </ul>
                    </nav>
                </div>
            </header>

            <div className="banner-container">
                <img src="path_to_your_banner_image.jpg" alt="Banner da Livraria" className="banner" />
            </div>
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
                                imagemUrl={produto.imagemUrl}  // Passando a URL da imagem
                            />
                        ))
                    )}
                </div>
            </main>
            <footer className="footer">
                <p>&copy; 2024 Avaliação de Livros. Todos os direitos reservados.</p>
                <div className="footer-links">
                    <a href="#">Sobre Nós</a>
                    <a href="#">Política de Privacidade</a>
                    <a href="#">Termos de Uso</a>
                    <a href="#">Contato</a>
                </div>
                <div className="social-icons">
                    <a href="#" title="Facebook"><i className="fab fa-facebook-f"></i></a>
                    <a href="#" title="Twitter"><i className="fab fa-twitter"></i></a>
                    <a href="#" title="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                    <a href="#" title="Instagram"><i className="fab fa-instagram"></i></a>
                </div>
                <p className="footer-note">Desenvolvido com carinho pela equipe de Livraria de Avaliações.</p>
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
