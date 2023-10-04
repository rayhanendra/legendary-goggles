import { create } from 'zustand';

interface ContactState {
  searchValue: string;
}

interface ContactActions {
  setSearchValue: (search: string) => void;
}

const useContactStore = create<ContactState & ContactActions>((set) => ({
  searchValue: '',

  setSearchValue: (search) => set({ searchValue: search }),
}));

export default useContactStore;
