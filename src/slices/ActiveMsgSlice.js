import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: null,
}

export const ActiveMsgSlice = createSlice({
  name: 'activeMsg',
  initialState,
  reducers: {
    ActiveChatUser: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { ActiveChatUser } = ActiveMsgSlice.actions

export default ActiveMsgSlice.reducer