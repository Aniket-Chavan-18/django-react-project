import { createSlice } from "@reduxjs/toolkit";


export const switchTab = createSlice({
    name: 'switchTab',
    initialState: {
        activeTab: 'problem'
    },
    reducers: {
        setActiveTab: (state, action) => {
            state.activeTab = action.payload
        }
    }
})

export const { setActiveTab } = switchTab.actions

export default switchTab.reducer