import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const API = "https://swapi.tech/api";

const initialState = {
  people: [],
  vehicles: [],
  planets: [],
  pages: { people: 1, vehicles: 1, planets: 1 },
  loading: { people: false, vehicles: false, planets: false },
  error: null,
  favorites: [] // {type, uid, name}
};

function init(initial) {
  try {
    const raw = localStorage.getItem("favorites");
    if (raw) return { ...initial, favorites: JSON.parse(raw) };
  } catch {}
  return initial;
}

function reducer(state, action) {
  switch (action.type) {
    case "SET_LIST": {
      const { listType, items, page } = action.payload;
      return {
        ...state,
        [listType]: page === 1 ? items : [...state[listType], ...items],
        pages: { ...state.pages, [listType]: page },
        loading: { ...state.loading, [listType]: false },
        error: null
      };
    }
    case "LOADING": {
      const { listType, value } = action.payload;
      return { ...state, loading: { ...state.loading, [listType]: value } };
    }
    case "ERROR": {
      return {
        ...state,
        error: action.payload,
        loading: { people: false, vehicles: false, planets: false }
      };
    }
    case "ADD_FAVORITE": {
      const exists = state.favorites.some(
        (f) => f.type === action.payload.type && f.uid === action.payload.uid
      );
      const newFavs = exists ? state.favorites : [...state.favorites, action.payload];
      return { ...state, favorites: newFavs };
    }
    case "REMOVE_FAVORITE": {
      const newFavs = state.favorites.filter(
        (f) => !(f.type === action.payload.type && f.uid === action.payload.uid)
      );
      return { ...state, favorites: newFavs };
    }
    default:
      return state;
  }
}

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState, init);

  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    } catch {}
  }, [state.favorites]);

  async function fetchList(listType, page = 1, limit = 12) {
    dispatch({ type: "LOADING", payload: { listType, value: true } });
    try {
      const res = await fetch(`${API}/${listType}?page=${page}&limit=${limit}`);
      if (!res.ok) throw new Error(`Error al cargar ${listType}`);
      const data = await res.json();
      const items = (data?.results || []).map((x) => ({
        uid: x.uid,
        name: x.name,
        type: listType,
        url: x.url
      }));
      dispatch({ type: "SET_LIST", payload: { listType, items, page } });
    } catch (err) {
      console.error(err);
      dispatch({ type: "ERROR", payload: err.message });
    }
  }

  function addFavorite(item) {
    dispatch({ type: "ADD_FAVORITE", payload: item });
  }
  function removeFavorite(item) {
    dispatch({ type: "REMOVE_FAVORITE", payload: item });
  }
  function toggleFavorite(item) {
    const exists = state.favorites.some((f) => f.type === item.type && f.uid === item.uid);
    if (exists) removeFavorite(item);
    else addFavorite(item);
  }

  const value = useMemo(
    () => ({ state, actions: { fetchList, addFavorite, removeFavorite, toggleFavorite } }),
    [state]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore debe usarse dentro de StoreProvider");
  return ctx;
}

