import { useTheme } from "@emotion/react";
import { Button, Container } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useTheme as useAppTheme } from '../UtilityComponents/ThemeProvider';
import ThemeSwitcher from "../UtilityComponents/ThemeSwitcher";


{/*Functionality: Handles user registration.
o	Endpoints:
	POST /create to create a new user.
	POST /sponsor to create a new sponsor.

o	Functions:
	registerUser(username, password, name, role): Registers a new user.
	registerSponsor(username, password, category, name, budget): Registers a new sponsor.
 */}


 export const RegisterUserForm: React.FC = () => {
    const navigate = useNavigate();

    return <Container>
        <h1>alright</h1>
        <Button variant="contained" onClick={() => {navigate("/")}}>hello world</Button>
    </Container>
 }