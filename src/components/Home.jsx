import { Container, Grid, } from "@mui/material";
import Chatbox from "./Chat/chatbox";
import ChatsList from "./Chats/list";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebase/frb_config";

const Home = () => {
    const currentUser = useSelector(state => state.user);
    
    useEffect(() => {
        const handleDeliveredMessages = async() => {
            onSnapshot(collection(db,'chats'), (snapshot) => {
                
                snapshot?.docs?.forEach(async (chat_doc) => {
                    const combinedId = chat_doc.id;
                    const [id1 , id2] = combinedId.split("+");
    
                    if(id1 === currentUser.id || id2 === currentUser.id){
                        const messages = chat_doc.data().messages;
    
                        const chatRef = doc(db, 'chats', combinedId);
    
                        const updatedmessages = messages.map((msg) => {
                            if (msg.senderId !== currentUser.id && msg.status === 0) {
                                return { ...msg, status: 1 };
                            }
                            return msg;
                        });
    
                        await updateDoc(chatRef, {
                            messages: updatedmessages,
                        });
                    }
                })
            })
        }

        handleDeliveredMessages();

        const setOnline = async () => {
            if (currentUser) {
                await updateDoc(doc(db, 'users', currentUser.id), {
                    isonline: true
                });
            }
        };

        const setOffline = async () => {
            if (currentUser) {
                await updateDoc(doc(db, 'users', currentUser.id), {
                    isonline: false
                });
            }
        };

        setOnline(); // Set online when component mounts or currentUser changes

        window.addEventListener('beforeunload', setOffline); // Set offline when user leaves or closes the tab

        return () => {
            setOffline(); // Clean up: Set offline when component unmounts
            window.removeEventListener('beforeunload', setOffline); // Remove event listener
        };
    }, [currentUser]);
    
    return ( 
        <Container sx={{}} elevation={4}>
            <Grid 
                container
                columnSpacing={2}
                columns={12}
                justifyContent="space-between"
                alignItems="stretch"
            >
                <Grid item md={4}>
                    <ChatsList />
                </Grid>
                <Grid item md={7.5} sx={{display: 'flex'}}>
                    <Chatbox />
                </Grid>
            </Grid>
        </Container>
    );
}
 
export default Home;