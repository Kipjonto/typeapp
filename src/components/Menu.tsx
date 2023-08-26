import React, { useState, useRef, useEffect } from 'react';
import '../css/App.css';

type UIcontrolProps = {
  mode: string; 
  isMenuActive: boolean;
  showDescribe: (arg: string) => void;
  hideDescribe: () => void; 
}


type settingProps = UIcontrolProps & {
  openSetting: () => void;
  setting: string;
  bgClassName: string;
}

const Setting = ({
  openSetting, 
  showDescribe, 
  hideDescribe,
  isMenuActive, 
  bgClassName,
  setting
} : settingProps) => {
  return (
    <button
      className={"menu__button " + bgClassName}
      onClick={openSetting}
      onMouseOver={() => showDescribe(setting)}
      onMouseLeave={hideDescribe}
      style={
        !isMenuActive ?
          {opacity: "0%", pointerEvents: "none"}
        : {}
      }
    />
  )
}
      
type modeProps = UIcontrolProps & {
  childMode: string;
  mode: string;
  setMode: (arg: string) => void; 
  bgClassName: string;
}
      
const Mode = ({
  setMode,
  showDescribe,
  hideDescribe,
  mode,
  childMode,
  isMenuActive,
  bgClassName,
}: modeProps) =>  {
  return (
    <button 
      className={"menu__button " + bgClassName}
      onClick={() => setMode(childMode)} 
      onMouseOver={() => showDescribe(childMode + " mode")}
      onMouseLeave={hideDescribe} 
      style={
        isMenuActive ?
          childMode == mode ?
            {opacity: "100%"} 
          : {}  
        : {opacity: '0%', pointerEvents: "none"}
      } 
    />
  );
}


type varianceProps = UIcontrolProps & {
  variance: string; 
  childMode: string; 
  varianceState: string;
  setVariance: (arg: string) => void; 
};

const Variance = ({
  variance,
  setVariance,
  varianceState,
  showDescribe,
  hideDescribe,
  mode,
  childMode,
  isMenuActive,
} : varianceProps) => {
  return (
    <button
      className="menu__button modes" 
      onClick={() => setVariance(variance)}
      onMouseOver={() => showDescribe(childMode + ' mode / ' + variance)}
      onMouseLeave={hideDescribe}
      style={
        isMenuActive && childMode == mode ?
          varianceState == variance ?
            {opacity: "100%"}
          : {}
        : {opacity: "0%", pointerEvents: "none"}} 
    >
      {variance}
    </button>
  );
}
  
type menuProps = {
  mode: string;
  setMode: (arg: string) => void;
  wordsVariance: string;
  setWordsVariance: (arg: string) => void;
  timeVariance: string;
  setTimeVariance: (arg: string) => void;
}
  
const Menu = ({
  mode, 
  setMode,
  setTimeVariance,
  setWordsVariance,
  wordsVariance,
  timeVariance,
} : menuProps) => {
  const [isMenuActive, setIsMenuActive] = useState(true);
  const [currentButton, setCurrentButton] = useState("");
  const describeRef = useRef<HTMLParagraphElement>(null!);

  function showDescribe(button: string) {
    setCurrentButton(button);
    describeRef.current.style.opacity = '100%';
  }

  function hideDescribe() {
    describeRef.current.style.opacity = '0%';
  }
  
  return (
    <div className='menu__outer'>
      <div className='menu__buttons-panel'>
        <Variance 
          variance="50" 
          childMode="Words" 
          varianceState={wordsVariance} 
          setVariance={setWordsVariance} 
          isMenuActive={isMenuActive} 
          mode={mode} 
          showDescribe={showDescribe} 
          hideDescribe={hideDescribe} 
        />
        <Variance 
          variance="60" 
          childMode="Time" 
          varianceState={timeVariance} 
          setVariance={setTimeVariance} 
          isMenuActive={isMenuActive} 
          mode={mode} 
          showDescribe={showDescribe} 
          hideDescribe={hideDescribe} 
        />
        <div className='menu__button button--non-active' />
        <div className='menu__button button--non-active' />
      </div>
      <div className='menu__buttons-panel'>
        <Variance 
          variance="25" 
          childMode="Words" 
          varianceState={wordsVariance} 
          setVariance={setWordsVariance} 
          isMenuActive={isMenuActive} 
          mode={mode} 
          showDescribe={showDescribe} 
          hideDescribe={hideDescribe}  
        />
        <Variance 
          variance="30" 
          childMode="Time" 
          varianceState={timeVariance} 
          setVariance={setTimeVariance}
          isMenuActive={isMenuActive} 
          mode={mode} 
          showDescribe={showDescribe} 
          hideDescribe={hideDescribe}  
        />
        <div className='menu__button button--non-active' />
        <div className='menu__button button--non-active' />
      </div>
      <div className='menu__buttons-panel'>
        <Variance 
          variance="10" 
          childMode="Words" 
          varianceState={wordsVariance} 
          setVariance={setWordsVariance} 
          isMenuActive={isMenuActive} 
          mode={mode} 
          showDescribe={showDescribe} 
          hideDescribe={hideDescribe} 
        />
        <Variance 
          variance="15" 
          childMode="Time" 
          varianceState={timeVariance} 
          setVariance={setTimeVariance} 
          isMenuActive={isMenuActive} 
          mode={mode} 
          showDescribe={showDescribe} 
          hideDescribe={hideDescribe} 
        />
        <div className='menu__button button--non-active' />
        <div className='menu__button button--non-active' />
      </div>
      <div className='menu__buttons-panel'>
        <Setting mode={mode} isMenuActive={isMenuActive} showDescribe={showDescribe} hideDescribe={hideDescribe} setting="Score" openSetting={() => {}} bgClassName='scores' />
        <Mode childMode="Dzen" mode={mode} isMenuActive={isMenuActive} showDescribe={showDescribe} hideDescribe={hideDescribe} setMode={setMode} bgClassName='dzen' />
        <Mode childMode="Words" mode={mode} isMenuActive={isMenuActive} showDescribe={showDescribe} hideDescribe={hideDescribe} setMode={setMode} bgClassName='words' />
        <Mode childMode="Time" mode={mode} isMenuActive={isMenuActive} showDescribe={showDescribe} hideDescribe={hideDescribe} setMode={setMode} bgClassName='time' />
        <Setting mode={mode} isMenuActive={isMenuActive} showDescribe={showDescribe} hideDescribe={hideDescribe} setting="Settings" openSetting={() => {}} bgClassName='settings' />
        <button className='menu__button menu-icon' onMouseLeave={hideDescribe} onMouseOver={() => showDescribe("Menu")} onClick={() => setIsMenuActive(!isMenuActive)} style={isMenuActive ? {opacity: '100'} : {} } />
      </div>
      <div className='menu__description' ref={describeRef}>{currentButton}</div>
    </div>
  );
}


export default Menu;