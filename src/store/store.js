import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../slices/authSlice'
import ActiveMsgSlice from '../slices/ActiveMsgSlice'

export const store = configureStore({
  reducer: {
    LoggedInUserData: authSlice,
    ActiveChat: ActiveMsgSlice,
  },
})