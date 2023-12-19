import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  res_cod_utm: 0,
  res_escuelaFacultad: "",
  res_nombrePrograma: "",
  res_tipo: "",
  res_categoriaTipo: "",
  res_precio: "",
  res_rutaImagenMin: "",
  res_descricionCorta: "",
  res_url: "",
  res_snies: 0
}
export const counterSlice = createSlice({
  name: 'programa_seleccionado',
  initialState: initialState,
  reducers: {
    dataProgramaSeleccionado: (state, action) => {
      state.res_cod_utm = action.payload.res_cod_utm
      state.res_escuelaFacultad = action.payload.res_escuelaFacultad
      state.res_tipo = action.payload.res_tipo
      state.res_categoriaTipo = action.payload.res_categoriaTipo
      state.res_url = action.payload.res_url
      state.res_rutaImagenMin = action.payload.res_rutaImagenMin
      state.res_descricionCorta = action.payload.res_descricionCorta
      state.res_nombrePrograma = action.payload.res_nombrePrograma
      state.res_precio = action.payload.res_precio
      state.res_snies = action.payload.res_snies
    }
  },
})
export const { dataProgramaSeleccionado } = counterSlice.actions
export default counterSlice.reducer