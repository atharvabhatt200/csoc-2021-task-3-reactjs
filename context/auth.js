import { useEffect, useState, useContext, createContext } from 'react'
import { useCookies } from 'react-cookie'
import axios from '../utils/axios'
import { useRouter } from 'next/router'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const router = useRouter()
  const [profileName, setProfileName] = useState('')
  const [avatarImage, setAvatarImage] = useState('#')
  const [cookies, setCookies, removeCookies] = useCookies(['auth'])
  const [token, setTokenState] = useState(cookies.token);

  const setToken = (newToken) => {
    setTokenState(newToken);
    setCookies("token", newToken, { path: "/" });
  };
  const deleteToken = () => {
    setTokenState(null);
    removeCookies("token");
  };

  const logout = () => {
    deleteToken()
    router.push('/login')
  }

  const loginPage = () => {
    router.push('./login')
  }

  const homePage = () => {
    router.push('/')
  }
  
  const auth ={
    headers: {
        Authorization: "Token " + token
    },
  };

  useEffect(() => {
    if (token) {
      axios
        .get('auth/profile/', {
          headers: {
            Authorization: 'Token ' + token,
          },
        })
        .then((response) => {
          setAvatarImage(
            'https://ui-avatars.com/api/?name=' +
              response.data.name +
              '&background=fff&size=33&color=007bff'
          )
          setProfileName(response.data.name)
        })
        .catch((error) => {
          console.log('Some error occurred')
        })
    }
  }, [setAvatarImage, setProfileName, token])

  return (
    <AuthContext.Provider
      value={{
        loginPage,
        homePage,
        token,
        setToken,
        deleteToken,
        profileName,
        setProfileName,
        avatarImage,
        setAvatarImage,
        logout,
        auth,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}


