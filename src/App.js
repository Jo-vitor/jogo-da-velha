import { useEffect, useState } from 'react';
import './App.css';
import Caixa from './components/caixa';

function App() {

  const valores = Array(9).fill("");
  const [tabulheiro, setTabulheiro] = useState(valores);

  const [vez, setVez] = useState("X");
  const [vencedor, setVencedor] = useState(null);

  const clique = (index) => {
    if(tabulheiro[index] != "" || vencedor) return null;
    
    setTabulheiro(tabulheiro.map((obj, objIndex) =>  index == objIndex ? vez: obj ));

    setVez( vez == "X" ? "O":"X");
  }

  const verificarVitorias = () => {
    const vitorias = [
      [tabulheiro[0], tabulheiro[1],  tabulheiro[2]],
      [tabulheiro[3], tabulheiro[4],  tabulheiro[5]],
      [tabulheiro[6], tabulheiro[7],  tabulheiro[8]],

      [tabulheiro[0], tabulheiro[3],  tabulheiro[6]],
      [tabulheiro[1], tabulheiro[4],  tabulheiro[7]],
      [tabulheiro[2], tabulheiro[5],  tabulheiro[8]],

      [tabulheiro[0], tabulheiro[4],  tabulheiro[8]],
      [tabulheiro[2], tabulheiro[4],  tabulheiro[6]]
    ];

    vitorias.forEach((possibilidade) => {
        if(possibilidade.every(n => n == "X")) setVencedor("X");
        if(possibilidade.every(n => n == "O")) setVencedor("O");
      }
    );

    if(tabulheiro.every( obj => obj != "")) setVencedor("E");
  }

  useEffect(verificarVitorias, [tabulheiro]);

  const reiniciar = () => {
    setTabulheiro(valores);
    setVez("X");
    setVencedor(null);
  }
   
  return (
    <div>
      <div className='cabecalho'>
        <h1>Jogo da Velha</h1>
      </div>

      <div className='jogo'>
        {tabulheiro.map(
          (obj, index)=>{
            return (<Caixa valor={obj} click={() => clique(index)}></Caixa>);  
          }
        )}
      </div>
      
      {vencedor &&
        <div className='rodape'> 
          {vencedor == "E" ? 
            <h2>Empatou!</h2>
            :
            <h2>{vencedor} Ganhou!</h2>
          }
          <button className="btn" onClick={reiniciar}>Reiniciar jogo</button>
        </div>
      }
    </div>
  );
};



export default App;
