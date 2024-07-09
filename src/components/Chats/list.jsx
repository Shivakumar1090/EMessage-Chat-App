
import { InputBase, Stack, Typography } from "@mui/material";
import HomeContainer from "../_Common/home_container";
import ListCard from "./card";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "../../firebase/frb_config";
import SearchIcon from '@mui/icons-material/Search';

const ChatsList = () => {
    const currentUser = useSelector(state => state.user);

    const [users, setUsers] = useState([]);
    const [searchtext,setSearchText] = useState("");
    const q = query(
        collection(db, 'users'),
        where('id', '!=', currentUser.id), 
        orderBy('isonline', 'desc') 
    );
    useEffect(() => {
        

        onSnapshot(q, (snapshot) => {
            let users = [];
            snapshot.docs.forEach((doc) => {
                if(doc.data().id !== currentUser.id){
                    users.push({...doc.data() })
                }
            })
            setUsers(users);
        })
       
    },[currentUser.id, q]);

    const filteredUsers = users.filter((product) => {
        if (
          product.name.toLowerCase().includes(searchtext)
        ) {
          return product;
        }
    });

    // filteredUsers()
    

    return ( 
        <HomeContainer>
            <Typography fontWeight={700}>Messages</Typography>
            <InputBase 
                type="text"
                sx={searchStyle}
                placeholder="search"
                startAdornment={<SearchIcon color="secondary" sx={{opacity: 0.5}}/>}
                onChange={(e) => setSearchText(e.target.value)}
                value={searchtext}
                // onKeyDown={(e) => e.code === "Enter" && filteredUsers}
            />
            <Stack spacing={2} sx={list}>
                {filteredUsers?.map(chat => (
                    <ListCard key={chat.id} person={chat}/>
                ))}
            </Stack>
        </HomeContainer>
     );
}
 
const list = {
    overflowY: 'scroll',
    height: '80%',
    width: '100%',
    mt: 2,
    "::-webkit-scrollbar": {
        width: '4px',
    },
    "::-webkit-scrollbar-track ": {
        background: "rgb(255,255,255,0)",
        borderRadius: '50px',
    },
    "::-webkit-scrollbar-thumb": {
        background: "rgb(48, 70, 197,0.2)",
    },
}

const searchStyle = {
    background: '#F6F8FC',
    width: '100%',
    p: "5px",
    borderRadius: 50,
    mb: 2,
    mt: 1,
}

export default ChatsList;
