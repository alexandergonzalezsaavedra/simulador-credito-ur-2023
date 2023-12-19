import Swal from 'sweetalert2'
import { useState } from 'react'
import dataJson from '../00-Data/dataProgramas.json'
import { useDispatch } from 'react-redux'
import { dataFormulario } from "../../01-Reducers/00-dataForm/dataFormSlice"
import { dataProgramaSeleccionado } from "../../01-Reducers/01-responseData/dataResponseSlice"
const FormModule = () => {
  // formato moneda pesos COP
  const formatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  })
  let dispatchForm = useDispatch()
  let dispatchDataProgram = useDispatch()
  let infoProgramas = dataJson.ofertaAcademica
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
    dispatchDataProgram(dataProgramaSeleccionado({
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
    }))
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
      if (valFormFinanciar < valFormFinanciarDos || valFormFinanciar > valFormFinanciarDos || valFormFinanciar !== valFormFinanciarDos) {
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
      }
    }
    if (e.target.matches("#valFormFinanciarDos")) {
      if (valFormFinanciarDos < valFormFinanciar || valFormFinanciarDos > valFormFinanciar || valFormFinanciarDos !== valFormFinanciar) {
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
      }
    }
    let programaSeleccionado = dataProgramas[0]
    if (programaSeleccionado) {
      let {
        cod_utm,
        escuelaFacultad,
        nombre,
        tipo,
        categoriaTipo,
        rutaImagenMin,
        precio,
        url,
        descricionCorta,
        snies
      } = programaSeleccionado
      dispatchDataProgram(dataProgramaSeleccionado({
        res_cod_utm: cod_utm,
        res_escuelaFacultad: escuelaFacultad,
        res_nombrePrograma: nombre,
        res_tipo: tipo,
        res_categoriaTipo: categoriaTipo,
        res_rutaImagenMin: rutaImagenMin,
        res_precio: precio,
        res_descricionCorta: descricionCorta,
        res_url: url,
        res_snies: snies
      }))
    }
  }
  let puntuacion =
    valFormFinanciar === 0 ? "" :
      valFormFinanciar.length === 1 ? `un` :
        valFormFinanciar.length === 2 ? `dos` :
          valFormFinanciar.length === 3 ? `tres` :
            valFormFinanciar.length === 4 ? `cuatro` :
              valFormFinanciar.length === 5 ? `cinco` :
                valFormFinanciar.length === 6 ? `seis` :
                  valFormFinanciar.length === 7 ? `siete` :
                    valFormFinanciar.length === 8 ? `ocho` : ""
  const limpiarCamposCredito = () => {
    document.getElementById("valFormFinanciar").value = 0
    document.getElementById("valFormFinanciarDos").value = 0
    setCampos({
      valFormescuelaFacultad: valFormescuelaFacultad,
      valFormTipoCategoria: valFormTipoCategoria,
      valFormCategoriaPosgrado: valFormCategoriaPosgrado,
      valFormProgramas: valFormProgramas,
      valFormMesesCredito: valFormMesesCredito,
      valFormPrecioPrograma: valFormPrecioPrograma,
      valFormFinanciar: 0,
      valFormFinanciarDos: 0
    })
  }
  // Función de envio
  const handleSubmitData = (e) => {
    e.preventDefault()
    if (valFormFinanciar > valFormPrecioPrograma) {
      limpiarCamposCredito()
      return Swal.fire({
        title: '¡Error!',
        html: `El valor ingresado supera el valor de la matrícula.
                <br>
                Por favor intentelo nuevamente con un valor inferior
                <br><br>
                El valor de la matrícula es ${formatter.format(valFormPrecioPrograma)}
                `,
        icon: 'warning',
        confirmButtonText: 'Cerrar'
      })
    }
    dispatchForm(dataFormulario({
      res_form_nombreUsuario: "",
      res_form_escuelaFacultad: valFormescuelaFacultad,
      res_form_tipo: valFormTipoCategoria,
      res_form_programa: valFormProgramas,
      res_form_costoSemestre: valFormPrecioPrograma,
      res_form_mesesCredito: valFormMesesCredito,
      res_form_cantidadCredito: valFormFinanciar,
      res_form_cantidadCreditoDos: valFormFinanciarDos
    }))
  }
  return (
    <>
      <section className='bg-form'>
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <div className="row d-flex align-items-center h-100">
                <div className='col-sm-4'>
                  <div className="imgAspitanteCredito">
                    <img className='img-fluid' src="https://urosario.edu.co/sites/default/files/2023-02/estudiantes-universidad-del-rosario-jpg.png" alt='Simulador Aspirante' />
                  </div>
                </div>
                <div className='col-sm-6'>
                  <div className="tituloSimulador">
                    <p>
                      <span className="hashtag">
                        #URPorTusSueños
                      </span>
                      <span className="tex-1">
                        ¡SUEÑA EN GRANDE,
                      </span>
                      <br />
                      <span className="tex-2">
                        CREEMOS EN TI!
                      </span>
                      <br />
                      <span className="tex-3">
                        APOYARTE ES NUESTRO
                      </span>
                      <br />
                      <span className="tex-4">
                        PROPÓSITO
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 p-5">
              <h3 className='titulo-formulario'>
                <em>Simulador crédito</em> <strong>UR</strong>
              </h3>
              <form id='formularioSimulador' onSubmit={handleSubmitData}>
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
                          <label htmlFor="valFormMesesCredito">Tiempo del crédito <small>(meses)</small></label>
                          <select
                            className='form-select mb-3'
                            name="valFormMesesCredito"
                            id="valFormMesesCredito"
                            value={valFormMesesCredito}
                            onChange={handleChange}
                          >
                            <option value="" defaultValue>Seleccione tiempo</option>
                            <option value="1">1 Mes</option>
                            <option value="2">2 Meses</option>
                            <option value="3">3 Meses</option>
                            <option value="4">4 Meses</option>
                            <option value="5">5 Meses</option>
                            <option value="6">6 Meses</option>
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
                          <label htmlFor="valFormFinanciar">
                            Cantidad a solicitar <small>(Maximo: {formatter.format(valFormPrecioPrograma)})</small>
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
                <div className="row mx-0 d-flex justify-content-between">
                  <div className="col-sm-2">
                    <button
                      className='mt-3 btn btn-outline-secondary w-100 rounded-0'
                      rel="noreferrer"
                      onClick={limpiarSimulador}
                    >
                      <i className="fas fa-backspace"></i>
                    </button>
                  </div>
                  <div className="col-sm-8">
                    <button className='btn btn-danger mt-3 rounded-0 w-100' type='submit'>
                      Calcular
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
export default FormModule