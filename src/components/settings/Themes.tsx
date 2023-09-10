import themes from './themes-list';

function changeTheme(
  bgColor: string,
  filledFontColor: string,
  unfilledFontColor: string,
  uncorrectFontColor: string
) {
  const styles = document.documentElement.style;

  styles.setProperty("--bg-color", bgColor);
  styles.setProperty("--filled-font-color", filledFontColor);
  styles.setProperty("--unfilled-font-color", unfilledFontColor);
  styles.setProperty("--uncorrect-font-color", uncorrectFontColor);
}

type themeProps = {
  themeIndex: number;
  setThemeIndex: (ind: number) => void; 
}

const Themes = ({
  themeIndex,
  setThemeIndex
}: themeProps) => {
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
          setThemeIndex(themes.indexOf(theme));
        }
        }
        style={themeIndex === themes.indexOf(theme) ? {color: "var(--filled-font-color)", pointerEvents: "none"} : {}}
      >
        <div style={{display: 'flex', height: '100%', alignItems: "center"}}>
          <div className='tick' style={themeIndex === themes.indexOf(theme) ? {opacity: '100%'} : {}} />
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