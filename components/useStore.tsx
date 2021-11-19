import create from "zustand";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";



const useStore = create((set) => ({
 user: null,
  setUser: (user) =>
    set({user}),
}));


export default useStore;
