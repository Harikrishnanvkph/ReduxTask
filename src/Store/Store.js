import {configureStore} from '@reduxjs/toolkit'
import storeReducer from './Slicer'

export const myStore = configureStore({

    reducer: {
        storeLM : storeReducer
    }

})
