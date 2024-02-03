import React, {useEffect, useState} from 'react'
import StopWatch from "./StopWatch";
import ThemeSelector from "./ThemeSelector";
import "./styles/app.css"

export default function App() {

  const [theme, setTheme] = useState<string>('');

  useEffect(() => {
    document.documentElement.style.setProperty('--main-accent-color', theme);
  }, [theme]);

  return(
    <>
      <StopWatch />
      <ThemeSelector theme={theme} themeSelect={setTheme} />
    </>
  )
}