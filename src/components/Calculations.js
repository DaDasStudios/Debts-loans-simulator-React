import React, { useState } from 'react'

const Calculations = props => {

    let { loan, interest, fees } = props
    // * Remove the % symbol of the interest field
    interest = interest.replace('%', '')
    loan = parseFloat(loan)

    const initialState = {
        payments: 0
    }
    const [state, setState] = useState(initialState)

    // ? Calculations to use in other calculations
    const feeGain = loan * (interest / 100)
    const capitalSubscription = loan / fees
    const feePayment = capitalSubscription + feeGain
    const totalGains = feeGain * fees
    const paidRatio = (totalGains / loan) * 100

    return (
        <>
            <div className="col-md-6">
                <legend>Cálculos resultantes</legend>
                <div className="mb-3">
                    <label htmlFor="fee_gain" className="form-label">Ganancia por cuota</label>
                    <input readOnly type="number" className="form-control" id="fee_gain" aria-describedby="fee_gainHelp" value={feeGain} />
                </div>
                <div className="mb-3">
                    <label htmlFor="capital_subcription" className="form-label">Abono a capital</label>
                    <input readOnly type="number" className="form-control" id="capital_subcription" aria-describedby="capital_subcriptionHelp" value={capitalSubscription.toFixed(3)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="fee_pay" className="form-label">Pago por cuota</label>
                    <input readOnly type="number" className="form-control" id="fee_pay" aria-describedby="fee_payHelp" value={feePayment.toFixed(3)} />
                </div>
                <hr />

                <div className="mb-3">
                    <label htmlFor="total_gains" className="form-label">Ganancias totales o intereses totales</label>
                    <input readOnly type="number" className="form-control" id="total_gains" aria-describedby="total_gainsHelp" value={totalGains} />
                </div>
                <div className="mb-3">
                    <label htmlFor="total_paid" className="form-label">Total pagado</label>
                    <input readOnly type="number" className="form-control" id="total_paid" aria-describedby="total_paidHelp" value={totalGains + loan} />
                    <div id="total_paidHelp" className="form-text">Corresponde al total de dinero pagado por el cliente por el crédito, esto es la suma de los intereses pagados con el préstamo inicial</div>

                </div>
                <hr />

                <div className="row g-3 mb-3">
                    <div className="col-md-6">
                        <label htmlFor="gains_per_fee" className="form-label">Ganancias en &#945; pagos </label>
                        <input readOnly type="number" className="form-control" id="gains_per_fee" aria-describedby="gains_per_feeHelp" value={state.payments * feeGain} />
                        <div id="gains_per_feeHelp" className="form-text">Inserte hasta qué cantidad de cuotas desea simular los pagos</div>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="fees_to_simulate" className="form-label">Pagos realizados</label>
                        <input type="number" className="form-control" id="fees_to_simulate" min={0} aria-describedby="fees_to_simulateHelp" value={state.payments} onChange={e => { setState({ 'payments': e.target.value }) }} />
                    </div>
                </div>
                <div className="row g-3 mb-3">
                    <div className="col-md-6">
                        <label htmlFor="percentage_paid" className="form-label">Porcentaje total extra pagado</label>
                        <input readOnly type="text" className="form-control" id="percentage_paid" aria-describedby="percentage_paidHelp" value={paidRatio + '%'} />
                        <div id="percentage_paidHelp" className="form-text">Porcentaje del préstamo pagado por el mismo al culminar los pagos</div>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="percentage_per_fee" className="form-label">Porcentaje por cuota pagado</label>
                        <input readOnly type="text" className="form-control" id="percentage_per_fee" aria-describedby="percentage_per_feeHelp" value={(paidRatio / fees).toFixed(3) + '%'} />
                        <div id="percentage_per_feeHelp" className="form-text">Porcentaje correspondiente a cada cuota del prestamo</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Calculations

