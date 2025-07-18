import { createSlice } from '@reduxjs/toolkit'

export const ResultSlice = createSlice({
    name: 'SubResult',
    initialState: {
        subResult: {}
    },
    reducers: {
        setSubResult: (state, action) => {
            state.subResult = action.payload
        },
    },
});

export const { setSubResult } = ResultSlice.actions
export default ResultSlice.reducer