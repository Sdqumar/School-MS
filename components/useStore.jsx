import create from "zustand";

const useStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  recipt:null,
  setRecipt: (recipt) => set({ recipt }),
  result:null,
  setResult: (recipt) => set({ result }),
}));

export default useStore;
