import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid mx-3">
                    <Link to='/' className="navbar-brand">Simulación</Link>
                    <ul className="d-flex navbar-nav mb-2 mb-lg-0 justify-content-end">

                        <li className="nav-item">
                            <Link to='/simulations' className="nav-link">Simular varios</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/records' className="nav-link">Registros</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar
