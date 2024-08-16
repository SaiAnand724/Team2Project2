import { useTheme, useMediaQuery, Stack, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';


{/*Functionality: Root page to allow a user to select what type of user they
	Endpoints:
	Not associated with any endpoints
	Functions:
*/}

export const AuthSelector = () => {
	const navigate = useNavigate();
	const theme = useTheme()
	const breakBool = useMediaQuery(theme.breakpoints.down("lg"))
	const direction = breakBool ? "column" : "row"
	

    return <></>
}