import Modifications from './Modifications';
import Languages from './Languages';
import Themes from './Themes';
import "./settings.css";

type SettingsProps = {
  isSettingsWindowActive: boolean;
  languageIndex: number;
  setLanguageIndex: (ind: number) => void;
  themeIndex: number;
  setThemeIndex: (ind: number) => void;
  punctuation: boolean;
  setPunctuation: (arg: boolean) => void;
  numbers: boolean;
  setNumbers: (arg: boolean) => void;
  capital: boolean;
  setCapital: (arg: boolean) => void;
}

const Settings = ({
  isSettingsWindowActive,
  languageIndex,
  setLanguageIndex,
  themeIndex,
  setThemeIndex,
  punctuation,
  setPunctuation,
  numbers,
  setNumbers,
  capital,
  setCapital,
}: SettingsProps) => {
  return (
    <div 
      className="settings-window" 
      style={
        isSettingsWindowActive ? 
          {opacity: "100%", pointerEvents: "all"} 
        : {} 
      }
    >
      <p className='heading'>Settings</p>
      <div className='settings__panels'>
        <div className='panels__left-side'>
          <Languages languageIndex={languageIndex} setLanguageIndex={setLanguageIndex} />
          <Modifications 
            themeInd={themeIndex}
            punctuation={punctuation}
            setPunctuation={setPunctuation}
            numbers={numbers}
            setNumbers={setNumbers}
            capital={capital}
            setCapital={setCapital} 
          />
        </div>
        <Themes themeIndex={themeIndex} setThemeIndex={setThemeIndex} />
      </div>
    </div>
  )
}

export default Settings;