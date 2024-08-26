import Button from './Button';
import useConsentStore from './Consent.store';

export interface ConsentProps {}

function Consent({}: ConsentProps) {
  const { data, hide } = useConsentStore((state) => ({ data: state.data, hide: state.hide }));

  if (!data) return null;

  const { content, onConfirm, onCancel } = data;

  const handleConfirm = () => {
    onConfirm();
    hide();
  };

  const handleCancel = () => {
    onCancel?.();
    hide();
  };

  return (
    <div className='modal modal-open !bg-transparent text-neutral'>
      <div className='modal-box flex-center relative flex h-fit w-300 animate-modal-show flex-col gap-24 border'>
        <div className='w-full text-center text-14'>{content}</div>
        <div className='flex w-full justify-around'>
          <Button color='cancel' size='s' onClick={handleConfirm}>
            아니요
          </Button>
          <Button size='s' onClick={handleCancel}>
            네
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Consent;
