
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from 'react'
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
      { alreadyClicked: false, searchTerm: "dog" },
      { alreadyClicked: false, searchTerm: "cat" },
      { alreadyClicked: false, searchTerm: "camel" },
      { alreadyClicked: false, searchTerm: "robot" },
      { alreadyClicked: false, searchTerm: "car" },
      { alreadyClicked: false, searchTerm: "pizza" },
      { alreadyClicked: false, searchTerm: "tree" },
      { alreadyClicked: false, searchTerm: "beach" },
    ]

    const [cardList, setCardList] = useState(initialCard)

    useEffect(
      ()=>{
      async function fetchCards(){
          try {
            const updatedCards = await Promise.all(
              cardList.map(async card =>{
                const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=lFYBk5P3EiVHuqWQdGsFKb504e7WUU11&s=${encodeURIComponent(card.searchTerm)}&weirdness=4`)
                const data= await response.json()
                return {...card,imageUrl: data.data.images.fixed_width.url }
              })
            )
            setCardList(updatedCards)
          }
          catch(err){
            console.log("error fetching image")
          }

      }
      fetchCards()
    },[])




  function resetCard(){
    setCardList(prev => prev.map(element => ({...element, alreadyClicked : false})))
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
      <DisplayScore
        score={score}
      />
      <DisplayCard
        cardList = {cardList}
        punchCard = {punchCard}
      />


    </>
  )
}

export default App
