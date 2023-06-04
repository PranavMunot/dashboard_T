import {createSlice,PayloadAction} from '@reduxjs/toolkit'


type user={
    id:string,
    firstName:string,
    lastName:string,
    status:boolean
}

type userDataArray={
    userData:user[]
}

const initialState:userDataArray = {
    userData:[]
}

const userDataSlice = createSlice({
    name:'userDataReducer',
    initialState,
    reducers:{
        addUser:function(state,action:PayloadAction<user>){
            state.userData.push(action.payload)
        },
        deleteUser:function(state,action:PayloadAction<string>){
            state.userData = state.userData.filter((user)=>(action.payload!==user.id)) 
        },
        editUser:function(state,action:PayloadAction<user>){
           state.userData = state.userData.map (user=>{
            if(user.id===action.payload.id){
                user = action.payload
            }
            return user
           })
        }
    }
})

export const {addUser,deleteUser,editUser} = userDataSlice.actions
export default userDataSlice.reducer