import { create } from "zustand";
import { persist } from "zustand/middleware";

export const usePropertyStore = create(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (property) =>
        set((state) => {
          const exists = state.favorites.some(
            (f) => f.codpro === property.codpro
          );

          if (exists) return state;

          return {
            favorites: [...state.favorites, property],
          };
        }),

      removeFavorite: (property) =>
        set((state) => ({
          favorites: state.favorites.filter(
            (f) => f.codpro !== property.codpro
          ),
        })),
    }),
    {
      name: "property-storage",
    }
  )
);