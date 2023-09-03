import { useState } from 'react';

function changeTheme(
  bgColor: string,
  filledFontColor: string,
  unfilledFontColor: string,
  uncorrectFontColor: string
) {
  const page = document.documentElement;

  page.style.setProperty("--bg-color", bgColor);
  page.style.setProperty("--filled-font-color", filledFontColor);
  page.style.setProperty("--unfilled-font-color", unfilledFontColor);
  page.style.setProperty("--uncorrect-font-color", uncorrectFontColor);
}

const themes = [
  {
    name: "Night",
    bgColor: "#0d1321",
    filledFontColor: "#f0ebd8",
    unfilledFontColor: "#748cab",
    uncorrectFontColor: "red",
  },
  {
    name: "Tomatoes",
    bgColor: "#590d22",
    filledFontColor: "#fff0f3",
    unfilledFontColor: "#ffb3c1",
    uncorrectFontColor: "#c9184a",
  },
  {
    name: "Cloudy",
    bgColor: "#2e4756",
    filledFontColor: "#dbc2cf",
    unfilledFontColor: "#9fa2b2",
    uncorrectFontColor: "#c9184a",  
  },
  {
    name: "Sunset",
    bgColor: "#f4d58d",
    filledFontColor: "#001427",
    unfilledFontColor: "#708d81",
    uncorrectFontColor: "#8d0801",
  },
  {
    name: "Retrowave",
    bgColor: "#480ca8",
    filledFontColor: "#f72585",
    unfilledFontColor: "#b5179e",
    uncorrectFontColor: "#8d0801",
  }
];

const Themes = () => {
  const [themeState, setThemeState] = useState("Night");

  const themesList = themes.map(theme => {
    return (
      <button
      className='button--theme'
      onClick={() => {
        changeTheme(
          theme.bgColor,
          theme.filledFontColor,
          theme.unfilledFontColor,
          theme.uncorrectFontColor
        )
        setThemeState(theme.name);
      }
      }
      style={themeState === theme.name ? {color: "white"} : {}}
    >
      <div style={{display: 'flex', height: '100%', alignItems: "center"}}>
        <img className='tick' style={themeState === theme.name ? {opacity: '100%'} : {}} />
        {theme.name}
      </div>
      <div className='theme__palet' style={{backgroundColor: theme.bgColor}}>
        <div className='palet__color' style={{backgroundColor: theme.unfilledFontColor}} />
        <div className='palet__color' style={{backgroundColor: theme.filledFontColor}} />
        <div className='palet__color' style={{backgroundColor: theme.uncorrectFontColor}} />
      </div>
    </button>
    );
  })

  return (
    <div className='section section--themes'>
      <p>Themes</p>  
      <div className='section__scroll'>
        {themesList}
      </div>
    </div>
  );
}

export default Themes;