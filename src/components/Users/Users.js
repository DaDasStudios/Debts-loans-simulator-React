import React from 'react'
import User from './User'

const Users = (props) => {
    const {users, setUsers} = props

    const deleteUser = id => {
        setUsers({ loans: users.loans.filter(e => !(e.id === id)) })
    }

    return (    
        <div className="d-flex gap-3 flex-wrap justify-content-center align-items-start">
            {
                users.loans.length === 0 ? <div className="card border-primary" style={{ maxWidth: '20rem' }}>
                    <div className="card-header text-primary">Upps...</div>
                    <div className='card-body text-primary'>
                        <h5 className="card-title">No hay préstamos</h5>
                        <div className="card-text">
                            Añade préstamos llenando los datos de arriba
                        </div>
                    </div>
                </div> : users.loans.map(user => <User key={user.id} self={user} deleteUser={deleteUser}></User>)
            }
        </div>
    )
}

export default Users