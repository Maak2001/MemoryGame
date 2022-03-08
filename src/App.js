import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  { "src": "/img/blue-1.png", matched:false },
  { "src": "/img/green-1.png", matched:false },
  { "src": "/img/orange-1.png", matched:false },
  { "src": "/img/pink-1.png", matched:false },
  { "src": "/img/red-1.png", matched:false },
  { "src": "/img/yellow-1.png", matched:false }
]

function App() {
  const [cards,setCards] = useState([])
  const [turns,setTurns] = useState(0)
  const [choiceOne,setChoiceOne] = useState(null)
  const [choiceTwo,setChoiceTwo] = useState(null)
  const [disabled,setDisabled] = useState(false)
  const [count,setCount] = useState(0)
  const [modal, setModal] = useState(false);


  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id:Math.random()}))

      setChoiceOne(null)
      setChoiceTwo(null)
      setCards(shuffledCards)
      setTurns(0)
      setCount(0)
  }

  //handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  //compare two selected cards
  useEffect(() => {
    if(choiceOne && choiceTwo){
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src){
        setCount(prevCount => prevCount+1)
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src){
              return {...card, matched:true}
            }else{
              return card
            }
          })
        })
        resetTurns()
      }else{
        setTimeout(() => resetTurns(), 1000)
      }
    }
  },[choiceOne,choiceTwo])

  console.log(cards)

  //reset choices and increase turns
  const resetTurns = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns+1)
    setDisabled(false)
  }

  //start a new game automatically
  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className="App">
     <h1>Magic Match</h1>
     <button onClick={shuffleCards}>New Game</button>
     <div className="card-grid">
      {cards.map(card => (
        <SingleCard 
          key={card.id} 
          card={card}
          handleChoice={handleChoice} 
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          disabled={disabled}
        />
      ))}  
     </div>
     <p>Turns: {turns}</p>
    </div>
    
  );
}

export default App;