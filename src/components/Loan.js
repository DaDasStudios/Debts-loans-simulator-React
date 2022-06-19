import React from 'react'

const Loan = (props) => {

    const onChangeEntry = e => {
        switch (e.target.name) {
            case 'interest':
                props.updatePercentageInput(e.target.name, e.target.value)
                break;

            default:
                props.updateGlobalState(e.target.name, e.target.value)
                break;
        }
    }


    const { loan, interest, fees, timeUnity } = props

    return (
        <>
            <form className="col-md-6">
                <legend>Datos para el cliente</legend>
                <div className="mb-3">
                    <label htmlFor="loan_amount" className="form-label">Monto del préstamo</label>
                    <input min={0} name='loan' type="number" className="form-control" id="loan_amount" aria-describedby="loan_amountHelp" value={loan} onChange={onChangeEntry} />
                    <div id="loan_amountHelp" className="form-text">Inserte una cantidad de dinero que desee simular</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="interest_rate" className="form-label">Tasa de interes</label>
                    <input name='interest' type="text" className="form-control" id="interest_rate" aria-describedby="interest_rateHelp" value={interest} onChange={onChangeEntry} onBlur={props.blurPercetageInput} />
                    <div id="interest_rateHelp" className="form-text">Inserte el porcentaje de la tasa de interes deseada</div>
                </div>
                <div className="row g-3 mb-3">
                    <div className="col-md-6">
                        <label htmlFor="fees" className="form-label">Cuotas</label>
                        <input name='fees' type="number" className="form-control" id="fees" aria-describedby="feesHelp" value={fees} onChange={onChangeEntry} min={1} />
                        <div id="feesHelp" className="form-text">Inserte la cantidad de cuotas para pagar el préstamo</div>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="time_unity" className="form-label">Unidad de tiempo</label>
                        <select className='form-select' name="timeUnity" id="time_unity" onChange={onChangeEntry} value={timeUnity}>
                            <option value="Días">Días</option>
                            <option value="Semanas">Semanas</option>
                            <option value="Quincenas">Quincenas</option>
                            <option value="Meses">Meses</option>
                            <option value="Años">Años</option>
                        </select>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Loan