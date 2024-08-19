import { create } from 'zustand';

type AlertType = 'error' | 'success' | 'info';

export interface AlertContent {
  type: AlertType;
  message: string;
  persistent?: boolean;
}

export interface AlertData extends AlertContent {
  id: number;
}

export type AlertStore = {
  nextId: number;
  queue: AlertData[];
  push: (content: AlertContent) => void;
  pop: (id: number) => void;
};

const useAlertStore = create<AlertStore>()((set) => ({
  nextId: 0,
  queue: [],
  push: (content) => {
    set((state) => ({
      nextId: state.nextId + 1,
      queue: [...state.queue, { id: state.nextId, ...content }],
    }));
  },
  pop: (id) => {
    set((state) => ({
      queue: state.queue.filter((alert) => alert.id !== id),
    }));
  },
}));

export default useAlertStore;
