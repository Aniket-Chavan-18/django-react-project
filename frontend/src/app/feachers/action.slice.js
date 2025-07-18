import { createSlice } from "@reduxjs/toolkit";


export const actionSlice = createSlice({
    name: 'actions',
    initialState: {
        isSubmit: false,
        loading: false
    },
    reducers: {
        setIsSubmit: (state, action) => {
            state.isSubmit = action.payload ?? true
        },
        setLoading2: (state, action) => {
            state.loading = action.payload
        }
    }
})

export const { setIsSubmit, setLoading2 } = actionSlice.actions;
export default actionSlice.reducer;