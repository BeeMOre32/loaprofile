import { notification } from "antd";
import axios from "axios";
import { createContext, useState } from "react";

const LoaContext = createContext({
    names: [] as string[],
    profiles: [] as CharInfo[],
    setProfiles: (infos: CharInfo[]) => {},
    addProfile: (info: CharInfo) => {},
    removeProfile: (id: number) => {}
})

interface Props {
    children: JSX.Element | JSX.Element[];
  }
  
  const LoaProvider = ({ children }: Props): JSX.Element => {
  
    const [names, setNames] = useState(
        Array.from(new Set(window.localStorage.getItem("loa_inv")?.split(","))) || []
    );

    const [profiles, setProfiles] = useState([] as CharInfo[]);
    
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
          }}>
          {children}
        </LoaContext.Provider>
      );
  };
    
  export { LoaContext, LoaProvider }