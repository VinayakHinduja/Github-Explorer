import { createContext, useReducer } from "react";

export const FavouritesContext = createContext({
  Favourites: [],
  addFavorite: (repository) => {},
  removeFavorite: (id) => {},
});

function FavouritesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      if (state.find((repo) => repo.id === action.payload.id)) {
        return state;
      }
      return [...state, action.payload];

    case "REMOVE":
      if (
        action.payload?.id &&
        state.find((repo) => repo.id === action.payload.id)
      ) {
        return state.filter((repo) => repo.id !== action.payload.id);
      }
      return state;

    default:
      return state;
  }
}

function FavouritesContextProvider({ children }) {
  const [FavouritesState, dispatch] = useReducer(FavouritesReducer, []);

  function addFavorite(repository) {
    dispatch({ type: "ADD", payload: repository });
  }

  function removeFavorite(id) {
    dispatch({ type: "REMOVE", payload: { id: id } });
  }

  const value = {
    Favourites: FavouritesState,
    addFavorite: addFavorite,
    removeFavorite: removeFavorite,
  };

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
}

export default FavouritesContextProvider;
