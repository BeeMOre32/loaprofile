import { createContext, useState } from "react";
import { isMobile } from "react-device-detect";
import { useThemeSwitcher } from "react-css-theme-switcher";

const LoaContext = createContext({
    names: [] as string[],
    profiles: [] as CharInfo[],
    setProfiles: (infos: CharInfo[]) => {},
    addProfile: (info: CharInfo) => {},
    removeProfile: (id: number) => {},
    isSimple: false,
    toggleSimple: () => {},
    isDark: false,
    toggleDark: () => {},
    isSecret: false,
    toggleSecret: () => {}
})

interface Props {
    children: JSX.Element | JSX.Element[];
  }
  
  const LoaProvider = ({ children }: Props): JSX.Element => {
  
    const [names, setNames] = useState(
        Array.from(new Set(window.localStorage.getItem("loa_inv")?.split(","))) || []
    );
    const { switcher, themes } = useThemeSwitcher();

    const [profiles, setProfiles] = useState([] as CharInfo[]);
    const [isSecret, setIsSecret] = useState(window.localStorage.getItem("loa_secret") === "true")
    const [isDark, setIsDark] = useState(window.localStorage.getItem("dark_mode") === "true")
    const [isSimple, setIsSimple] = useState(isMobile)

    const toggleSimple = () => {
      const newVal = !isSimple
      setIsSimple(newVal)      
    }

    const toggleDark = () => {
      const newVal = !isDark
      setIsDark(newVal) 
      window.localStorage.setItem("dark_mode", newVal.toString())
      switcher({ theme: newVal ? themes.dark : themes.light });
    }
    
    const toggleSecret = () => {
      const newVal = !isSecret
      setIsSecret(newVal) 
      window.localStorage.setItem("loa_secret", newVal.toString())
    }

    const addProfile = async (info: CharInfo) => {
      if(info.id) {
        setProfiles([...profiles, info])
        const newNames = [...names, info.mainInfo.nickname]
        window.localStorage.setItem("loa_inv", newNames.join(","))
        setNames(newNames);
      }
    }

    const removeProfile = (id: number) => {
      const newNames = profiles.filter(a => a.id !== id).map(a => a.mainInfo.nickname);
      window.localStorage.setItem("loa_inv", newNames.join(","))
      setNames(newNames);
      setProfiles(profiles.filter(a => a.id !== id))
    }

      return (
        <LoaContext.Provider
          value={{
            names,
            profiles,
            setProfiles,
            addProfile,
            removeProfile,
            isSimple,
            toggleSimple,
            isDark,
            toggleDark,
            isSecret,
            toggleSecret
          }}>
          {children}
        </LoaContext.Provider>
      );
  };
    
  export { LoaContext, LoaProvider }