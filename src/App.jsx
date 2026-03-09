import { useState } from 'react'
import './App.css'

function App() {
  const [flashcardNo, setNo] = useState(0)
  const [flipped, setFlipTracker] = useState(false)
  const cards = [
  { prompt: "Match a single 0 or 1",                                          answer: /[01]/          },
  { prompt: "Match any string of 0s and 1s",                                  answer: /[01]*/         },
  { prompt: "Match a string that starts with 1",                               answer: /^1[01]*/       },
  { prompt: "Match a string that ends with 0",                                 answer: /[01]*0$/       },
  { prompt: "Match a string with at least three characters",                   answer: /[01]{3,}/      },
  { prompt: "Match a string that starts and ends with 1",                      answer: /^1[01]*1$/     },
  { prompt: "Match a string containing '00'",                                  answer: /[01]*00[01]*/  },
  { prompt: "Match a string where every 0 is followed by a 1",                answer: /^(1|01)*$/     },
  { prompt: "Match a string that doesn't contain '11'",                       answer: /^(0|10)*1?$/   },
  { prompt: "Match a string with an even number of 1s",                       answer: /^(0*10*1)*0*$/ },
  ]
  const total = cards.length - 1;

  const flipcard = () => setFlipTracker(!flipped) 
  const nextcard = () => {
    if(flashcardNo == total){
      setNo(0);
    }else{
      setNo(flashcardNo+1);
    }
    setFlipTracker(false);
  }

  const backCard = () =>{
    if(flashcardNo == 0){
      setNo(total);
    }else{
      setNo(flashcardNo-1);
    }
    setFlipTracker(false)
  }



  return (
    <div className='App'>
      <div className='header'>
        <h1>RegEx Making</h1>
        <h2>Test your skills to create regex based on descriptions</h2>
        <h3>Number of cards: {total}</h3>
      </div>
      <div className='flashcards' onClick={flipcard}>
        <p>{flipped ? cards[flashcardNo].answer.toString() : cards[flashcardNo].prompt}</p>
      </div>
      <div className='buttonBar'>
        <button id='leftButton' onClick={backCard}>←</button>
        <button id='rightButton' onClick={nextcard}>→</button>
      </div>
    </div>
  )
}

export default App
