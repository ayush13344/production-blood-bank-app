import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/API";
import { toast } from "react-toastify";

// User login
export const userLogin = createAsyncThunk(
    'auth/login',
    async ({ role, email, password }, { rejectWithValue }) => {
        try {
            const { data } = await API.post('/auth/login', { role, email, password });
            if (data.success) {
                localStorage.setItem('token', data.token);
                toast.success(data.message); // Use toast for better UX
                window.location.replace("/");
            }
            return data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

// User register
export const userRegister = createAsyncThunk(
    'auth/register',
    async ({ name, role, email, password, phone, organisationName, hospitalName, website, address }, { rejectWithValue }) => {
        try {
            const { data } = await API.post('/auth/register', { name, role, email, password, phone, organisationName, hospitalName, website, address });
            if (data?.success) {
                toast.success("User Registered successfully"); // Use toast instead of alert
                window.location.replace('/login');
            }
            return data; // Ensure the data is returned after successful registration
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

// Get current user
export const getCurrentuser = createAsyncThunk(
    'auth/getCurrentuser',
    async (_, { rejectWithValue }) => { // Correct destructuring
        try {
            const res = await API.get('/auth/current-user'); // Fix typo in the URL
            if (res?.data) {
                return res.data;
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);
