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
            <div className="container my-4">
                <div className="row justify-content-center">
                {randomisedIndex.map(element => (
                    <div
                    key={element}
                    className="col-6 col-md-4 col-lg-3 mb-3" // responsive columns
                    >
                    <div
                        className="card shadow-sm h-100"
                        style={{ cursor: "pointer" }}
                        onClick={() => punchCard(element)}
                    >
                        <img
                        src={cardList[element].imageUrl}
                        className="card-img-top"
                        alt={cardList[element].searchTerm}
                        style={{ objectFit: "cover", height: "200px" }} // consistent image size
                        />
                        <div className="card-body text-center">
                        <h5 className="card-title">{cardList[element].searchTerm}</h5>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            </div>
        </>
    )


}