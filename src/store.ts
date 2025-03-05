import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface User {
  name: string;
  email: string;
  // Add other user properties here if needed
}

export interface TokenStore {
  token: string;
  setToken: (data: string) => void;
  user: User | null;
  setUser: (data: User) => void;
  currentPage: number; // Add page state
  setCurrentPage: (page: number) => void;
}

const useTokenStore = create<TokenStore>()(
  devtools(
    persist(
      (set) => ({
        token: "",
        setToken: (data: string) => set(() => ({ token: data })),
        user: null, // Start with null
        setUser: (data: User) => set(() => ({ user: data })),
        currentPage: 1, // Default page
        setCurrentPage: (page: number) => set(() => ({ currentPage: page })),
      }),
      { name: "token-store" }
    )
  )
);

export default useTokenStore;
