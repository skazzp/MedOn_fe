import { Dispatch } from "@reduxjs/toolkit";
import { logout, setToken } from "redux/features/userSlice/userSlice";

export const restoreAuth = () => async (dispatch: Dispatch) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
            return;
        }
        dispatch(setToken(token));
    } catch (error) {
        dispatch(logout());
    }
};