import useConsentStore, { type ConsentData } from '../ui/Consent.store';

function consent(data: ConsentData) {
  useConsentStore.getState().show(data);
}

export default consent;
