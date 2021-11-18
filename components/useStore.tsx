import create from "zustand";
const useStore = create((set) => ({
 user: {},
  setUser: (user) =>
    set({user}),
}));
export default useStore;
