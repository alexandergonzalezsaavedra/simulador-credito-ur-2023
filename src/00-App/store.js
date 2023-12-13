import { configureStore } from '@reduxjs/toolkit'
import ReducerFormData from "../01-Reducers/00-dataForm/dataFormSlice"
import ReducerDataProgram from "../01-Reducers/01-responseData/dataResponseSlice"
export const store = configureStore({
  reducer: {
    dataForm: ReducerFormData,
    dataPrograma: ReducerDataProgram
  },
})