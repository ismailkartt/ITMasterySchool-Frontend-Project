import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentOperation: null,
    currentRecord: null
}

export const miscSlice = createSlice({
    name: "misc",
    initialState,
    reducers:{
        setOperation: (state, action) => {
            state.currentOperation = action.payload;
        },
        setCurrentRecord: (state, action) => {
            state.currentRecord = action.payload;
        }
    }
})

export const { setOperation, setCurrentRecord } = miscSlice.actions;
export default miscSlice.reducer;