import React, { useState } from 'react';
import tick from '../img/tick-img.png';

type SettingsProps = {
  isSettingsWindowActive: boolean;
  setLanguageIndex: (index: number) => void;
}

const SettingsWindow = ({
  setLanguageIndex,
  isSettingsWindowActive
}: SettingsProps) => {
  /*===============
         THEMES
    ===============*/
  const [themeState, setThemeState] = useState("Night");
  const [languageState, setLanguageState] = useState("Русский");

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
        onClick={() => {
          changeTheme(
            theme.tileColor,
            theme.fontColor,
            theme.secondFontColor
          )
          setThemeState(theme.name);
        }
        }
        style={themeState === theme.name ? {color: "white"} : {}}
      >
        <img className='tick' style={themeState === theme.name ? {opacity: '100%'} : {}} src={tick} />
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
        onClick={() => {
          setLanguageIndex(languagesArr.indexOf(lang));
          setLanguageState(lang);
        }}
        style={languageState === lang ? {color: "white"} : {}}
      >
        <img style={languageState === lang ? {opacity: '100%'} : {}} className='tick' src={tick} />
        {lang}
      </button>
    );
  })

  return (
    <div className="settings-window" style={
      isSettingsWindowActive ? 
        {opacity: "100%", pointerEvents: "all"} 
      : {}
    }>
      <p className='heading'>Settings</p>
      <div className='settings__panels'>
        <div className='panels__left-side'>
          <div className='section section--languages'>
            <p>Languages</p>
            <div className='section__scroll'>
              {languages}
            </div>
          </div>
          <div className='section section--modifications'>
            <p>Modifications</p>
            <div className='section__scroll'>
              {modifications}
            </div>
          </div>
        </div>
        <div className='section section--themes'>
          <p>Themes</p>  
          <div className='section__scroll'>
            {themes}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsWindow;