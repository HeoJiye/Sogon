import { create } from 'zustand';

type ToastType = 'error' | 'success' | 'info';

export interface ToastContent {
  type: ToastType;
  message: string;
  persistent?: boolean;
}

export interface ToastData extends ToastContent {
  id: number;
}

export type ToastStore = {
  nextId: number;
  queue: ToastData[];
  push: (content: ToastContent) => void;
  pop: (id: number) => void;
};

const useToastStore = create<ToastStore>()((set) => ({
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

export default useToastStore;
