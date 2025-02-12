import { useEffect, useState } from "react";
import words from "../../data/wordle_list.json";

const WordleGame = () => {
    const [ word , setWord ] = useState<string>("");
    const [ guess , setGuess ] = useState<string[]>([]);
    const [ isCorrect, setIsCorrect ] = useState<boolean>(false);
    const [ error, setError ] = useState<boolean>(false);
    

    const handleSubmit = ( wordGuess : string ) => {
        if ( wordGuess.length !== 5) {
            setError(true);
            return;
        }

        const feedback = ["", "", "", "", ""] // Feedback will be used to help determine the users guess
        const wordArray = word.split(""); // convert target word into an array
        const usedIndices = new Set(); // tracks matched indices to avoid duplicates and for yellow/red cases

        // first loop to determine green letters
        for (let i = 0; i < 5; i++){
            if ( wordGuess[i] == wordArray[i]){
                feedback[i] = "green";
                usedIndices.add(i);
            }
        }
        // second loop to determine yellow letters
        for ( let i = 0; i < 5; i++) {
            if (feedback[i] !== "green") {
                // check if letter is in word array AND the corresponding index is not in usedIndices
                const guessLetter = wordGuess[i];
                for (let j = 0; j < 5; j++){
                    const answerLetter = word[j];
                    if ( (answerLetter === guessLetter) &&  (!usedIndices.has(j))) {
                        feedback[i] = "yellow";
                        usedIndices.add(j);
                        break;
                    } 
                }
            }
        }

        // third loop to fill in rest, which are red letters
        for ( let i = 0; i < 5; i++){
            if (feedback[i] === ""){
                feedback[i] = "grey";
            }
        }

        // checks if guess matched the word
        if (!feedback.includes("grey") && !feedback.includes("yellow")) { // check for correct guess
            setIsCorrect(true);
        }

        // handle logic for updating word UI with green/yellow/grey letter icons
    } 

    useEffect( () => {
        // setting random word from json file
        const randomNum = Math.floor(Math.random() * words.length);
        setWord(words[randomNum]); 

        // handle logic for setting history component
    }, [])
    
    return (
        <div>
        <div>
            <div>Guessing box is here</div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div>
            Keyboard goes here
            <div className="flex mx-4">
                <p>Q</p>
                <p>W</p>
                <p>E</p>
                <p>R</p>
                <p>T</p>
                <p>Y</p>
                <p>U</p>
                <p>I</p>
                <p>O</p>
                <p>P</p>
            </div>
            <div className="flex mx-4">
                <p>A</p>
                <p>S</p>
                <p>D</p>
                <p>F</p>
                <p>G</p>
                <p>H</p>
                <p>J</p>
                <p>K</p>
                <p>L</p>
            </div>
            <div className="flex mx-4">
                <button> Back </button>
                <p>Z</p>
                <p>X</p>
                <p>C</p>
                <p>V</p>
                <p>B</p>
                <p>N</p>
                <p>M</p>
                <button
                value={word}
                > Enter </button>
            </div>
        </div>
        </div>
    )

}

export default WordleGame;