import React, { useState, useRef, useEffect } from 'react';
import "./input.css";

function makeTimePrettier(time: string) {
  let prettierTime = "";

  let minutes = Math.floor(parseInt(time) / 60); 
  if (minutes > 9) {
    prettierTime += `${minutes}:`;
  } else {
    prettierTime += `0${minutes}:`;
  }
  
  let seconds = Math.floor(parseInt(time) % 60);
  if (seconds > 9) {
    prettierTime += `${seconds}`;
  } else {
    prettierTime += `0${seconds}`;
  }

  return prettierTime;
}

type inputProps = {
  mode: string;
  wordsVariance: string;
  timeVariance: string;
}

const Input = ({
  mode,
  wordsVariance,
  timeVariance,
} : inputProps ) => {
  const blurRef = useRef<HTMLDivElement>(null!);
  const textRef = useRef<HTMLDivElement>(null!); 
  const inputRef = useRef<HTMLInputElement>(null!);
  const intervalRef = useRef<any>(null);

  const [progress, setProgress] = useState("0 / 10");
  const [wordsProgress, setWordsProgress] = useState(0);
  const [timeProgress, setTimeProgress] = useState(Number(timeVariance));

  const [bestTimeResult, setBestTimeResult] = useState(0);
  const [prevTimeResult, setPrevTimeResult] = useState(0);
  const [bestWordsResult, setBestWordsResult] = useState(0);
  const [prevWordsResult, setPrevWordsResult] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(Date.now);
  const [endTime, setEndTime] = useState(Date.now)

  const [string, setString] = useState("");
  const [splitted, setSplitted] = useState(['']);
  const [indToFill, setIndToFill] = useState(1);
  const [passedInputLength, setPassedInputLength] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  const changeProgress = useEffect(() => {
    if (mode === "Words") {
      setProgress(wordsProgress + " / " + wordsVariance);
      if (wordsProgress === Number(wordsVariance)) {
        setEndTime(Date.now);
        inputRef.current.blur();
      }
    }
    else if (mode === "Time") {
      setProgress(makeTimePrettier(timeProgress.toString()));
      if (timeProgress < 1) {
        clearInterval(intervalRef.current);
        setEndTime(Date.now);
        inputRef.current.blur();
      }
    }
  }, [mode, timeProgress, wordsProgress, wordsVariance]);

  const changeVariance = useEffect(() => {
    composeString();

    if (mode === "Time") {
      setTimeProgress(Number(timeVariance));
    } 
    else if (mode === "Words") {
      setWordsProgress(0);
    } 

    clearInterval(intervalRef.current);
  }, [timeVariance, wordsVariance, mode])

  const caret = "<font style='color: #FFB02E; margin: 0 -7px; animation: caret 1s infinite'>|</font>";
    
  function checkResult() {
    let wpm = 0;
    let correctColor = "filled-font-color";
    let correctChar = 0;

    for (let i = 0; i < indToFill-1; i++) {
      if (splitted[i] === `<font style="color:var(--${correctColor})">${string[i]}</font>`) {
        correctChar++;
      } 
    }

    wpm = Math.floor(correctChar / ((endTime - startTime) / 1000 / 60) / 5);
    
    return wpm;
  }
  
  useEffect(() => {
    const result = checkResult();

    if (mode === "Time" && !Number.isNaN(result)) {
      setPrevTimeResult(result);

      if (result > bestTimeResult) {
        setBestTimeResult(result);
      }
    } 
    else if (!Number.isNaN(result)) {
      setPrevWordsResult(result);
      
      if (result > bestWordsResult) {
        setBestWordsResult(result);
      }
    }
  }, [endTime])

  useEffect(()=>{
    textRef.current.style.left = `-${translateX}px`;
  }, [translateX])

  function handleInput() {
    let index = indToFill;
    let color = "filled"; 
    let symbol = string[indToFill-1];
    let currentInputLength = inputRef.current.value.length;
    
    function fillSymbolAndMoveCaret(firstSwapEl: number, 
                                    secondSwapEl: number, 
                                    incrementValue: number, 
                                    strMovementDist: number) {
      splitted[index] = `<font style="color:var(--${color}-font-color)">${symbol}</font>`;

      [splitted[firstSwapEl], splitted[secondSwapEl]] = [splitted[secondSwapEl], splitted[firstSwapEl]];

      setIndToFill(incrementValue);
      setTranslateX(dist => dist += strMovementDist)
    }

    if (!isRunning) {      
      if (mode === "Time") {
        intervalRef.current = setInterval(()=> {
          setTimeProgress(time => time - 1);
        }, 1000)
      }
      setStartTime(Date.now);
      setIsRunning(true);
    } 

    if (currentInputLength > passedInputLength) {
      if (mode === "Words" && string[indToFill-1] === ' ') {
        setWordsProgress(prev => prev + 1);
      }

      if (inputRef.current.value.at(-1) !== string[indToFill-1]) {
        color = "uncorrect";
        
        if (string[indToFill-1] == ' ') {
          symbol = inputRef.current.value.at(-1)!;
        }
      }

      fillSymbolAndMoveCaret(indToFill, indToFill-1, indToFill+1, 18.7);
    } 
    else if (indToFill > 1) {
      if (mode === "Words" && string[indToFill-2] === ' ') {
        setWordsProgress(prev => prev - 1);
      }

      color = "unfilled";
      symbol = string[indToFill-2];
      index = indToFill-2;

      fillSymbolAndMoveCaret(indToFill-2, indToFill-1, indToFill-1, -18.7);
    }
        
    setPassedInputLength(inputRef.current.value.length);
    textRef.current.innerHTML = splitted.join('');
  }

  function composeString() {
    setString('');
    setPassedInputLength(0);
    setIndToFill(1);
    setIsRunning(false);
    setWordsProgress(0);
    setTimeProgress(Number(timeVariance));
    setTranslateX(0);
    inputRef.current.value = '';

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

  useEffect(composeString, [mode, wordsVariance, timeVariance]);
  
  function showMessage() {
    blurRef.current.style.opacity = '100%';
  }

  function hideMessage() {
    blurRef.current.style.opacity = '0%';
  }

  return (
    <>
      <div className='speed-indicator'>
        <p>Mode: {mode}</p>
        <p style={mode === "Dzen" ? {display: "none"} : {}}>{
          mode === "Time" ? 
            "Variance: " + timeVariance + 's'
          : "Variance: " + wordsVariance
        }</p>
        <p style={mode === "Dzen" ? {display: "none"} : {}}>Last: {
          mode === "Time" ?
            prevTimeResult + "wpm"
          : prevWordsResult + "wpm"
        }</p>
        <p style={mode === "Dzen" ? {display: "none"} : {}}>Best: {
          mode === "Time" ?
            bestTimeResult + "wpm"
          : bestWordsResult + "wpm"
        }</p>
      </div>
      <div 
        className='progress'
        style={
          mode === "Dzen" ? 
            {opacity: "0%"} 
          : {}
        }
      >
        {progress}
      </div>
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
      <div className='shadow shadow--left' />
      <div className='shadow shadow--right' />
      <button className='button--restart' onClick={composeString}>&#x21bb;</button>
      <code className='text' ref={textRef} />
    </>
  );
}


export default Input;