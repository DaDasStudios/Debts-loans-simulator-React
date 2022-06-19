import React from 'react'
import Users from './Users/Users'

const Results = (props) => {


    const { users, results, refresh, setUsers, setResults, initialResults } = props

    const deleteAll = () => {
        setUsers({ loans: [] })
        setResults(initialResults)
    }

    return (
        <>
            <div className='row g-3'>
                <div className="col-md-6">
                    <legend className='text-center'>Ganacias</legend>
                    <div className="mb-3">
                        <label htmlFor="totalInterestGains" className="form-label">Ganacias de intereses totales</label>
                        <input readOnly name='totalInterestGains' type="text" className="form-control" id="totalInterestGains" value={`$${results.totalGains}`} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="yearGains" className="form-label">Ganacias de intereses por año </label>
                        <input readOnly name='yearGains' type="text" className="form-control" id="yearGains" value={`$${results.interestGainsYear}`} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="monthGains" className="form-label">Ganacias de intereses por mes</label>
                        <input readOnly name='monthGains' type="text" className="form-control" id="monthGains" value={`$${results.interestGainsMonth}`}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="yearGains" className="form-label">Capital abonado por año </label>
                        <input readOnly name='yearGains' type="text" className="form-control" id="yearGains" value={`$${results.gainsPerYear - results.interestGainsYear}`} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="monthGains" className="form-label">Capital abonado por mes</label>
                        <input readOnly name='monthGains' type="text" className="form-control" id="monthGains" value={`$${results.gainsPerMonth - results.interestGainsMonth}`}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="yearGains" className="form-label">Dinero recogido por año </label>
                        <input readOnly name='yearGains' type="text" className="form-control" id="yearGains" value={`$${results.gainsPerYear}`} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="monthGains" className="form-label">Dinero recogido por mes</label>
                        <input readOnly name='monthGains' type="text" className="form-control" id="monthGains" value={`$${results.gainsPerMonth}`}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="successfulLoans" className="form-label">Pŕestamos exitosos</label>
                        <input readOnly name='successfulLoans' type="text" className="form-control" id="successfulLoans" value={results.successfulLoans} />
                    </div>
                </div>
                <div className="col-md-6">
                    <legend className='text-center'>Pérdidas</legend>
                    <div className="mb-3">
                        <label htmlFor="totalInterestLosses" className="form-label">Pérdidas de intereses totales</label>
                        <input readOnly name='totalInterestLosses' type="text" className="form-control" id="totalInterestLosses" value={`$${results.totalLosses}`} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="yearLosses" className="form-label">Pérdidas de intereses por año</label>
                        <input readOnly name='yearLosses' type="text" className="form-control" id="yearLosses" value={`$${results.interestLossesYear}`}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="monthLosses" className="form-label">Pérdidas de intereses por mes</label>
                        <input readOnly name='monthLosses' type="text" className="form-control" id="monthLosses" value={`$${results.interestLossesMonth}`}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="yearLosses" className="form-label">Capital perdido por año</label>
                        <input readOnly name='yearLosses' type="text" className="form-control" id="yearLosses" value={`$${(results.lossesPerYear - results.interestLossesYear) }`}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="monthLosses" className="form-label">Capital perdido por mes</label>
                        <input readOnly name='monthLosses' type="text" className="form-control" id="monthLosses" value={`$${results.lossesPerMonth - results.interestLossesMonth}`}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="yearLosses" className="form-label">Dinero perdido por año</label>
                        <input readOnly name='yearLosses' type="text" className="form-control" id="yearLosses" value={`$${results.lossesPerYear}`}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="monthLosses" className="form-label">Dinero perdido por mes</label>
                        <input readOnly name='monthLosses' type="text" className="form-control" id="monthLosses" value={`$${results.lossesPerMonth}`}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="failedLoans" className="form-label">Préstamos fracasados</label>
                        <input readOnly name='failedLoans' type="text" className="form-control" id="failedLoans" value={results.failedLoans} />
                    </div>
                </div>
                <div className="col-md-6">
                    <label htmlFor="totalMoney" className="form-label">Dinero ganado en total</label>
                    <input readOnly name='totalMoney' type="text" className="form-control" id="totalMoney" value={`$${results.totalMoneyReceived}`} />
                </div>
                <div className="col-md-6">
                    <label htmlFor="totalLosses" className="form-label">Dinero perdido en total</label>
                    <input readOnly name='totalLosses' type="text" className="form-control" id="totalLosses" value={`$${results.totalMoneyLost}`} />
                </div>
                <div className="btn-group" role={'group'} >
                    <button onClick={refresh} className="btn btn-primary w-50">Refrescar</button>
                    <button onClick={deleteAll} className="btn btn-danger w-50">Eliminar todos</button>
                </div>
            </div>
            <hr />
            <Users users={users} setUsers={setUsers}/>
        </>

    )
}

export default Results