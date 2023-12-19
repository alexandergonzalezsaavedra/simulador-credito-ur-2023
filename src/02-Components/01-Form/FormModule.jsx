import { useState } from 'react'
import dataJson from '../00-Data/dataProgramas.json'
import { useDispatch, useSelector } from 'react-redux'
import { dataFormulario } from "../../01-Reducers/00-dataForm/dataFormSlice"

const FormModule = () => {


  let { res_form_cantidadCredito } = useSelector(state => state.dataForm)
  let dispatchForm = useDispatch()
  let infoProgramas = dataJson.ofertaAcademica
  //formato moneda pesos COP
  const formatter = new Intl.NumberFormat('es-CO', {
    //style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  })
  let initialState = {
    valFormescuelaFacultad: "",
    valFormTipoCategoria: "",
    valFormCategoriaPosgrado: "",
    valFormProgramas: "",
    valFormMesesCredito: "",
    valFormPrecioPrograma: 0,
    valFormFinanciar: 0,
    valFormFinanciarDos: 0
  }
  let [campos, setCampos] = useState(initialState)
  let {
    valFormescuelaFacultad,
    valFormTipoCategoria,
    valFormCategoriaPosgrado,
    valFormProgramas,
    valFormMesesCredito,
    valFormPrecioPrograma,
    valFormFinanciar,
    valFormFinanciarDos
  } = campos
  // Limpiar Campos simulador
  const limpiarSimulador = () => {
    setCampos({
      valFormescuelaFacultad: "",
      valFormTipoCategoria: "",
      valFormCategoriaPosgrado: "",
      valFormProgramas: "",
      valFormMesesCredito: "",
      valFormPrecioPrograma: 0,
      valFormFinanciar: 0,
      valFormFinanciarDos: 0
    })
  }
  // Extraer escuelas y facultades
  let listaEscuelasFacultades = infoProgramas.filter((data, index, j) =>
    index === j.findIndex((t) => (t.index === data.index && t.escuelaFacultad === data.escuelaFacultad))
  )
  let infoListaEscuelaFacultades = listaEscuelasFacultades.map((ef) => {
    return ef.escuelaFacultad
  })
  let ordenarEscuelasFacultades = infoListaEscuelaFacultades.sort()
  // Extraer tipo
  let listaTipoCategoria = infoProgramas.filter((data, index, j) =>
    index === j.findIndex((t) => (t.index === data.index && t.tipo === data.tipo))
  )
  let infoListaTipoCategoria = listaTipoCategoria.map((ef) => {
    return ef.tipo
  })
  let ordenarTipoCategoria = infoListaTipoCategoria
  // Categorias posgrado
  let categoriaPosgrado = ["Especialización", "Maestría", "Doctorado"].sort()
  // Extraer Programas segun la facultad, Tipo pre o pos y categoria pos elegida
  let dataProgramas = []
  if (valFormTipoCategoria === "Pregrado") {
    dataProgramas = infoProgramas.filter((programas) => {
      return (
        programas.escuelaFacultad.includes(valFormescuelaFacultad)
        &&
        programas.tipo.includes(valFormTipoCategoria)
      )
    })
  }
  if (valFormTipoCategoria === "Posgrado") {
    dataProgramas = infoProgramas.filter((programas) => {
      return (
        programas.escuelaFacultad.includes(valFormescuelaFacultad)
        &&
        programas.tipo.includes(valFormTipoCategoria)
        &&
        programas.categoriaTipo.includes(valFormCategoriaPosgrado)
      )
    })
  }
  // Extraer precio programa
  const precioPrograma = infoProgramas.filter((dato) => {
    return (
      dato.nombre === valFormProgramas
    )
  })
  let datoPrecio = precioPrograma.map(item => {
    return item.precio
  })
  valFormPrecioPrograma = parseInt(datoPrecio[0])
  // Evento camnbios en el formulario
  const handleChange = (e) => {
    e.preventDefault()
    let { name, value, type, checked } = e.target
    setCampos((a) => ({
      ...a,
      [name]: type === "checkbox" ? checked : value
    }))
    if (e.target.matches("#valFormFinanciar")) {
      if (valFormFinanciar < valFormFinanciarDos || valFormFinanciar > valFormFinanciarDos) {
        document.getElementById("valFormFinanciarDos").value = document.getElementById("valFormFinanciar").value
        setCampos({
          valFormescuelaFacultad: valFormescuelaFacultad,
          valFormTipoCategoria: valFormTipoCategoria,
          valFormCategoriaPosgrado: valFormCategoriaPosgrado,
          valFormProgramas: valFormProgramas,
          valFormMesesCredito: valFormMesesCredito,
          valFormPrecioPrograma: valFormPrecioPrograma,
          valFormFinanciar: document.getElementById("valFormFinanciar").value,
          valFormFinanciarDos: document.getElementById("valFormFinanciar").value
        })
        dispatchForm(dataFormulario({
          res_form_nombreUsuario: "",
          res_form_escuelaFacultad: valFormescuelaFacultad,
          res_form_tipo: valFormTipoCategoria,
          res_form_programa: valFormProgramas,
          res_form_costoSemestre: 0,
          res_form_mesesCredito: 0,
          res_form_cantidadCredito: document.getElementById("valFormFinanciar").value,
          res_form_cantidadCreditoDos: document.getElementById("valFormFinanciar").value
        }))
      }
    }
    if (e.target.matches("#valFormFinanciarDos")) {
      if (valFormFinanciarDos < valFormFinanciar || valFormFinanciarDos > valFormFinanciar) {
        document.getElementById("valFormFinanciar").value = document.getElementById("valFormFinanciarDos").value
        setCampos({
          valFormescuelaFacultad: valFormescuelaFacultad,
          valFormTipoCategoria: valFormTipoCategoria,
          valFormCategoriaPosgrado: valFormCategoriaPosgrado,
          valFormProgramas: valFormProgramas,
          valFormMesesCredito: valFormMesesCredito,
          valFormPrecioPrograma: valFormPrecioPrograma,
          valFormFinanciar: document.getElementById("valFormFinanciarDos").value,
          valFormFinanciarDos: document.getElementById("valFormFinanciarDos").value
        })
        dispatchForm(dataFormulario({
          res_form_nombreUsuario: "",
          res_form_escuelaFacultad: valFormescuelaFacultad,
          res_form_tipo: valFormTipoCategoria,
          res_form_programa: valFormProgramas,
          res_form_costoSemestre: 0,
          res_form_mesesCredito: 0,
          res_form_cantidadCredito: document.getElementById("valFormFinanciarDos").value,
          res_form_cantidadCreditoDos: document.getElementById("valFormFinanciarDos").value
        }))
      }
    }
  }
  let puntuacion =
    valFormFinanciar.length === 1 ? `un` :
      valFormFinanciar.length === 2 ? `dos` :
        valFormFinanciar.length === 3 ? `tres` :
          valFormFinanciar.length === 4 ? `cuatro` :
            valFormFinanciar.length === 5 ? `cinco` :
              valFormFinanciar.length === 6 ? `seis` :
                valFormFinanciar.length === 7 ? `siete` :
                  valFormFinanciar.length === 8 ? `ocho` : ""
  // Función de envio
  const handleSubmitData = (e) => {
    e.preventDefault()
  }
  return (
    <>
      <h3 className='text-center'>
        <em className='text-white'>Simulador crédito</em> <strong className='text-danger'>UR</strong>
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
            ordenarEscuelasFacultades.map((ef, i) => {
              return (
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
            ordenarTipoCategoria.map((et, it) => {
              return (
                <option key={it} value={et}>{et}</option>
              )
            })
          }
        </select>
        {
          (() => {
            if (valFormTipoCategoria === "Posgrado") {
              return (
                <select
                  className='form-select mb-3'
                  name="valFormCategoriaPosgrado"
                  id="valFormCategoriaPosgrado"
                  value={valFormCategoriaPosgrado}
                  onChange={handleChange}>
                  <option value="">Seleccione tipo</option>
                  {
                    categoriaPosgrado.map((cp, icp) => {
                      return (
                        <option key={icp} value={cp}>{cp}</option>
                      )
                    })
                  }
                </select>
              )
            } else {
              return
            }
          })()
        }
        {
          (() => {
            if (dataProgramas.length > 0) {
              return (
                <select
                  className='form-select mb-3'
                  name="valFormProgramas"
                  id="valFormProgramas"
                  value={valFormProgramas}
                  onChange={handleChange}>
                  <option value="">Seleccione Programa</option>
                  {
                    dataProgramas.map((p, pi) => {
                      return (
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
          (() => {
            if (!valFormProgramas) {
              return
            } else {
              return (
                <>
                  <label htmlFor="valFormMesesCredito" className='text-white'>Tiempo del crédito <small>(meses)</small></label>
                  <select
                    className='form-select mb-3'
                    name="valFormMesesCredito"
                    id="valFormMesesCredito"
                    value={valFormMesesCredito}
                    onChange={handleChange}
                  >
                    <option value="" defaultValue>Seleccione tiempo</option>
                    <option value="1 Mes">1 Mes</option>
                    <option value="2 Meses">2 Meses</option>
                    <option value="3 Meses">3 Meses</option>
                    <option value="4 Meses">4 Meses</option>
                    <option value="5 Meses">5 Meses</option>
                    <option value="6 Meses">6 Meses</option>
                  </select>
                </>
              )
            }
          })()
        }
        {
          (() => {
            if (valFormMesesCredito === "") {
              return
            } else {
              return (
                <>
                  <input
                    className='form-control'
                    type='text'
                    name="valFormPrecioPrograma"
                    id="valFormPrecioPrograma"
                    value={valFormPrecioPrograma}
                    onChange={handleChange}
                    hidden
                  />
                  <label className='mt-3 text-white' htmlFor="valFormFinanciar">
                    Cantidad a solicitar
                  </label>
                  <input
                    maxLength={8}
                    className="form-control"
                    type="text"
                    name="valFormFinanciar"
                    id="valFormFinanciar"
                    value={valFormFinanciar}
                    onChange={handleChange}
                  />
                  <div className="signoPesos">
                    $
                  </div>
                  <div className={`puntuacionMiles ${puntuacion}`}>
                    ,
                  </div>
                  <div className={`puntuacionMillones ${puntuacion}`}>
                    ,
                  </div>
                  <br />
                  <input
                    className="w-100 mb-3 drag__bar"
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
        <hr />
        <div className="row mx-0">
          <div className="col-sm-12">
            <button
              className='btn btn-warning mt-3 rounded-0 w-100'>
              Calcular
            </button>
          </div>
        </div>
      </form>
      <div className="row d-flex justify-content-end mx-0 mt-5">
        <div className="col-sm-3">
          <button
            className='btn btn-outline-secondary w-100 rounded-0'
            onClick={limpiarSimulador}
          >
            Limpiar
          </button>
        </div>
      </div>
    </>
  )
}
export default FormModule