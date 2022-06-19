import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

// * Components

const Simulations = (props) => {

    // todo: State
    const singleUserinitialState = {
        id: null,
        name: 'Example',
        age: 18,
        dni: 1234567,
        address: '...',
        phone: '+57 3008508791',
        email: 'example@example.com',
        loan: {
            loan: 350000,
            interest: 10,
            fees: 6,
            timeUnity: "Meses(s)",
            scamRatio: 30
        }
    }

    const [amountOfUsers, setAmountOfUsers] = useState(1)

    const [userState, setUserState] = useState(singleUserinitialState)

    // ? Functions to handle inputs

    const handleSubmit = e => {
        // ? To not submit the form
        e.preventDefault()

        const createUser = () => {
            // todo: Do all the needed calculations 
            let { loan, interest, fees, timeUnity, scamRatio } = userState.loan
            const { name, age, dni, address, phone, email } = userState

            // ? Some calculations
            const feeGain = loan * (interest / 100)
            const capitalSubscription = loan / fees
            const feePayment = capitalSubscription + feeGain
            const totalGains = feeGain * fees
            const paidRatio = (totalGains / loan) * 100

            // todo: Needed operations in order to convert the time-long into months
            const CONVERT_TO_MONTHS = {
                YEARS: 12,
                FORTNIGHTS: 1 / 2,
                WEEKS: 1 / 4,
                DAYS: 1 / 30
            }

            // ? Convert any unity of time into months
            let months = fees
            
            // todo: A object with all the calculations that depend of a unity of time 
            let simulationsInTimeLapse = {}

            // todo: Initializating the needed variables
            let annualInterest, monthlyInterest, interestGainsYear, interestGainsMonth, gainsYear, gainsMonth, capitalYear, capitalMonth

            const calcSimulationsInTimelapse = (months, CONVERT) => {
                const convertedTimeUnity = 1/CONVERT
                capitalMonth = fees <= convertedTimeUnity ? capitalSubscription * fees : capitalSubscription * convertedTimeUnity
                capitalYear = months <= CONVERT_TO_MONTHS.YEARS ? capitalMonth * months : capitalMonth * CONVERT_TO_MONTHS.YEARS
                interestGainsMonth = fees <= convertedTimeUnity ? feeGain * fees : feeGain * convertedTimeUnity
                interestGainsYear = months <= CONVERT_TO_MONTHS.YEARS ? interestGainsMonth * months : interestGainsMonth * CONVERT_TO_MONTHS.YEARS
                gainsMonth = capitalMonth + interestGainsMonth
                gainsYear = capitalYear + interestGainsYear
                monthlyInterest = fees <= convertedTimeUnity ? interest * fees : interest * convertedTimeUnity
                annualInterest = months <= CONVERT_TO_MONTHS.YEARS ? monthlyInterest * months : monthlyInterest * CONVERT_TO_MONTHS.YEARS

                return {capitalMonth, capitalYear, interestGainsMonth, interestGainsYear, gainsMonth, gainsYear, monthlyInterest, annualInterest}
            }

            switch (timeUnity) {
                case 'Día(s)':
                    months = fees * CONVERT_TO_MONTHS.DAYS
                    simulationsInTimeLapse = calcSimulationsInTimelapse(months, CONVERT_TO_MONTHS.DAYS)
                    break;
                case "Semana(s)":
                    months = fees * CONVERT_TO_MONTHS.WEEKS
                    simulationsInTimeLapse = calcSimulationsInTimelapse(months, CONVERT_TO_MONTHS.WEEKS)
                    break
                case "Quincena(s)":
                    months = fees * CONVERT_TO_MONTHS.FORTNIGHTS
                    simulationsInTimeLapse = calcSimulationsInTimelapse(months, CONVERT_TO_MONTHS.FORTNIGHTS)
                    break
                case "Año(s)":
                    months = fees * CONVERT_TO_MONTHS.YEARS
                    simulationsInTimeLapse = calcSimulationsInTimelapse(monthlyInterest, CONVERT_TO_MONTHS.YEARS)
                    break
                default:
                    // * In case of months
                    simulationsInTimeLapse = calcSimulationsInTimelapse(months, 1)
                    break
            }

            // ? Create a new object to set into the state
            const randomMeasure = Math.random() * 100
            const newUser = {
                id: uuidv4(),
                name: name,
                age: age,
                dni: dni,
                address: address,
                phone: phone,
                email: email,
                loan: {
                    loan: parseFloat(loan),
                    interest: interest,
                    fees: fees,
                    timeUnity: timeUnity,
                    months: months,
                    scam: randomMeasure < scamRatio,
                    scamRatio: scamRatio,
                    feeGain, capitalSubscription, feePayment, totalGains, paidRatio,
                    ...simulationsInTimeLapse,
                }
            }
            props.appendUser(newUser)
        }

        // * Create the user the number of times needed
        let cont = 0
        do {
            setTimeout(createUser, 50)
            cont++
        } while (cont < amountOfUsers);
    }

    const handleUserInformation = e => {
        setUserState({ ...userState, [e.target.name]: e.target.value })
    }

    const handleLoanInformation = e => {
        setUserState(
            {
                ...userState,
                loan: {
                    ...userState.loan, [e.target.name]: e.target.value
                }
            }
        )
    }

    return (
        <form onSubmit={handleSubmit} >
            <div className='row g-3'>
                <div className="col-md-6">
                    <legend>Añadir un nuevo usuario</legend>
                    <div className="row g-3 mb-3">
                        <div className="col-md-6">
                            <label htmlFor="name" className="form-label">Nombre</label>
                            <input name='name' type="text" className="form-control" id="name" onChange={handleUserInformation} value={userState.name} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="age" className="form-label">Edad</label>
                            <input name='age' type="number" className="form-control" id="age" onChange={handleUserInformation} value={userState.age} />
                        </div>

                    </div>
                    <div className="row g-3 mb-3">
                        <div className="col-md-6">
                            <label htmlFor="dni" className="form-label">DNI</label>
                            <input name='dni' type="number" className="form-control" id="dni" onChange={handleUserInformation} value={userState.dni} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="address" className="form-label">Dirección</label>
                            <input name='address' type="text" className="form-control" id="address" onChange={handleUserInformation} value={userState.address} />
                        </div>

                    </div>
                    <div className="row g-3 mb-3">
                        <div className="col-md-6">
                            <label htmlFor="phone" className="form-label">Número</label>
                            <input name='phone' type="tel" className="form-control" id="phone" onChange={handleUserInformation} value={userState.phone} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input name='email' type="email" className="form-control" id="email" onChange={handleUserInformation} value={userState.email} />
                        </div>

                    </div>
                    <div className="row g-3 mb-3">
                        <div className="col-md-6">
                            <label htmlFor="scamRatio" className="form-label">Probabilidad de estafa</label>
                            <input min={0} max={100} name='scamRatio' type="number" className="form-control" id="scamRatio" onChange={handleLoanInformation} value={userState.loan.scamRatio} />
                            <div className="form-text">Rellene todos los campos del formulario para subir la información</div>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="numberOfUsers" className="form-label">Cantidad de usuarios</label>
                            <input min={1} max={200} name='numberOfUsers' type="number" className="form-control" id="numberOfUsers" onChange={e => e.target.value === '' ? setAmountOfUsers(1) : setAmountOfUsers(parseInt(e.target.value))} value={amountOfUsers} />
                            <div className="form-text">El número de veces que el usuario será añadido</div>
                        </div>
                        <button type="submit" className='btn btn-primary'>Añadir usuario</button>
                    </div>

                </div>
                <div className="col-md-6">
                    <legend>Datos del préstamo</legend>
                    <div className="mb-3">
                        <label htmlFor="loan_amount" className="form-label">Monto del préstamo</label>
                        <input name='loan' type="number" className="form-control" id="loan_amount" aria-describedby="loan_amountHelp" onChange={handleLoanInformation} value={userState.loan.loan} />
                        <div id="loan_amountHelp" className="form-text">Inserte una cantidad de dinero que desee simular</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="interest_rate" className="form-label">Tasa de interes</label>
                        <input name='interest' type="text" className="form-control" id="interest_rate" aria-describedby="interest_rateHelp" onChange={handleLoanInformation} value={userState.loan.interest} />
                        <div id="interest_rateHelp" className="form-text">Inserte el porcentaje de la tasa de interes deseada</div>
                    </div>
                    <div className="row g-3 mb-3">
                        <div className="col-md-6">
                            <label htmlFor="fees" className="form-label">Cuotas</label>
                            <input name='fees' type="number" className="form-control" id="fees" aria-describedby="feesHelp" onChange={handleLoanInformation} value={userState.loan.fees} />
                            <div id="feesHelp" className="form-text">Inserte la cantidad de cuotas para pagar el préstamo</div>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="time_unity" className="form-label">Unidad de tiempo</label>
                            <select className='form-select' name="timeUnity" id="time_unity" onChange={handleLoanInformation} value={userState.loan.timeUnity}>
                                <option value="Mese(s)">Meses</option>
                                <option value="Quincena(s)">Quincenas</option>
                                <option value="Semana(s)">Semanas</option>
                                <option value="Día(s)">Días</option>
                                <option value="Año(s)">Años</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default Simulations