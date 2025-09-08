import { create } from "zustand";

interface Employee {
  name: string;
  role: string;
  cost: number;
  productivity: string;
  characterImg: string;
}

interface EmployeeState {
  employees: Employee[];
  hireEmployee: (employee: Employee) => void;
}

export const useEmployeeStore = create<EmployeeState>((set) => ({
  employees: [],
  hireEmployee: (employee) =>
    set((state) => ({
      employees: [...state.employees, employee],
    })),
}));
