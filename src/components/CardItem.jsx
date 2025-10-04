import React from "react";
import { Link } from "react-router-dom";
import { getImageUrl, FALLBACK_IMG } from "../imageUrl.jsx";
import { useStore } from "../store.jsx";

export default function CardItem({ item }) {
  const { state, actions } = useStore();
  const isFav = state.favorites.some(f => f.type === item.type && f.uid === item.uid);

  return (
    <div className="col">
      <div className="card h-100 shadow-sm">
        <img
          src={getImageUrl(item.type, item.uid)}
          onError={(e) => { e.currentTarget.src = FALLBACK_IMG; }}
          className="card-img-top object-cover"
          alt={item.name}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{item.name}</h5>
          <div className="mt-auto d-flex gap-2">
            <Link to={`/details/${item.type}/${item.uid}`} className="btn btn-primary">Ver detalles</Link>
            <button
              className={`btn ${isFav ? "btn-danger" : "btn-outline-secondary"}`}
              onClick={() => actions.toggleFavorite(item)}
            >
              {isFav ? "Quitar favorito" : "Guardar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
