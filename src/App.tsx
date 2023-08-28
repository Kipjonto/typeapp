import { useState } from 'react';
import Input from './components/Input';
import Menu from './components/Menu';
import SettingsWindow from './components/SettingsWindow';


const App = () => {
  // Input modificators
  const [mode, setMode] = useState("Words");
  const [timeVariance, setTimeVariance] = useState("15")
  const [wordsVariance, setWordsVariance] = useState("10");
  const [languageIndex, setLanguageIndex] = useState(0)
  const [isSettingsWindowActive, setIsSettingsWindowActive] = useState(false);

  return (
    <div className="App">
      <Input
        mode={mode}
        wordsVariance={wordsVariance}
        timeVariance={timeVariance}
      />
      <Menu
        mode={mode}
        setMode={setMode}
        wordsVariance={wordsVariance}
        setWordsVariance={setWordsVariance}
        timeVariance={timeVariance}
        setTimeVariance={setTimeVariance}
        switchSettingsWindow={setIsSettingsWindowActive}
        settingsWindowState={isSettingsWindowActive}
      />
      <SettingsWindow 
        isSettingsWindowActive={isSettingsWindowActive}
        setLanguageIndex={setLanguageIndex}
      />
    </div>
  );
}

export default App;
