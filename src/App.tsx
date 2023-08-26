import React, { useEffect, useState, useRef } from 'react';
import Input from './components/Input';
import Menu from './components/Menu';


const App = () => {
  // UI
  const [isMenuActive, setIsMenuActive] = useState(true);
  const [progress, setProgress] = useState("0 / 10");
  
  // Input modificators
  const [mode, setMode] = useState("Words");
  const [timeVariance, setTimeVariance] = useState("15")
  const [wordsVariance, setWordsVariance] = useState("10");

  return (
    <div className="App">
      <Input
        mode={mode}
        wordsVariance={wordsVariance}
        timeVariance={timeVariance}
        setProgress={setProgress}
      />
      <Menu
        mode={mode}
        setMode={setMode}
        progress={progress}
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
