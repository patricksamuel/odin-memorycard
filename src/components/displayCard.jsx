// displayCard.jsx
import { useEffect } from "react";

function getRandomSequence(a,z){
    const arr = Array.from({length:z-a+1},(_,i)=>a+i)

    for (let i=arr.length-1;i>0;i--){
        const j = Math.floor(Math.random()*(i+1));
        [arr[i],arr[j]] = [arr[j],arr[i]]
    }
    return arr
}



export default function DisplayCard({cardList,punchCard}){

    const randomisedIndex = getRandomSequence(0, cardList.length -1)
    

    

    return(
        <>
            <div>
                {randomisedIndex.map(element=> (
                    <div key={element}>
                        <div
                            onClick={()=>punchCard(element)}
                        >
                            <img
                                src = {cardList[element].imageUrl}
                            />
                        </div>

                    </div>
                    )
                )}
            </div>
        </>
    )


}