export interface ModalProps {
  opened?: boolean;
  children: React.ReactNode;
}

// eslint-disable-next-line no-empty-pattern
function Modal({ opened = true, children }: ModalProps) {
  if (!opened) {
    return null;
  }
  return (
    <div className='modal modal-open'>
      <div className='modal-box relative'>{children}</div>
    </div>
  );
}

export default Modal;
