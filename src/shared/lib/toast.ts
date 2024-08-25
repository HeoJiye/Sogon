import useToastStore, { type ToastContent } from '../ui/Toast.store';

function toast({ type, message, persistent }: ToastContent) {
  useToastStore.getState().push({ type, message, persistent });
}

export default toast;
