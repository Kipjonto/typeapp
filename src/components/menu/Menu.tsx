import { useState, useRef } from 'react';
import "./menu.css";
  
type menuProps = {
  mode: string;
  setMode: (arg: string) => void;
  wordsVariance: string;
  setWordsVariance: (arg: string) => void;
  timeVariance: string;
  setTimeVariance: (arg: string) => void;
  switchSettingsWindow: (arg: boolean) => void;
  settingsWindowState: boolean;
}
  
const Menu = ({
  mode, 
  setMode,
  setTimeVariance,
  switchSettingsWindow,
  settingsWindowState,
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
  
  const modes = [
    "Dzen", "Words", "Time"
  ];
  const modeList = modes.map(el => {
    return (
      <button 
        className={"menu__button " + el}
        onClick={() => setMode(el)} 
        onMouseOver={() => showDescribe(el + " mode")}
        onMouseLeave={hideDescribe} 
        style={
          isMenuActive ?
            el === mode ?
              {opacity: "100%"} 
            : {}  
          : {opacity: '0%', pointerEvents: "none"}
        } 
      />
    );
    }
  )

  const timeVariances = ['15', '30', '60'];
  const timeVariancesList = timeVariances.map(el => {
    return (
      <button
        className="menu__button variance" 
        onClick={() => setTimeVariance(el)}
        onMouseOver={() => showDescribe('Time mode / ' + el + 's')}
        onMouseLeave={hideDescribe}
        style={
          el == timeVariance ?
            {color: "var(--filled-font-color)"}
          : {}
        } 
      >
        {el + "s"}
      </button>
    );
  })

  const wordsVariances = ['10', '25', '50'];
  const wordsVariancesList = wordsVariances.map(el => {
    return (
      <button
        className="menu__button variance" 
        onClick={() => setWordsVariance(el)}
        onMouseOver={() => showDescribe('Words mode / ' + el)}
        onMouseLeave={hideDescribe}
        style={
          el == wordsVariance ?
            {color: "var(--filled-font-color)"}
          : {}
        } 
      >
        {el}
      </button>
    );
  })

  return (
    <>
      <div 
        className='menu__buttons-panel buttons-panel--lvl1' 
        style={
          settingsWindowState || mode === "Time" || !isMenuActive ? 
            {pointerEvents: "none", opacity: '0%'} 
          : {}
        }
      >
        {wordsVariancesList}
      </div>
      <div 
        className='menu__buttons-panel buttons-panel--lvl1'  
        style={
          settingsWindowState || mode === "Words" || !isMenuActive ? 
            {pointerEvents: "none", opacity: '0%'} 
          : {}}
      >
        {timeVariancesList}
      </div>
      <div className='menu__buttons-panel buttons-panel--lvl0'>
        {modeList}
        <button className="menu__button settings" onClick={() => switchSettingsWindow(!settingsWindowState)} onMouseOver={() => showDescribe("Settings")} onMouseLeave={hideDescribe} style={ !isMenuActive ? {opacity: "0%", pointerEvents: "none"} : {} } />
        <button className='menu__button menu-icon' onMouseLeave={hideDescribe} onMouseOver={() => showDescribe("Menu")} onClick={() => setIsMenuActive(!isMenuActive)} style={isMenuActive ? {opacity: '100'} : {} } />
      </div>
      <div className='menu__description' ref={describeRef}>{currentButton}</div>
    </>
  );
}

export default Menu;