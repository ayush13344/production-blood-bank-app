import React, { useEffect } from "react";
import { useDispatch } from 'react-redux'; // Correct import for useDispatch
import API from '../../services/API';
import { getCurrentuser } from "../../redux/features/auth/authAction";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const dispatch = useDispatch();

    const getUser = async () => {
        try {
            const { data } = await API.get('/auth/current-user');
            if (data?.success) {
                dispatch(getCurrentuser(data.user)); // Dispatch user data
            }
        } catch (error) {
            localStorage.clear();
            console.log(error);
        }
    };

    useEffect(() => {
        getUser();
    }); // Add an empty dependency array to ensure the effect runs once on mount

    if (localStorage.getItem('token')) {
        return children;
    } else {
        return <Navigate to='/login' />;
    }
};

export default ProtectedRoute;
