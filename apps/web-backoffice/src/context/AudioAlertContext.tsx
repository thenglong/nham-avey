import { createContext, ReactNode, useContext, useRef } from "react"

interface AudioAlertContext {
  playAlert: () => Promise<void>
}

const AudioAlertContext = createContext<AudioAlertContext>({
  playAlert: () => Promise.resolve(),
})

const AudioAlertContextProvider = ({ children }: { children: ReactNode }) => {
  const audio = useRef(new Audio("/assets/sounds/alert.mp3"))

  return (
    <AudioAlertContext.Provider
      value={{
        playAlert: audio.current.play.bind(audio.current),
      }}
    >
      {children}
    </AudioAlertContext.Provider>
  )
}

export const useAudioAlertContext = () => {
  const context = useContext(AudioAlertContext)
  if (!context) {
    throw new Error(
      "useAudioAlertContext must be used within a AudioAlertContextProvider"
    )
  }
  return context
}

export default AudioAlertContextProvider
