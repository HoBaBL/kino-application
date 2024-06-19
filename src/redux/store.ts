import { configureStore } from '@reduxjs/toolkit'
import cinema from './slice/cinema'

export const store = configureStore({
    reducer: { cinema },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch