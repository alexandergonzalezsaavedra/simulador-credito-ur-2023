import React from 'react'
import { useSelector } from 'react-redux'
const SimulatorResponseModule = () => {
  // formato moneda pesos COP
  const formatter = new Intl.NumberFormat('es-CO', {
    //style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  })
  let { res_form_cantidadCredito } = useSelector(state => state.dataForm)
  let valorEnPesos = formatter.format(res_form_cantidadCredito)
  return (
    <>
      <div>simulatorResponseModule</div>
      <h3>
        {valorEnPesos}
      </h3>
    </>
  )
}

export default SimulatorResponseModule