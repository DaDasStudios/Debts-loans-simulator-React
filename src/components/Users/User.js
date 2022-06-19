import React, { useState } from 'react'
import Popover from '../Samples/Popover'

const User = (props) => {
    const { id, name, age, dni, address, phone, email, loan } = props.self

    const [userUtil, setUserUtil] = useState({
        isHidden: true
    })

    const togglePopover = () => {
        setUserUtil({
            isHidden: !userUtil.isHidden
        })
    }

    return (
        <div className={!loan.scam ? "card border-success" : "card border-danger"} style={{ maxWidth: '270px' }}>
            <div className="card-header">
                <div className="d-flex justify-content-between align-items-center">
                    <div className='text-dark'>{phone}</div>
                    <button type="button" className="btn-close" aria-label="Close" onClick={e => props.deleteUser(id)}></button>
                </div>
            </div>
            <div className={!loan.scam ? 'card-body text-success' : 'card-body text-danger'}>
                <h5 className="card-title">{`${name}. ${age} años`}</h5>
                <div className="card-text">{
                    `$${loan.loan} a ${loan.interest}% por ${loan.fees} ${loan.timeUnity.toLowerCase()}`
                }<br />
                    <div className="d-flex flex-column">
                        <small>Fiabilidad del {100 - loan.scamRatio}%</small>
                        <small>DNI: {dni}</small>
                        <small>{address}</small>
                        <small>{email}</small>
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-outline-success btn-sm my-1" type="button" onClick={togglePopover}>
                                {userUtil.isHidden ? "Ver más" : "Esconder"}
                            </button>
                        </div>
                    </div>
                    <Popover isHidden={userUtil.isHidden} loan={loan}></Popover>

                </div>

            </div>
        </div>


    )
}

export default User
