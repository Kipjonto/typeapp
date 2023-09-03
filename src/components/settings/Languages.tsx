import { useState } from 'react';

const languages = [
  "Русский",
  "English",
  "JavaScript",
  "Python",
  "C++"
];

const Languages = () => {
  const [language, setLanguage] = useState("Русский");

  const languageList = languages.map(lang => {
    return (
      <button
        className='button--language'
        onClick={() => setLanguage(lang)}
        style={language === lang ? {color: "white"} : {}}
      >
        <div style={language === lang ? {opacity: '100%'} : {}} className='tick' />
        {lang}
      </button>
    );
  })

  return (
    <div className='section section--languages'>
      <p>Languages</p>
      <div className='section__scroll'>
        {languageList}
      </div>
    </div>
  );
}

export default Languages;