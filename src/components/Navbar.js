import React from 'react';
import { Link } from 'react-router-dom';

function CustomNavbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img
            src="/SmartPizza.jpeg"
            alt="SmartPizza Logo"
            height="36"
          />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/partner">Partner</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Pizza
              </a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <li>
                  <Link className="dropdown-item" to="/aggiungi-pizza">Aggiungi Pizza</Link> {/* Link a AggiungiPizza */}
                </li>
                <li>
                  <Link className="dropdown-item" to="/lista-pizze">Lista Pizze</Link> {/* Link a ListaPizze */}
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default CustomNavbar;
