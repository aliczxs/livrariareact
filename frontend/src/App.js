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
                <h1>Welcome to Our Website!</h1>
                <nav>
                    <ul className="nav">
                        <li><a href="#" className="link">Home</a></li>
                        <li><a href="#" className="link">About</a></li>
                        <li><a href="#" className="link">Services</a></li>
                        <li><a href="#" className="link">Contact</a></li>
                    </ul>
                </nav>
            </header>
            <main className="main">
                <div className="card-container">
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>Error: {error}</p>
                    ) : (
                        produtos.map(produto => (
                            <Card key={produto.id} title={produto.titulo} description={produto.descricao} />
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}

function Card({ title, description }) {
    return (
        <div className="card">
            <h3>{title}</h3>
            <p>{description}</p>
            <button className="buy-button">Comprar</button>
        </div>
    );
}

export default App;
