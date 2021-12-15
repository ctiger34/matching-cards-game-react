import { useEffect, useState } from 'react';
import './App.css';
import { SingleCard } from './Components/SingleCard';



const clubImages = [
  {"src": "img/scroll-1.png", matched:false},
  {"src": "img/helmet-1.png",matched:false},
  {"src": "img/shield-1.png",matched:false},
  {"src": "img/sword-1.png",matched:false},
  {"src": "img/ring-1.png",matched:false},
  {"src": "img/potion-1.png",matched:false}
]
function App() {

  useEffect(()=>{
    shuffleCards()
  },[])

  const [clubs, setClubs] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)


  const shuffleCards = () => {
    const shuffledCards = [...clubImages, ...clubImages]
      .sort(()=> Math.random() - 0.5)
      .map((card) => ({...card, id:Math.random() }))
  
    setChoiceOne(null)
    setChoiceTwo(null)
    setClubs(shuffledCards)
    setTurns(0)
  }

  const HandleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)

  }

  useEffect(() => {
    if(choiceOne && choiceTwo){
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src){
        setClubs(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceTwo.src){
              return{...card, matched:true}
            }else{
              return card
            }
          })
        })
        resetTurn()
      }else{
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne,choiceTwo])

  

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }


  return (
    <div className="App">
      <h1>Match The Pictures</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {clubs.map((club) => (

          <SingleCard 
            HandleChoice={HandleChoice}
            club={club} 
            key={club.id}
            flipped={club === choiceOne || club === choiceTwo || club.matched}
            disabled={disabled}
          />

        ))}
      </div>
      <br/>
      Turns: {turns}
    </div>
  );
}

export default App;
