import { useEffect, useState } from 'react'
import dataJson from '../00-Data/dataProgramas.json'

const FormModule = () => {

   // formato moneda pesos COP
   const formatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  })

  let infoProgramas = dataJson.ofertaAcademica
  
  let initialState = {valFormescuelaFacultad:"",valFormTipoCategoria:"", valFormCategoriaPosgrado: "",valFormProgramas: "", valFormPrecioPrograma: 5000, valFormFinanciar: 0, valFormFinanciarDos: 0}
  let [campos,setCampos] = useState(initialState)
  let {valFormescuelaFacultad, valFormTipoCategoria, valFormCategoriaPosgrado,valFormProgramas,valFormPrecioPrograma, valFormFinanciar, valFormFinanciarDos } = campos


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
  let filtroProgramas = infoProgramas.filter((programas) => {
    if(valFormTipoCategoria === "Pregrado"){
      return(
        programas.escuelaFacultad.includes(valFormescuelaFacultad)
        &&
        programas.tipo.includes(valFormTipoCategoria)
      )
    }else if(valFormTipoCategoria === "Posgrado"){
      return(
        programas.escuelaFacultad.includes(valFormescuelaFacultad)
        &&
        programas.tipo.includes(valFormTipoCategoria)
        &&
        programas.categoriaTipo.includes(valFormCategoriaPosgrado)
      )
    }
  })
  let opcionesProgramas = filtroProgramas.map((programa,iPrograma) => {
    let {nombre} = programa
    return(
      <option key={iPrograma} value={nombre}>{nombre}</option>
    )
  })

  // funciones camnbio
  const handleChange = (e) => {
    let {name,value,type} = e.target
    setCampos((a) => ({
      ...a,
      [name]:type === "range" ? document.getElementById("valFormFinanciarDos").value : value
    }))
  }

  useEffect(()=> {
    setCampos({valFormPrecioPrograma: 5000, valFormFinanciarDos: document.getElementById("valFormFinanciar").value})
  },[valFormFinanciar])

  useEffect(()=> {
    setCampos({valFormPrecioPrograma: 5000, valFormFinanciar: document.getElementById("valFormFinanciarDos").value})
  },[valFormFinanciarDos])


  return (
    <>
    <div>FormModule</div>
    <h3 className='text-warning text-center'>
        Simulador credito UR
    </h3>
    <hr />
    <form>
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

            if(opcionesProgramas.length <= 0 && valFormTipoCategoria === "Posgrado"){
              return (
                <h3 className='text-white'>
                  No encontramos coincidencias
                </h3>
              )
            }else if(opcionesProgramas.length > 0){
              return(
                <select
                  className='form-select mb-3'
                  name="valFormProgramas"
                  id="valFormProgramas"
                  value={valFormProgramas}
                  onChange={handleChange}>
                    <option value="">Seleccione Programa</option>
                    {opcionesProgramas}
                </select>
              )
            }
        })()
      }
      


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
    </form>
    </>
  )
}

export default FormModule