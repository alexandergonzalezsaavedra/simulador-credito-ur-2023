import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    res_form_nombreUsuario:"",
    res_form_escuelaFacultad: "",
    res_form_tipo: "",
    res_form_programa: "",
    res_form_costoSemestre:0,
    res_form_mesesCredito: 0,
    res_form_cantidadCredito: 0,
    res_form_cantidadCreditoDos: 0,
}
export const dataFormularioSlice = createSlice({
  name: 'formulario',
  initialState:initialState,
  reducers: {
    dataFormulario: (state,action) => {
        state.res_form_nombreUsuario = action.payload.res_form_nombreUsuario
        state.res_form_escuelaFacultad = action.payload.res_form_escuelaFacultad
        state.res_form_tipo = action.payload.res_form_tipo
        state.res_form_programa = action.payload.res_form_programa
        state.res_form_costoSemestre = action.payload.res_form_costoSemestre
        state.res_form_mesesCredito = action.payload.res_form_mesesCredito
        state.res_form_cantidadCredito = action.payload.res_form_cantidadCredito
        state.res_form_cantidadCreditoDos = action.payload.res_form_cantidadCreditoDos
    }
  },
})
export const { dataFormulario } = dataFormularioSlice.actions
export default dataFormularioSlice.reducer