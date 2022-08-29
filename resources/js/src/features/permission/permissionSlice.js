import { createSlice } from "@reduxjs/toolkit";
import apiClient from "../../config/apiClient";
const initialState = JSON.parse(localStorage.getItem('permissions'));

const permissionSlice = createSlice({
    name: 'permission',
    initialState,
    reducers: {
        refreshPermission: (state, action) => {
            return JSON.parse(localStorage.getItem('permissions'));
        },
    }
});

export const { refreshPermission } = permissionSlice.actions;
export default permissionSlice.reducer;

