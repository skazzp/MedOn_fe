import { Dispatch } from "@reduxjs/toolkit";
import { logout, setUser } from "redux/features/userSlice/authSlice";

export const restoreAuth = () => async (dispatch: Dispatch) => {
    try {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        if (!token || !user) {
            dispatch(logout());
            return;
        }
        dispatch(setUser({ user: JSON.parse(user), token }));
    } catch (error) {
        dispatch(logout());
    }
};