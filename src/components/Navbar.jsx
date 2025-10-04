import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useStore } from "../store.jsx";

export default function Navbar() {
  const { state, actions } = useStore();
  const { favorites } = state;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">SWAPI Browser</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><NavLink className="nav-link" to="/">Inicio</NavLink></li>
          </ul>

          <div className="dropdown">
            <button className="btn btn-warning dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              Favoritos ({favorites.length})
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              {favorites.length === 0 && <li className="dropdown-item text-muted">Vacío</li>}
              {favorites.map(f => (
                <li key={`${f.type}-${f.uid}`} className="d-flex align-items-center gap-2 px-3 py-2">
                  <Link className="flex-grow-1 text-decoration-none" to={`/details/${f.type}/${f.uid}`}>
                    {f.name} <span className="badge bg-secondary text-uppercase">{f.type}</span>
                  </Link>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => actions.removeFavorite(f)}>
                    &times;
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
