import { Box } from "@mui/material";
import Message from "./message";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/frb_config";

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const data = useSelector(state => state.chat)
    
    useEffect(() => {
        const handleReadMessages = async() => {
            onSnapshot(doc(db, 'chats', data.chatId) , async(docSnapShot) => {
                docSnapShot.exists() && setMessages(docSnapShot.data().messages);
                // if(docSnapShot.exists()){
                //     const data = docSnapShot.data();
                //     const msgs = data.messages;
            
                //     // const updatedMsgs = await msgs.map((msg) => {
                //     //     if (msg.senderId !== currentUser.id && msg.status === 1) {
                //     //         return { ...msg, status: 2 };
                //     //     }
                //     //     return msg;
                //     // });
    
                //     // await updateDoc(chatDocRef, {
                //     //     messages: updatedMsgs,
                //     // });
    
                //     setMessages(msgs);
                // }
            })
        }

        handleReadMessages();
    }, [data.chatId]);

    
    
    return ( 
        <Box sx={container}>
            {messages.map(msg => (
                <Message message={msg} key={msg.id}/>
            ))}
        </Box>
    );
}

const container = {
    overflowY: 'scroll',
    "::-webkit-scrollbar": {
        width: '4px',
    },
    "::-webkit-scrollbar-track ": {
        background: "rgb(255,255,255,0)",
        borderRadius: '50px',
    },
    "::-webkit-scrollbar-thumb": {
        background: "rgb(0,0,0,0.2)",
    },
}
 
export default Messages;