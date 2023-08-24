import React, { useState, useRef, useEffect, Ref } from 'react';
import '../css/App.css';

type inputProps = {
  curMode: string;
  wordsVariance: string;
  timeVariance: string;
  progress: string;
  setProgress: (arg: string) => void;
}

const Input = ({
  curMode,
  wordsVariance,
  progress,
  setProgress,
  timeVariance,
} : inputProps ) => {
  const blurRef = useRef<HTMLDivElement>(null!);
  const textRef = useRef<HTMLDivElement>(null!); 
  const inputRef = useRef<HTMLInputElement>(null!);

  const [wordsProgress, setWordsProgress] = useState(0);
  const [timeProgress, setTimeProgress] = useState(Number(timeVariance));

  const [result, setResult] = useState(0);

  const [string, setString] = useState("");
  const [splitted, setSplitted] = useState(['']);
  const [indToFill, setIndToFill] = useState(1);
  const [passedInputLength, setPassedInputLength] = useState(0);

  let timer: any;

  function makeTimePrettier(time: string) {
    let prettierTime = "";

    let minutes = Math.floor(parseInt(time) / 60);
    let seconds = Math.floor(parseInt(time) % 60);

    if (minutes > 9) {
      prettierTime += `${minutes}:`;
    } else {
      prettierTime += `0${minutes}:`;
    }

    if (seconds > 9) {
      prettierTime += `${seconds}`;
    } else {
      prettierTime += `0${seconds}`;
    }

    return prettierTime;
  }

  const changeProgress = useEffect(() => {
    if (curMode === "Words") {
      setProgress(wordsProgress + " / " + wordsVariance);
    }
    else if (curMode === "Time") {
      if (timeProgress < 1) {
        setProgress(makeTimePrettier('0'));
      } else {
        setProgress(makeTimePrettier(timeProgress.toString()));
      }
    }
  }, [curMode, timeProgress, wordsProgress]);

  const changeVariance = useEffect(() => {
    composeString();

    if (curMode === "Time") {
      setTimeProgress(Number(timeVariance));
    } 
    else if (curMode === "Words") {
      setWordsProgress(0);
    }

    clearInterval(timer);
  }, [timeVariance, wordsVariance, curMode])

  const caret = "<font style='color: #FFB02E; margin: 0 -4px; animation: caret 1s infinite'>|</font>";
    
  function handleInput() {
    let index = indToFill;
    let color = "white"; // Succesful case by default 
    let symbol = string[indToFill-1];
    let currentInputLength = inputRef.current.value.length;
    
    function fillSymbolAndMoveCaret(firstSwapEl: number, 
                                    secondSwapEl: number, 
                                    incrementValue: number, 
                                    strMovementDist: number) {
      splitted[index] = `<font style="color:${color}">${symbol}</font>`;

      [splitted[firstSwapEl], splitted[secondSwapEl]] = [splitted[secondSwapEl], splitted[firstSwapEl]];

      setIndToFill(incrementValue);

      if (indToFill > 10) {
        textRef.current.scrollBy(strMovementDist, 0);
      }
    }

    if (indToFill === 1) {
      /*----------------
        start of typing
      -----------------*/
      if (curMode === "Words") {
        const start = Date.now();

        setTimeProgress(start);
      } 
      else if (curMode === "Time") {
        timer = setInterval(() => {
          
          setTimeProgress(time => {
            return time - 1
          })
        }, 1000)
      }
    } 

    else if (wordsProgress.toString() == wordsVariance && curMode === "Words") {
      /*-----------------
         end of typing   
      ------------------*/
      inputRef.current.blur();
    }

    if (currentInputLength > passedInputLength) {
      if (curMode === "Words" && string[indToFill-1] === ' ') {
        setWordsProgress(prev => prev + 1);
      }

      if (inputRef.current.value.at(-1) !== string[indToFill-1]) {
        color = "red";
        
        if (string[indToFill-1] == ' ') {
          symbol = inputRef.current.value.at(-1)!;
        }
      }

      fillSymbolAndMoveCaret(indToFill, indToFill-1, indToFill+1, 10);

    } 
    else if (indToFill > 1) {
      if (curMode === "Words" && string[indToFill-2] === ' ') {
        setWordsProgress(prev => prev - 1);
      }

      color = "color:rgba(255, 255, 255, 0.401)";
      symbol = string[indToFill-2];
      index = indToFill-2;

      fillSymbolAndMoveCaret(indToFill-2, indToFill-1, indToFill-1, -10);
    }
        
    setPassedInputLength(inputRef.current.value.length);
    textRef.current.innerHTML = splitted.join('');
  }

  function composeString() {
    /* TODO: to make generation dependence on 
    *  vocabulary
    */
    
    setString('');
    setPassedInputLength(0);
    setIndToFill(1);
    
    let copy = '';

    for (let i = 0; i < 30; i++) {
      copy += 'hello ';
    }

    setString(copy);
    let copySplitted = copy.split('');
    copySplitted.unshift(caret);
    setSplitted(copySplitted);
  }
  
  useEffect(()=>{
    textRef.current.innerHTML = splitted.join('');
  },[splitted])

  // By the first render
  useEffect(composeString, [curMode, wordsVariance, timeVariance]);
  
  function showMessage() {
    blurRef.current.style.opacity = '100%';
  }

  function hideMessage() {
    blurRef.current.style.opacity = '0%';
  }

  return (
    <>
      <div className='blur-message' ref={blurRef}>Click to focus</div>
      <input 
        ref={inputRef}
        className='input-form'
        autoComplete='off' 
        onBlur={showMessage}
        onFocus={hideMessage}
        onChange={handleInput}
        autoFocus 
      />
      <div className='text' ref={textRef} />
    </>
  );
}


export default Input;