import useAlertStore, { type AlertContent } from '../ui/Alert.store';

function alert({ type, message, persistent }: AlertContent) {
  useAlertStore.getState().push({ type, message, persistent });
}

export default alert;
