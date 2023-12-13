import { useEffect, useState } from 'react'
import dataJson from '../00-Data/dataProgramas.json'
import { useDispatch,useSelector } from 'react-redux'
import dataFormulario from "../../01-Reducers/00-dataForm/dataFormSlice"
const FormModule = () => {

  let dispatchForm = useDispatch()

  let {res_form_cantidadCredito, res_form_cantidadCreditoDos} = useSelector(state => state.dataForm)

  // formato moneda pesos COP
  //  const formatter = new Intl.NumberFormat('es-CO', {
  //   style: 'currency',
  //   currency: 'COP',
  //   minimumFractionDigits: 0
  // })

  console.log(res_form_cantidadCredito)
  console.log(res_form_cantidadCreditoDos)

  let infoProgramas = dataJson.ofertaAcademica
  
  let initialState = {
    valFormescuelaFacultad:"",
    valFormTipoCategoria:"", 
    valFormCategoriaPosgrado: "",
    valFormProgramas: "", 
    valFormPrecioPrograma: 5000, 
    valFormFinanciar: 0, 
    valFormFinanciarDos: 0
  }
  let [campos,setCampos] = useState(initialState)
  let { 
    valFormescuelaFacultad, 
    valFormTipoCategoria, 
    valFormCategoriaPosgrado,
    valFormProgramas,
    valFormPrecioPrograma, 
    valFormFinanciar, 
    valFormFinanciarDos 
  } = campos

  // Extraer escuelas y facultades
  let listaEscuelasFacultades = infoProgramas.filter((data, index, j) =>
    index === j.findIndex((t) => (t.index === data.index && t.escuelaFacultad === data.escuelaFacultad))
  )
  let infoListaEscuelaFacultades = listaEscuelasFacultades.map((ef) =>{
      return ef.escuelaFacultad
  })
  let ordenarEscuelasFacultades = infoListaEscuelaFacultades.sort()

  // Extraer tipo
  let listaTipoCategoria = infoProgramas.filter((data, index, j) =>
    index === j.findIndex((t) => (t.index === data.index && t.tipo === data.tipo))
  )
  let infoListaTipoCategoria = listaTipoCategoria.map((ef) =>{
      return ef.tipo
  })
  let ordenarTipoCategoria = infoListaTipoCategoria

  // Categorias posgrado
  let categoriaPosgrado = ["Especialización","Maestría","Doctorado"].sort()

  // Extraer Programas segun la facultad, Tipo pre o pos y categoria pos elegida

  let dataProgramas = []
  if(valFormTipoCategoria === "Pregrado"){
    dataProgramas = infoProgramas.filter((programas) => {
      return(
        programas.escuelaFacultad.includes(valFormescuelaFacultad)
        &&
        programas.tipo.includes(valFormTipoCategoria)
      )
    })
  }
  if(valFormTipoCategoria === "Posgrado"){
    dataProgramas = infoProgramas.filter((programas) => {
      return(
        programas.escuelaFacultad.includes(valFormescuelaFacultad)
        &&
        programas.tipo.includes(valFormTipoCategoria)
        &&
        programas.categoriaTipo.includes(valFormCategoriaPosgrado)
      )
    })
  }

  // funciones camnbios formulario
  const handleChange = (e) => {
    e.preventDefault()
    let {name,value,type} = e.target
    setCampos((a) => ({
      ...a,
      [name]:type === "range" ? document.getElementById("valFormFinanciarDos").value : value
    }))
  }

  useEffect(()=> {
    if(valFormFinanciar !== valFormFinanciarDos){
      document.getElementById("valFormFinanciar").value = valFormFinanciarDos
    }
    if(valFormFinanciarDos !== valFormFinanciar){
      document.getElementById("valFormFinanciarDos").value = valFormFinanciar
    }
  },[valFormFinanciar,valFormFinanciarDos])


  // useEffect(()=> {
  //   enviarReducerUno()
  // },[valFormFinanciar])

  // useEffect(()=> {
  //   enviarReducerDos()
  // },[valFormFinanciarDos])

  // let datoUno = document.getElementById("valFormFinanciar")
  // let datoDos = document.getElementById("valFormFinanciarDos")

  // const enviarReducerUno = () => {
  //   dispatchForm(dataFormulario({
  //     res_form_cantidadCredito: datoUno.value,
  //     res_form_cantidadCreditoDos: datoUno.value,
  //   }))
  // }
  // const enviarReducerDos = () => {
  //   dispatchForm(dataFormulario({
  //     res_form_cantidadCredito: datoDos.value,
  //     res_form_cantidadCreditoDos: datoDos.value,
  //   }))
  // }


  const handleSubmitData = (e) => {
    e.preventDefault()
    console.log(valFormFinanciar)
    console.log(valFormFinanciarDos)
    if(valFormFinanciar !== valFormFinanciarDos){
      return(
        dispatchForm(dataFormulario({
          res_form_cantidadCredito: document.getElementById("valFormFinanciar").value,
          res_form_cantidadCreditoDos: document.getElementById("valFormFinanciar").value,
        }))
      )
    }else if(valFormFinanciarDos !== valFormFinanciar){
      return(
        dispatchForm(dataFormulario({
          res_form_cantidadCredito: document.getElementById("valFormFinanciar").value,
          res_form_cantidadCreditoDos: document.getElementById("valFormFinanciar").value,
        }))
      )
    }
    
  }

  return (
    <>
      <h3 className='text-warning text-center'>
          Simulador credito UR
      </h3>
      <hr />
      <form onSubmit={handleSubmitData}>
        <select 
          className='form-select mb-3'
          name="valFormescuelaFacultad"
          id="valFormescuelaFacultad"
          value={valFormescuelaFacultad}
          onChange={handleChange}>
            <option value="">Seleccione una Escuela o Facultad</option>
            {
              ordenarEscuelasFacultades.map((ef,i) => {
                return(
                  <option key={i} value={ef}>{ef}</option>
                )
              })
            }
        </select>
        <select 
          className='form-select mb-3'
          name="valFormTipoCategoria"
          id="valFormTipoCategoria"
          value={valFormTipoCategoria}
          onChange={handleChange}>
            <option value="">Seleccione categoría</option>
            {
              ordenarTipoCategoria.map((et,it) => {
                return(
                  <option key={it} value={et}>{et}</option>
                )
              })
            }
        </select>
        {
          (()=>{
          if(valFormTipoCategoria === "Posgrado"){
            return(
              <select 
                className='form-select mb-3'
                name="valFormCategoriaPosgrado"
                id="valFormCategoriaPosgrado"
                value={valFormCategoriaPosgrado}
                onChange={handleChange}>
                  <option value="">Seleccione tipo</option>
                  {
                    categoriaPosgrado.map((cp,icp) => {
                      return(
                        <option key={icp} value={cp}>{cp}</option>
                      )
                    })
                  }
              </select>
            )
          }else{
            return
          }
          })()
        }
        {
          (()=>{
            if(dataProgramas.length > 0){
              return(
                <select
                  className='form-select mb-3'
                  name="valFormProgramas"
                  id="valFormProgramas"
                  value={valFormProgramas}
                  onChange={handleChange}>
                    <option value="">Seleccione Programa</option>
                    {
                      dataProgramas.map((p,pi) => {
                        return(
                          <option key={pi} value={p.nombre}>{p.nombre}</option>
                        )
                      })
                    }
                </select>
              )
            }
          })()
        }
        {
          (()=>{
            if(!valFormProgramas){
              return
            }else{
              return(
                <>
                  <input 
                    className='form-control'
                    type='text'
                    name="valFormPrecioPrograma"
                    id="valFormPrecioPrograma"
                    value={valFormPrecioPrograma}
                    onChange={handleChange}
                  />
                  <input
                    className="form-control"
                    type="number"
                    name="valFormFinanciar"
                    id="valFormFinanciar"
                    value={valFormFinanciar}
                    onChange={handleChange}
                  />
                  <br />
                  <input
                    className="w-100"
                    type="range"
                    name="valFormFinanciarDos"
                    id="valFormFinanciarDos"
                    min="0"
                    max={valFormPrecioPrograma}
                    value={valFormFinanciarDos}
                    onChange={handleChange}
                  />
                </>
              )
            } 
          })()
        }     
        <button className='btn btn-outline-warning mt-5 rounded-0'>
          Calcular
        </button>
      </form>
    </>
  )
}

export default FormModule