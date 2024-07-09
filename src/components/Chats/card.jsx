
import { Avatar, Box, Container, Divider, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { changeUser } from "../../redux/Slicers/chatSlice";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/frb_config";
import { toast } from "react-toastify";

const ListCard = ({person}) => {
    const currentUser = useSelector(state => state.user);
  
    const dispatch = useDispatch();

    const handleSelect = async () => {
        const combinedId = 
            currentUser.id > person.id
                ? currentUser.id + "+" + person.id
                : person.id + "+" + currentUser.id;
        try {
            const res = await getDoc(doc(db, "chats", combinedId));
    
            if (!res.exists()) {
                //create a chat in chats collection
                await setDoc(doc(db, "chats", combinedId), { messages: [] });
        
                //create user chats
                // await updateDoc(doc(db, "userChats", currentUser.id), {
                //     [combinedId + ".userInfo"]: person,
                //     [combinedId + ".date"]: serverTimestamp(),
                // });
        
                // await updateDoc(doc(db, "userChats", person.id), {
                //     [combinedId + ".userInfo"]: currentUser,
                //     [combinedId + ".date"]: serverTimestamp(),
                // });
            }
        } catch (err) {
            toast.err("Something went wrong");
        }

        dispatch(changeUser(person))
    };

    return ( 
        <Container sx={{cursor: 'pointer'}}  onClick={handleSelect}>
            <Stack direction="row" spacing={2} pb={2} alignItems="center">
                <Avatar src={person?.avatar} />
                <Box width="100%">
                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography variant="body1" fontWeight={600} textTransform='capitalize'>{person?.name}</Typography>
                        {/* <Typography variant="caption">11:54pm</Typography> */}
                        {person?.isonline&&<Typography variant="caption" sx={{color: 'darkgreen',fontWeight: 500}}>online</Typography>}
                    </Box>

                
                </Box>
            </Stack>
            <Divider />
        </Container>
     );
}
 
export default ListCard;
