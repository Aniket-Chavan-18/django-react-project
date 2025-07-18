import { createSlice } from "@reduxjs/toolkit";


export const tokenSlice = createSlice({
    name: 'token',
    initialState: {
        token: localStorage.getItem("access_token") ?? false,
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
        }
    }
})

export const { setToken } = tokenSlice.actions

export default tokenSlice.reducer