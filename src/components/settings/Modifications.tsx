import { useEffect, useState } from 'react';
import themes from './themes-list';

type modificationProps = {
  themeInd: number;
  punctuation: boolean;
  setPunctuation: (arg: boolean) => void;
  numbers: boolean;
  setNumbers: (arg: boolean) => void;
  capital: boolean;
  setCapital: (arg: boolean) => void;
}

const Modifications = ({
  themeInd,
  punctuation,
  setPunctuation,
  numbers,
  setNumbers,
  capital,
  setCapital,
}: modificationProps) => {
  const [blindness, setBlindness] = useState(false);
  const [smooth, setSmooth] = useState(true);
  
  const modifications = [
    {
      name: "Blindness", 
      state: blindness,
      switch: setBlindness,
    },
    {
      name: "Punctuation",
      state: punctuation,
      switch: setPunctuation,
    },
    {
      name: "Numbers",
      state: numbers,
      switch: setNumbers,
    },
    {
      name: "Capital",
      state: capital,
      switch: setCapital,
    },
    {
      name: "Smooth",
      state: smooth,
      switch: setSmooth,
    } 
  ];

  const styles = document.documentElement.style;

  useEffect(()=>{
    if (smooth) {
      styles.setProperty('--smoothness', '0.25s');
    }
    else {
      styles.setProperty('--smoothness', '0s');
    }
  }, [smooth]);

  useEffect(()=>{
    if (blindness) {
      styles.setProperty('--uncorrect-font-color', themes[themeInd].filledFontColor);
    }
    else {
      styles.setProperty('--uncorrect-font-color', themes[themeInd].uncorrectFontColor);
    }
  }, [blindness]);

  const modificationList = modifications.map(mode => {
    return (
      <button 
        className='button--modification'
        style={
          mode.state ?
            { backgroundColor: "var(--filled-font-color)", 
              color: "var(--bg-color)", 
              border: "2px solid var(--filled-font-color)" }
          : {}
        }
        onClick={() => mode.switch(!mode.state)}
      >
        {mode.name}
      </button>
    );
  })

  return (
    <div className='section section--modifications'>
      <p className='section__name'>Modifications</p>
      <div className='section__scroll scroll--modifications'>
        {modificationList}
      </div>
    </div>
  );
}

export default Modifications;

