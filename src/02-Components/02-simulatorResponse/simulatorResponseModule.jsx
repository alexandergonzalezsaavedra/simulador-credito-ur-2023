import React from 'react'
import { useSelector } from 'react-redux'
const SimulatorResponseModule = () => {
  // formato moneda pesos COP
  const formatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  })
  let { res_form_cantidadCredito } = useSelector(state => state.dataForm)
  let { res_cod_utm, res_escuelaFacultad, res_tipo, res_url, res_rutaImagenMin, res_descricionCorta, res_nombrePrograma, res_precio, res_snies } = useSelector(e => e.dataPrograma)
  let valorEnPesos = formatter.format(res_form_cantidadCredito)
  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            {
              (() => {
                if (res_cod_utm === 0) {
                  return (
                    <div>
                      Seleccione un programa y el valor del credíto a solicitar
                    </div>
                  )
                } else {
                  return (
                    <>
                      <p>
                        Código UTM: {res_cod_utm}
                      </p>
                      <div className="card">
                        <div className="card-header">
                          <p>
                            {res_escuelaFacultad}
                          </p>
                          <h3>
                            {res_nombrePrograma}
                          </h3>
                        </div>
                        <div className="card-body">
                          <img className='img-fluid' src={res_rutaImagenMin} alt={res_nombrePrograma} />
                        </div>
                      </div>
                    </>
                  )
                }
              })()
            }
          </div>
          <div className="col-sm-6">
            <h3>
              {valorEnPesos}
            </h3>
          </div>
        </div>


      </div>
    </section>
  )
}

export default SimulatorResponseModule