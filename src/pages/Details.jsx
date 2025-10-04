import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getImageUrl, FALLBACK_IMG } from "../imageUrl.jsx";
import { useStore } from "../store.jsx";

const API = "https://swapi.tech/api";

export default function Details() {
  const { type, id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { actions } = useStore();

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await fetch(`${API}/${type}/${id}`);
        if (!res.ok) throw new Error("No se pudo cargar el detalle");
        const json = await res.json();
        setData(json?.result);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [type, id]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (!data) return <p>Sin datos</p>;

  const props = data.properties || {};
  const item = { type, uid: id, name: data?.properties?.name || data?.uid };

  return (
    <div className="row g-4">
      <div className="col-md-5">
        <img
          src={getImageUrl(type, id)}
          onError={(e) => { e.currentTarget.src = FALLBACK_IMG; }}
          className="img-fluid rounded shadow-sm"
          alt={props.name}
        />
      </div>
      <div className="col-md-7">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="m-0">{props.name || data.uid}</h2>
          <button className="btn btn-outline-secondary" onClick={() => actions.toggleFavorite(item)}>
            Guardar / Quitar favorito
          </button>
        </div>

        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Detalles</h5>
            <ul className="list-group list-group-flush">
              {Object.entries(props).map(([key, value]) => (
                <li key={key} className="list-group-item d-flex justify-content-between">
                  <strong className="text-capitalize">{key.replaceAll("_"," ")}</strong>
                  <span className="text-muted">{String(value)}</span>
                </li>
              ))}
            </ul>
            {data?.description && <p className="mt-3">{data.description}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
