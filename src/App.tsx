import { useState } from 'react';
import Input from './components/input/Input';
import Menu from './components/menu/Menu';
import SettingsWindow from './components/settings/Settings';
import "./App.css";

const App = () => {
  const [mode, setMode] = useState("Words");
  const [timeVariance, setTimeVariance] = useState("15")
  const [wordsVariance, setWordsVariance] = useState("10");
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
      />
    </div>
  );
}

export default App;
