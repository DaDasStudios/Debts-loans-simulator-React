import React from 'react'

const Popover = (props) => {
    const { isHidden, loan } = props
    return (
        <div className={`${isHidden ? 'hide' : 'show'} faded d-flex flex-column card p-1 mt-1 text-secondary`}>
            <small >{`Interes por cuota: $${loan.feeGain}`}</small>
            <small >{`Capital por cuota: $${loan.capitalSubscription.toFixed(2)}`}</small>
            <small className='border-bottom mb-1 pb-1'>{`Pago por cuota: $${loan.feePayment.toFixed(2)}`}</small>
            <small >{`Total intereses: $${loan.totalGains.toFixed(2)}`}</small>
            <small className='border-bottom mb-1 pb-1'>{`Total pagado: $${loan.loan + loan.totalGains}`}</small>
            <small >{`Ganancia anual: $${loan.gainsYear.toFixed(2)}`}</small>
            <small className='border-bottom mb-1 pb-1'>{`Ganancia mensual: $${loan.gainsMonth.toFixed(2)}`}</small>
            <small >{`Capital anual: $${loan.capitalYear.toFixed(2)}`}</small>
            <small className='border-bottom mb-1 pb-1'>{`Capital mensual: $${loan.capitalMonth.toFixed(2)}`}</small>
            <small >{`Ganancias intereses anuales: $${loan.interestGainsYear.toFixed(2)}`}</small>
            <small className='border-bottom mb-1 pb-1'>{`Ganancias intereses mensuales: $${loan.interestGainsMonth.toFixed(2)}`}</small>
            <small >{`Interes completo: ${loan.paidRatio.toFixed(2)}%`}</small>
            <small >{`Interes anual: ${loan.annualInterest.toFixed(2)}%`}</small>
            <small >{`Interes mensual: ${loan.monthlyInterest.toFixed(2)}%`}</small>
        </div> 
    )
}

export default Popover  