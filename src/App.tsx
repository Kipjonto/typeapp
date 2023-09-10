import { useState } from 'react';
import Input from './components/input/Input';
import Menu from './components/menu/Menu';
import Settings from './components/settings/Settings';
import "./App.css";

const App = () => {
  const [mode, setMode] = useState("Words");
  const [languageIndex, setLanguageIndex] = useState(0);
  const [themeIndex, setThemeIndex] = useState(0);
  const [timeVariance, setTimeVariance] = useState("15")
  const [wordsVariance, setWordsVariance] = useState("10");
  const [isSettingsWindowActive, setIsSettingsWindowActive] = useState(false);
  const [punctuation, setPunctuation] = useState(false);
  const [numbers, setNumbers] = useState(false)
  const [capital, setCapital] = useState(false);

  return (
    <div className="App">
      <Input
        mode={mode}
        wordsVariance={wordsVariance}
        timeVariance={timeVariance}
        languageIndex={languageIndex}
        punctuation={punctuation}
        numbers={numbers}
        capital={capital}
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
      <Settings
        languageIndex={languageIndex}
        setLanguageIndex={setLanguageIndex}
        isSettingsWindowActive={isSettingsWindowActive}
        themeIndex={themeIndex}
        setThemeIndex={setThemeIndex}
        punctuation={punctuation}
        setPunctuation={setPunctuation}
        numbers={numbers}
        setNumbers={setNumbers}
        capital={capital}
        setCapital={setCapital}
      />
    </div>
  );
}

export default App;
