import { create } from 'zustand';

export interface ConsentData {
  content: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

export type ConsentStore = {
  data: ConsentData | null;
  show: (data: ConsentData) => void;
  hide: () => void;
};

const useConsentStore = create<ConsentStore>()((set) => ({
  data: null,
  show: (data) => set(() => ({ data })),
  hide: () => set(() => ({ data: null })),
}));

export default useConsentStore;
