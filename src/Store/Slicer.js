import {createSlice} from "@reduxjs/toolkit";

const initialState  = {
    apiState : {},
    ready : false,
    cartItemCount : 0,
    objectIDs : []
};

const storeSlicer = createSlice({
    name : "apiSlice",
    initialState,
    reducers : {
        insertAPI(state,action){
            state.apiState = action.payload
        },
        updateReady(state,action){
            state.ready = action.payload
        },
        cartAdd(state,action){
            state.cartItemCount = state.cartItemCount + action.payload
        },
        cartRemove(state,action){
            state.cartItemCount = (state.cartItemCount - action.payload) > -1 ?
            state.cartItemCount - action.payload : 0;
        },
        cartItemsAdd(state,action){
            let found = false;
            for (let i = 0; i < state.objectIDs.length; i++) {
                if (state.objectIDs[i].id === action.payload.index) {
                    state.objectIDs[i].count += action.payload.count;
                    found = true;
                    break;
                }
            }
            if (!found) {
                state.objectIDs.push({
                    id: String(action.payload.index),
                    count: action.payload.count
                });
            }
        },
        cartItemsRemove(state,action){
            const slate = state.objectIDs;
            for (let i = 0; i < slate.length; i++) {
                if (slate[i].id == String(action.payload)) {
                    if(slate[i].count == 1){
                        slate.splice(i,1);
                    }else if(slate[i].count > 1){
                        slate[i].count -= 1
                    }
                }
            }
        },
        reset(state){
            state.cartItemCount = 0,
            state.objectIDs = []
        }
    }
})

export const {insertAPI, updateReady, cartAdd, cartRemove, cartItemsAdd, cartItemsRemove, reset} = storeSlicer.actions;
export default storeSlicer.reducer;
