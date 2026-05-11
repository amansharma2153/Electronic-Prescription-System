import { create } from 'zustand';

const usePrescriptionStore = create((set) => ({
  prescriptions: [],
  setPrescriptions: (data) => set({ prescriptions: data })
}));

export default usePrescriptionStore;