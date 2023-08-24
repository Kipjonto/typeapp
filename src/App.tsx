import React, { useEffect, useState, useRef } from 'react';
import Input from './react/Input';
import Menu from './react/Menu';


const App = () => {
  // UI
  const [isMenuActive, setIsMenuActive] = useState(false);
  
  // Input States
  const [mode, setMode] = useState("Words");
  const [timeVariance, setTimeVariance] = useState("15");
  const [wordsProgress, setWordsProgress] = useState(0);
  const [wordsVariance, setWordsVariance] = useState("10");
  const [progress, setProgress] = useState("0 / 10");

  return (
    <div className="App">
      <Input
        progress={progress}
        setProgress={setProgress}
        curMode={mode}
        wordsVariance={wordsVariance}
        timeVariance={timeVariance}
      />
      <Menu
        curMode={mode}
        setMode={setMode}
        progress={progress}
        setProgress={setProgress}
        wordsVariance={wordsVariance}
        setWordsVariance={setWordsVariance}
        timeVariance={timeVariance}
        setTimeVariance={setTimeVariance}
        isMenuActive={isMenuActive}
        setIsMenuActive={setIsMenuActive}
      />
    </div>
  );
}


export default App;
