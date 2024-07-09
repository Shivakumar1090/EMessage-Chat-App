import { Avatar, Button, Container, IconButton, Stack, Typography} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/frb_config";
import {  Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../redux/Slicers/userSlice";

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user)

    const handleLogout = async() => {
        await signOut(auth);
        localStorage.clear();
        dispatch(clearUser())
        navigate("/login")    
    }

    return ( 
        <Container sx={{borderBottom: '2px solid #F0F0F0', p:2,mb: 2, display: "flex", justifyContent: 'space-between'}}>
            <Stack alignItems="center" spacing={1} direction="row">
                {/* <img src={LogoImg} alt="" style={{width: '30px'}}/> */}
                <Typography variant="h6" fontWeight={700} >EMessage</Typography>

            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="body1">{user?.email}</Typography>
                {user && <Avatar src={user?.avatar} label="Shiva" sx={{width: '30px', height: '30px'}}/>}
                {user && <IconButton
                    onClick={handleLogout}
                >
                    <LogoutIcon color="secondary"/>
                </IconButton>}
                {!user && <Button variant="contained" component={Link} to='login'>Login</Button>}
            </Stack>
        </Container>
    );
}
 
export default Navbar;