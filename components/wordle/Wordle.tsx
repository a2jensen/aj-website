import { useEffect, useState } from "react";
import words from "../../data/wordle_list.json";

const Wordle = () => {
    const [ word , setWord ] = useState<string>("");
    const [ guess , setGuess ] = useState<string[]>([]);
    const [ isCorrect, setIsCorrect ] = useState<boolean>(false);
    
    /**  */
    const handleGuess = ( wordGuess : string ) => {
        for ( let i = 0; i < 5; i++) {
            if ( wordGuess[i] == word[i]) {
                // logic for setting it to green
            } 
            else {
                if ( wordGuess[i] ) {
                  // case 1, check if letter is still there in the wordle, setting it to yellow
                } else {
                    // case 2, letter is not in word so set to red
                    return 0;
                }
                
            }
        }
    }

    useEffect( () => {
        // setting random word from json file
        const randomNum = Math.floor(Math.random() * words.length) + 1;
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
        </div>
        </div>
    )

}

export default Wordle;