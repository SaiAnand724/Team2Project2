import { useAuth } from "./AuthProvider"

{/*Functionality: Handles user login (user or sponsor).
o	Endpoints:
	POST /auth/login to log in a user.
	POST /sponsor/login to log in a sponsor.
o	Functions:

	login(username, password): Submits login credentials and retrieves user or sponsor details.
*/}

export const LoginForm: React.FC = () => {
    const {auth, setAuth} = useAuth()

    return <h1>placeholder</h1>
}