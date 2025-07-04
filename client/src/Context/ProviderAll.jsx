import { AuthProvider } from "./AuthContext"
import { LevelLabelProvider } from "./LevelLabelContext"
import { LevelTresholdProvider } from "./LevelTresholdContext"
import { UserProvider } from "./UserContext"


const ProviderAll = ({children}) => {
  return (
    <AuthProvider>
      <UserProvider>
        <LevelLabelProvider>
         <LevelTresholdProvider>
            {children}
         </LevelTresholdProvider>
        </LevelLabelProvider>
      </UserProvider>
    </AuthProvider>
  )
}

export default ProviderAll
