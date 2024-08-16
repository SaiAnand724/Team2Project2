import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react"

{/*Functionality: Handles user login (user or sponsor).
	Endpoints:
	POST /auth/login to log in a user.
	POST /sponsor/login to log in a sponsor.
	Functions:
    
	login(username, password): Submits login credentials and retrieves user or sponsor details.
*/}
export interface Auth {
	jwt: string,
	username: string,
	role: string
}

export interface AuthType {
	auth?: Auth,
	setAuth?: Dispatch<SetStateAction<Auth>>
}

export const AuthContext = createContext<AuthType>({});

export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
	const [auth, setAuth] = useState<Auth>({jwt:"",username:"",role:""})
	return <AuthContext.Provider value={{auth,setAuth}}>
		{children}
	</AuthContext.Provider>
}

export const useAuth = () => {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error("useAuth must be used within a AuthProvider")
	}
	return context;
}