import {configureStore} from '@reduxjs/toolkit'
import userReducer from './Reducer/userDataSlice'


export const Store = configureStore({
    reducer:{
        users:userReducer
    }
})

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch