import { createSlice } from "@reduxjs/toolkit";
const initialState = JSON.parse(localStorage.getItem("user")) || null;
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {

            let newUser = {
                ...state,
                ...action.payload
            }

            localStorage.setItem('user', JSON.stringify(newUser));
            return newUser;
        },
        logout: (state,action) => {
            localStorage.clear();
            return initialState;
        }
    }
});

export const { setUser,logout } = userSlice.actions;
export default userSlice.reducer;

