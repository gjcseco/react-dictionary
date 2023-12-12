import React, { useState, useEffect } from 'react';
import './App.css';

const Tradutor = () => {
  const [traducoes, setTraducoes] = useState([]);
  const [cont, setCont] = useState(1);
  const [wordPT, setWordPT] = useState('');
  const [wordEN, setWordEN] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    const savedTraducoes = localStorage.getItem('traducoes');
    if (savedTraducoes) {
      setTraducoes(JSON.parse(savedTraducoes));
    }
  }, []);

  const salvaTraducoesNoLocalStorage = (novasTraducoes) => {
    setTraducoes(novasTraducoes);
    localStorage.setItem('traducoes', JSON.stringify(novasTraducoes));
  };

  const mostraTraducoes = () => {
    return traducoes.map((item) => (
      <div key={item.id} className="traducao-item">
        <p>ID: {item.id}</p>
        <p>PT: {item.wordPT}</p>
        <p>EN: {item.wordEN}</p>
        <button onClick={() => handleExcluirTraducao(item.id)}>Excluir</button>
      </div>
    ));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const palavraPT = wordPT.trim();
    const palavraEN = wordEN.trim();

    if (palavraPT && palavraEN) {
      const novaTraducao = {
        id: cont,
        wordPT: palavraPT,
        wordEN: palavraEN,
      };

      const novasTraducoes = [...traducoes, novaTraducao];
      salvaTraducoesNoLocalStorage(novasTraducoes);

      setCont(cont + 1);
      setWordPT('');
      setWordEN('');
    }
  };

  const handleExcluirTraducao = (id) => {
    const traducoesAtualizadas = traducoes.filter((item) => item.id !== id);
    salvaTraducoesNoLocalStorage(traducoesAtualizadas);
  };

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="tradutor-container">
      <h1>Tradutor</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Palavra em Português:
          <input
            type="text"
            value={wordPT}
            onChange={(e) => setWordPT(e.target.value)}
          />
        </label>
        <br />
        <label>
          Palavra em Inglês:
          <input
            type="text"
            value={wordEN}
            onChange={(e) => setWordEN(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Adicionar Tradução</button>
      </form>

      {traducoes.length > 0 && (
        <div>
          <h2 className='showTradution'>
            <button onClick={toggleExpansion} className='showTradution'>
              {isExpanded ? '<' : '>'}
            </button>
          </h2>
          {isExpanded && (
            <div>
              <h3>Traduções:</h3>
              {mostraTraducoes()}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Tradutor;