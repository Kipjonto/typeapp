import { useState, useRef, useEffect } from 'react';
import "./input.css";
import russianWords from '../settings/languages/russian';
import englishWords from '../settings/languages/english';
import jsWords from '../settings/languages/java-script';
import cppWords from '../settings/languages/cplusplus';
import pythonWords from '../settings/languages/python';

const dictionary = [
  russianWords,
  englishWords,
  jsWords,
  pythonWords,
  cppWords,
]

function randint(max: number) {
  return Math.floor(Math.random() * max);
}

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
  languageIndex: number;
  numbers: boolean;
  punctuation: boolean;
  capital: boolean;
}

const Input = ({
  mode,
  wordsVariance,
  timeVariance,
  languageIndex,
  numbers,
  punctuation,
  capital,
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
      }
    }
    else if (mode === "Time") {
      setProgress(makeTimePrettier(timeProgress.toString()));
      if (timeProgress < 1) {
        setEndTime(Date.now);
      }
    }
  }, [mode, timeProgress, wordsProgress, wordsVariance]);

  const restartRun = useEffect(() => {
    composeString();
  }, [timeVariance, wordsVariance, mode, languageIndex])
  
  const callResult = useEffect(() => {
    let correctChar = 0;

    for (let i = 0; i < indToFill-1; i++) {
      if (splitted[i] === `<font style="color:var(--filled-font-color)">${string[i]}</font>`) {
        correctChar++;
      } 
    }

    const wpm = Math.floor(correctChar / ((endTime - startTime) / 1000 / 60) / 5);

    if (mode === "Time" && !Number.isNaN(wpm)) {
      setPrevTimeResult(wpm);
      if (wpm > bestTimeResult) {
        setBestTimeResult(wpm);
      }
    } 
    else if (!Number.isNaN(wpm)) {
      setPrevWordsResult(wpm);
      if (wpm > bestWordsResult) {
        setBestWordsResult(wpm);
      }
    }

    composeString();
  }, [endTime])

  const moveText = useEffect(()=>{
    textRef.current.style.left = `-${translateX}px`;
  }, [translateX])

  function handleInput() {
    if (!isRunning) {      
      if (mode === "Time") {
        intervalRef.current = setInterval(()=> {
          setTimeProgress(time => time - 1);
        }, 1000)
      }
      setStartTime(Date.now);
      setIsRunning(true);
    } 

    if (inputRef.current.value.length > passedInputLength) {
      let color = "filled"; 
      let symbol = string[indToFill-1];

      if (inputRef.current.value.at(-1) !== string[indToFill-1]) {
        color = "uncorrect";
    
        if (string[indToFill-1] == ' ') {
          symbol = inputRef.current.value.at(-1)!;
        }
      }

      if (mode === "Words" && string[indToFill-1] === ' ') {
        setWordsProgress(prev => prev + 1);
      }
      splitted[indToFill] = `<font style="color:var(--${color}-font-color)">${symbol}</font>`;
      [splitted[indToFill], splitted[indToFill - 1]] = [splitted[indToFill - 1], splitted[indToFill]];
      setTranslateX(dist => dist += 18.7);
      setIndToFill(indToFill + 1);
    } 
    else if (indToFill > 1) {
      if (mode === "Words" && string[indToFill-2] === ' ') {
        setWordsProgress(prev => prev - 1);
      }
      splitted[indToFill-2] = `<font style="color:var(--unfilled-font-color)">${string[indToFill-2]}</font>`;
      [splitted[indToFill - 2], splitted[indToFill - 1]] = [splitted[indToFill - 1], splitted[indToFill - 2]];
      setTranslateX(dist => dist -= 18.7);
      setIndToFill(indToFill - 1);
    }
        
    setPassedInputLength(inputRef.current.value.length);
    textRef.current.innerHTML = splitted.join('');
  }

  function composeString() {
    setPassedInputLength(0);
    setIndToFill(1);
    setIsRunning(false);
    setWordsProgress(0);
    setTimeProgress(Number(timeVariance));
    setTranslateX(0);
    clearInterval(intervalRef.current);
    inputRef.current.value = '';
    inputRef.current.blur();

    let copy = '';
    for (let i = 0; i < 30; i++) {
      copy += dictionary[languageIndex][randint(dictionary[languageIndex].length)] + ' ';
    }
    setString(copy);

    let copySplitted = copy.split('');
    const caret = "<font style='color: #FFB02E; margin: 0 -7px; animation: caret 1s infinite'>|</font>";
    copySplitted.unshift(caret);
    setSplitted(copySplitted);
  }
  
  useEffect(()=>{
    textRef.current.innerHTML = splitted.join('');
  }, [splitted])

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