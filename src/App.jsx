import { useState } from 'react'
import './App.css'

function App() {
  const [flashcardNo, setNo] = useState(0)
  const [flipped, setFlipTracker] = useState(false)
  const [guess, setGuess] = useState('')
  const [feedback, setFeedback] = useState(null) 

  const cards = [
    { prompt: "Match a single 0 or 1",                                          answer: /[01]/,           difficulty: "easy"   },
    { prompt: "Match a string with an even number of 1s",                       answer: /^(0*10*1)*0*$/,  difficulty: "hard"   },
    { prompt: "Match any string of 0s and 1s",                                  answer: /[01]*/,          difficulty: "easy"   },
    { prompt: "Match a string that doesn't contain '11'",                       answer: /^(0|10)*1?$/,    difficulty: "hard"   },
    { prompt: "Match a string that starts with 1",                              answer: /^1[01]*/,         difficulty: "easy"   },
    { prompt: "Match a string where every 0 is followed by a 1",               answer: /^(1|01)*$/,       difficulty: "hard"   },
    { prompt: "Match a string of exactly 4 characters",                         answer: /^[01]{4}$/,      difficulty: "easy"   },
    { prompt: "Match a string that starts and ends with the same character",    answer: /^(0[01]*0|1[01]*1|[01])$/, difficulty: "hard" },
    { prompt: "Match a string that ends with 0",                                answer: /[01]*0$/,        difficulty: "easy"   },
    { prompt: "Match a string where 1s only appear in pairs",                   answer: /^(0|11)*$/,      difficulty: "medium" },
    { prompt: "Match a string with at least three characters",                  answer: /^[01]{3,}$/,     difficulty: "easy"   },
    { prompt: "Match a string that contains '010'",                             answer: /[01]*010[01]*/,  difficulty: "medium" },
    { prompt: "Match a string that starts and ends with 1",                     answer: /^1[01]*1$/,      difficulty: "medium" },
    { prompt: "Match a string with an odd number of characters",                answer: /^([01]{2})*[01]$/, difficulty: "medium" },
    { prompt: "Match a string containing '00'",                                 answer: /[01]*00[01]*/,   difficulty: "medium" },
    { prompt: "Match a string with no two consecutive 0s",                      answer: /^(1|01)*0?$/,    difficulty: "medium" },
    { prompt: "Match a string that alternates between 0 and 1",                 answer: /^(01)*0?$|^(10)*1?$/, difficulty: "medium" },
    { prompt: "Match a string divisible in length by 3",                        answer: /^([01]{3})*$/,   difficulty: "hard"   },
    { prompt: "Match a string where every 1 is immediately preceded by a 0",   answer: /^0*(01)*0*$/,    difficulty: "hard"   },
    { prompt: "Match a string with at least one 0 and at least one 1",         answer: /^(?=[01]*0)(?=[01]*1)[01]+$/, difficulty: "medium" },
  ]

  const total = cards.length - 1;

const normalizeRegex = (str) => {
    // Strip leading/trailing slashes and any trailing flags
    return str.trim().replace(/^\/|\/[gimsuy]*$/g, '')
  }
 
  const handleSubmit = () => {
    const correctAnswer = cards[flashcardNo].answer.toString()
    const normalizedCorrect = normalizeRegex(correctAnswer)
    const normalizedGuess = normalizeRegex(guess)
 
    if (normalizedGuess === normalizedCorrect) {
      setFeedback('correct')
      setFlipTracker(true)
    } else {
      setFeedback('incorrect')
    }
  }
 
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit()
  }
 
  const nextcard = () => {
    if (flashcardNo < total) {
      setNo(flashcardNo + 1)
      setFlipTracker(false)
      setGuess('')
      setFeedback(null)
    }
  }
 
  const backCard = () => {
    if (flashcardNo > 0) {
      setNo(flashcardNo - 1)
      setFlipTracker(false)
      setGuess('')
      setFeedback(null)
    }
  }
 
  const handleCardClick = () => {
    setFlipTracker(!flipped)
    setFeedback(null)
  }
 
  const isFirst = flashcardNo === 0
  const isLast = flashcardNo === total



  return (
     <div className='App'>
      <div className='header'>
        <h1>RegEx Making</h1>
        <h2>Test your skills to create regex based on descriptions</h2>
        <h3>Card {flashcardNo + 1} of {total + 1}</h3>
      </div>
 
      <div
        className={`flashcards ${feedback ? `flashcards--${feedback}` : ''}`}
        onClick={handleCardClick}
        id={cards[flashcardNo].difficulty.toString()}
      >
        <p>{flipped ? cards[flashcardNo].answer.toString() : cards[flashcardNo].prompt}</p>
      </div>
 
      <div className='guessArea'>
        <input
          type='text'
          className={`guessInput${feedback ? ` guessInput--${feedback}` : ''}`}
          placeholder='Enter your regex guess (e.g. /[01]/)'
          value={guess}
          onChange={(e) => { setGuess(e.target.value); setFeedback(null) }}
          onKeyDown={handleKeyDown}
          aria-label='Regex guess input'
        />
        <button
          className='submitBtn'
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
 
      <div className='buttonBar'>
        <button
          className='navBtn'
          onClick={backCard}
          disabled={isFirst}
          aria-label='Previous card'
          title={isFirst ? 'Already at the first card' : 'Previous card'}
        >
          ←
        </button>
        <button
          className='navBtn'
          onClick={nextcard}
          disabled={isLast}
          aria-label='Next card'
          title={isLast ? 'Already at the last card' : 'Next card'}
        >
          →
        </button>
      </div>
    </div>
  )
}

export default App
