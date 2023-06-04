import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './Store'

export const useCustomDispatch: () => AppDispatch = useDispatch
export const useCustomSelector: TypedUseSelectorHook<RootState> = useSelector