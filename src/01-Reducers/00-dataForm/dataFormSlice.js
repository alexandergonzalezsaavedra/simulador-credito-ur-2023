import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    res_form_nombreUsuario:"",
    res_form_escuelaFacultad: 0,
    res_form_tipo: "",
    res_form_programa: "",
    res_form_meses: "",
    res_form_cantidadCredito: "", 
}
export const counterSlice = createSlice({
  name: 'formulario',
  initialState:initialState,
  reducers: {
    dataFormulario: (state,action) => {
        state.res_form_nombreUsuario = action.payload.res_form_nombreUsuario
        state.res_form_escuelaFacultad = action.payload.res_form_escuelaFacultad
        state.res_form_tipo = action.payload.res_form_tipo
        state.res_form_programa = action.payload.res_form_programa
        state.res_form_meses = action.payload.res_form_meses
        state.res_form_cantidadCredito = action.payload.res_form_cantidadCredito
    }
  },
})
export const { dataFormulario } = counterSlice.actions
export default counterSlice.reducer