import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    open: localStorage.getItem('drawer') === 'true' ? true : false,
};
const drawerSlice = createSlice({
    name: 'drawer',
    initialState,
    reducers: {
        setDrawer: (state, action) => {
            localStorage.setItem('drawer', JSON.stringify(action.payload.open));
            return {
                ...state,
                open: action.payload.open
            };
        },
    }
});

export const { setDrawer} = drawerSlice.actions;
export default drawerSlice.reducer;
