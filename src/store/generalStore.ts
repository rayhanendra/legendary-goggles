import { create } from 'zustand';

interface ContactState {
  dialogAction: {
    type: 'add' | 'edit';
    open: boolean;
    data?: any;
  };
}

interface ContactActions {
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

const useGeneralStore = create<ContactState & ContactActions>((set) => ({
  dialogAction: {
    type: 'add',
    open: false,
  },

  setDialogAction: ({ type, open, data }) =>
    set({ dialogAction: { type, open: open, data } }),
}));

export default useGeneralStore;
