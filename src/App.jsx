import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DisplayCard from './components/displayCard'
import DisplayScore from './components/displayScore'

function App() {
    const [score, setScore] = useState(0)
    function addScore(){
      setScore(prev => prev+1)
    }
    function resetScore(){
      setScore(prev => 0)
    }

  const initialCard = [
    {alreadyClicked : false},
    {alreadyClicked : false},
    {alreadyClicked : false}
  ]
  const [cardList, setCardList] = useState(initialCard)

  function resetCard(){
    setCardList(prev => initialCard)
  }

  function punchCard(n){
    // function will change the card to the alreadyClicked
    const cardToTest = cardList[n]
    
    if (cardToTest.alreadyClicked === false){

      setCardList(prev => 
        prev.map((item,index) => 
          index === n ? {...item, alreadyClicked : true} : item 
        )
      )
      addScore()
    }
    else {
      resetScore()
      resetCard()
    }
  }





  return (
    <>
      <h1>Memory Game</h1>
      <DisplayCard
        cardList = {cardList}
        punchCard = {punchCard}
      />
      <DisplayScore
        score={score}
      />

    </>
  )
}

export default App
