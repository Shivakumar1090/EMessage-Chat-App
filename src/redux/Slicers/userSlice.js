
import { createSlice } from '@reduxjs/toolkit'

const initialState = JSON.parse(localStorage.getItem('user')) || null;

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state,action) => {
            const userData = action.payload
            localStorage.setItem('user', JSON.stringify(userData));
            return action.payload;
        },
        clearUser: () => {
            return null;
        }
    },
})

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer
