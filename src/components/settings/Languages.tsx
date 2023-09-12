import { useState } from 'react';

const languages = [
  "Русский",
  "English",
  "JavaScript",
  "Python",
  "C++"
];

type languageProps = {
  languageIndex: number;
  setLanguageIndex: (ind: number) => void;
}

const Languages = ({ 
  languageIndex,
  setLanguageIndex 
}: languageProps) => {
  const languageList = languages.map(lang => {
    return (
      <button
        className='button--language'
        onClick={() => setLanguageIndex(languages.indexOf(lang))}
        style={languageIndex === languages.indexOf(lang) ? {color: "var(--filled-font-color)", pointerEvents: "none"} : {}}
      >
        <div style={languageIndex === languages.indexOf(lang) ? {opacity: '100%'} : {}} className='tick' />
        {lang}
      </button>
    );
  })

  return (
    <div className='section section--languages'>
      <p className='section__name'>Languages</p>
      <div className='section__scroll'>
        {languageList}
      </div>
    </div>
  );
}

export default Languages;