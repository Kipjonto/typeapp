import React from 'react';

type SettingsProps = {
  setLanguageIndex: (index: number) => void;
}

const SettingsWindow = ({
  setLanguageIndex
}: SettingsProps) => {
  /*===============
         THEMES
    ===============*/
  function changeTheme(
    tileColor: string,
    fontColor: string,
    secondFontColor: string
  ) {

  }

  const themesArr = [
    {
      name: "Night",
      tileColor: "",
      fontColor: "",
      secondFontColor: "",
    },
    {
      name: "Aqua",
      tileColor: "",
      fontColor: "",
      secondFontColor: "",
    },
    {
      name: "Retrowave",
      tileColor: "",
      fontColor: "",
      secondFontColor: "",
    }
  ];

  const themes = themesArr.map(theme => {
    return (
      <button
        className='button--theme'
        onClick={() => changeTheme(
          theme.tileColor,
          theme.fontColor,
          theme.secondFontColor
        )}
      >
        {theme.name}
      </button>
    );
  })

  /*===============
     MODIFICATIONS
    ===============*/
  const modificationsArr = [
    {
      name: "Blindness", 
      function: setLanguageIndex
    },
    {
      name: "Punctuation",
      function: setLanguageIndex
    },
    {
      name: "Numbers",
      function: setLanguageIndex
    },
  ];

  const modifications = modificationsArr.map(mode => {
    return (
      <button 
        className='button--modification'
        onClick={() => mode.function}
      >
        {mode.name}
      </button>
    );
  })

  /*===============
       LANGUAGES
    ===============*/
  const languagesArr = [
    "Русский",
    "English",
    "JavaScript",
    "Python"
  ];

  const languages = languagesArr.map(lang => {
    return (
      <button 
        className='button--language'
        onClick={() => setLanguageIndex(languagesArr.indexOf(lang))}
      >
        {lang}
      </button>
    );
  })

  return (
    <div className="settings-window">
      <p className='heading'>Settings</p>
      <div className='section'>
        {languages}
      </div>
      <div className='section'>
        {modifications}
      </div>
      <div className='section'>
        {themes}
      </div>
    </div>
  )
}

export default SettingsWindow;