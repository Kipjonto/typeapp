import React, { useState, useRef, useEffect } from 'react';
import '../css/App.css';
import timeImg from '../img/time-img.png';
import infinityImg from '../img/inf-img.png';
import wordsImg from '../img/words-img.png';
import settingsImg from '../img/settings-img.png';
import crownImg from '../img/crown-img.png';

type UIcontrolProps = {
  curMode: string; 
  isMenuActive: boolean;
  showDescribe: (arg: string) => void;
  hideDescribe: () => void; 
}

type backgroundProps = {
  bgImage: string;
  bgSize: string;
}


type settingProps = backgroundProps & UIcontrolProps & {
  openSetting: () => void;
  setting: string;
}

const Setting = ({
  openSetting, 
  showDescribe, 
  hideDescribe,
  isMenuActive, 
  bgImage, 
  bgSize, 
  setting
} : settingProps) => {
  return (
    <button
    className="menu__button modes"
    onClick={openSetting}
      onMouseOver={() => showDescribe(setting)}
      onMouseLeave={hideDescribe}
      style={
        isMenuActive ?
          {pointerEvents: "all", backgroundImage: bgImage, backgroundSize: bgSize}
          : {pointerEvents: "none", opacity: "0%"}
        }
        />
        )
      }
      
      type modeProps = UIcontrolProps & backgroundProps & {
        childMode: string;
        curMode: string;
        setMode: (arg: string) => void; 
      }
      
      const Mode = ({
        setMode,
        showDescribe,
        hideDescribe,
        curMode,
        childMode,
        isMenuActive,
  bgImage,
  bgSize
}: modeProps) =>  {
  return (
    <button 
    className="menu__button modes"
    onClick={() => setMode(childMode)} 
    onMouseOver={() => showDescribe(childMode + " mode")}
    onMouseLeave={hideDescribe} 
    style={
        isMenuActive ?
        childMode == curMode ?
        {pointerEvents: "all", opacity: "100%", backgroundImage: bgImage, backgroundSize: bgSize} 
            : {pointerEvents: "all", backgroundImage: bgImage, backgroundSize: bgSize}  
          : {opacity: '0%'}
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
  curMode,
  childMode,
  isMenuActive,
} : varianceProps) => {
  return (
    <button
      className="menu__button modes" 
      onClick={() => setVariance(variance)}
      onMouseOver={() => showDescribe(childMode + ' mode / ' + variance)}
      onMouseLeave={hideDescribe}
      style={isMenuActive && childMode == curMode ?
                varianceState == variance ?
                  {pointerEvents: "all", opacity: "100%"}
                  : {pointerEvents: "all"}
              : {opacity: "0%"}} 
    >
      {variance}
    </button>
  );
}
  
type menuProps = {
  setIsMenuActive: (arg: boolean) => void;
  isMenuActive: boolean;
  curMode: string;
  setMode: (arg: string) => void;
  progress: string;
  setProgress: (arg: string) => void;
  wordsVariance: string;
  setWordsVariance: (arg: string) => void;
  timeVariance: string;
  setTimeVariance: (arg: string) => void;
}
  
const Menu = ({
  curMode, 
  setMode,
  isMenuActive,
  setIsMenuActive,
  progress,
  setProgress,
  setTimeVariance,
  setWordsVariance,
  wordsVariance,
  timeVariance,
} : menuProps) => {
  const [currentButton, setCurrentButton] = useState("");
  const describeRef = useRef<HTMLParagraphElement>(null!);
  
  function manageButtonsPanel() {
    setIsMenuActive(!isMenuActive);
  }

  function showDescribe(button: string) {
    setCurrentButton(button);
    describeRef.current.style.opacity = '100%';
  }

  function hideDescribe() {
    describeRef.current.style.opacity = '0%';
  }

  function useDzenMode() {
    setMode("Dzen");
    setProgress('');
  }

  function useTimeMode() {
    setMode("Time");
  }

  function useTimeVariance(variance: string) {
    setTimeVariance(variance);
  }


  function useWordsMode() {
    setMode("Words");
    setProgress('0 / ' + wordsVariance);
  }

  function useWordsVariance(variance: string) {
    setWordsVariance(variance);
    setProgress('0 / ' + wordsVariance);
  }
  
  
  return (
    <div className='menu__outer'>
      <div className='menu__mode-progress'>{progress}</div>
      <div className='menu__buttons-panel'>
        <Variance 
          variance="50" 
          childMode="Words" 
          varianceState={wordsVariance} 
          setVariance={useWordsVariance} 
          isMenuActive={isMenuActive} 
          curMode={curMode} 
          showDescribe={showDescribe} 
          hideDescribe={hideDescribe} 
        />
        <Variance 
          variance="60" 
          childMode="Time" 
          varianceState={timeVariance} 
          setVariance={useTimeVariance} 
          isMenuActive={isMenuActive} 
          curMode={curMode} 
          showDescribe={showDescribe} 
          hideDescribe={hideDescribe} 
        />
        <div className='menu__button modes' />
        <div className='menu__button modes' />
      </div>
      <div className='menu__buttons-panel'>
        <Variance 
          variance="25" 
          childMode="Words" 
          varianceState={wordsVariance} 
          setVariance={useWordsVariance} 
          isMenuActive={isMenuActive} 
          curMode={curMode} 
          showDescribe={showDescribe} 
          hideDescribe={hideDescribe}  
        />
        <Variance 
          variance="30" 
          childMode="Time" 
          varianceState={timeVariance} 
          setVariance={useTimeVariance}
          isMenuActive={isMenuActive} 
          curMode={curMode} 
          showDescribe={showDescribe} 
          hideDescribe={hideDescribe}  
        />
        <div className='menu__button modes' />
        <div className='menu__button modes' />
      </div>
      <div className='menu__buttons-panel'>
        <Variance 
          variance="10" 
          childMode="Words" 
          varianceState={wordsVariance} 
          setVariance={useWordsVariance} 
          isMenuActive={isMenuActive} 
          curMode={curMode} 
          showDescribe={showDescribe} 
          hideDescribe={hideDescribe} 
        />
        <Variance 
          variance="15" 
          childMode="Time" 
          varianceState={timeVariance} 
          setVariance={useTimeVariance} 
          isMenuActive={isMenuActive} 
          curMode={curMode} 
          showDescribe={showDescribe} 
          hideDescribe={hideDescribe} 
        />
        <div className='menu__button modes' />
        <div className='menu__button modes' />
      </div>
      <div className='menu__buttons-panel'>
        <Setting curMode={curMode} isMenuActive={isMenuActive} showDescribe={showDescribe} hideDescribe={hideDescribe} setting="Score" openSetting={() => {}} bgImage={`url(${crownImg})`} bgSize='60%' />
        <Mode childMode="Dzen" curMode={curMode} isMenuActive={isMenuActive} showDescribe={showDescribe} hideDescribe={hideDescribe} setMode={useDzenMode} bgImage={`url(${infinityImg})`} bgSize='60%' />
        <Mode childMode="Words" curMode={curMode} isMenuActive={isMenuActive} showDescribe={showDescribe} hideDescribe={hideDescribe} setMode={useWordsMode} bgImage={`url(${wordsImg})`} bgSize='40%' />
        <Mode childMode="Time" curMode={curMode} isMenuActive={isMenuActive} showDescribe={showDescribe} hideDescribe={hideDescribe} setMode={useTimeMode} bgImage={`url(${timeImg})`} bgSize='30%' />
        <Setting curMode={curMode} isMenuActive={isMenuActive} showDescribe={showDescribe} hideDescribe={hideDescribe} setting="Settings" openSetting={() => {}} bgImage={`url(${settingsImg})`} bgSize='45%' />
        <button className='menu__button menu-icon' onMouseLeave={hideDescribe} onMouseOver={() => showDescribe("Menu")} onClick={manageButtonsPanel} style={isMenuActive ? {opacity: '100'} : {} } />
      </div>
      <div className='menu__description' ref={describeRef}>{currentButton}</div>
    </div>
  );
}


export default Menu;