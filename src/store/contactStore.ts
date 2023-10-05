import { create } from 'zustand';

interface ContactState {
  searchValue: string;
  dialogAction: {
    type: 'add' | 'edit';
    open: boolean;
    data?: any;
  };
}

interface ContactActions {
  setSearchValue: (search: string) => void;
  setDialogAction: ({
    type,
    open,
    data,
  }: {
    type: 'add' | 'edit';
    open: boolean;
    data?: any;
  }) => void;
}

const useContactStore = create<ContactState & ContactActions>((set) => ({
  searchValue: '',
  dialogAction: {
    type: 'add',
    open: false,
  },

  setSearchValue: (search) => set({ searchValue: search }),
  setDialogAction: ({ type, open, data }) =>
    set({ dialogAction: { type, open: open, data } }),
}));

export default useContactStore;
