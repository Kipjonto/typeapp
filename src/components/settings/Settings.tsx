import Modifications from './Modifications';
import Languages from './Languages';
import Themes from './Themes';
import "./settings.css";

type SettingsProps = {
  isSettingsWindowActive: boolean;
}

const Settings = ({
  isSettingsWindowActive
}: SettingsProps) => {
  return (
    <div 
      className="settings-window" 
      style={
        isSettingsWindowActive ? 
          {opacity: "100%", pointerEvents: "all"} 
        : {} 
      }
    >
      <p className='heading'>Settings</p>
      <div className='settings__panels'>
        <div className='panels__left-side'>
          <Languages />
          <Modifications />
        </div>
        <Themes />
      </div>
    </div>
  )
}

export default Settings;