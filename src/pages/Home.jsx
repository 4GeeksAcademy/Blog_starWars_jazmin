import React, { useEffect } from "react";
import { useStore } from "../store.jsx";
import CardList from "../components/CardList.jsx";

export default function Home() {
  const { state, actions } = useStore();
  const { people, vehicles, planets, pages, loading } = state;

  useEffect(() => {
    if (people.length === 0) actions.fetchList("people", 1);
    if (vehicles.length === 0) actions.fetchList("vehicles", 1);
    if (planets.length === 0) actions.fetchList("planets", 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <CardList title="Personajes" items={people} />
      <div className="text-center mb-5">
        <button
          className="btn btn-outline-primary"
          disabled={loading.people}
          onClick={() => actions.fetchList("people", pages.people + 1)}
        >
          {loading.people ? "Cargando..." : "Cargar más personajes"}
        </button>
      </div>

      <CardList title="Vehículos" items={vehicles} />
      <div className="text-center mb-5">
        <button
          className="btn btn-outline-primary"
          disabled={loading.vehicles}
          onClick={() => actions.fetchList("vehicles", pages.vehicles + 1)}
        >
          {loading.vehicles ? "Cargando..." : "Cargar más vehículos"}
        </button>
      </div>

      <CardList title="Planetas" items={planets} />
      <div className="text-center">
        <button
          className="btn btn-outline-primary"
          disabled={loading.planets}
          onClick={() => actions.fetchList("planets", pages.planets + 1)}
        >
          {loading.planets ? "Cargando..." : "Cargar más planetas"}
        </button>
      </div>
    </div>
  );
}
