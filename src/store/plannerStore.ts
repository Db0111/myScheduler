import { create } from "zustand";

const usePlannerStore = create((set) => ({
  planner: null,
  setPlanner: (planner) => set({ planner }),
}));

export default usePlannerStore;
