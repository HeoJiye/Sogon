export interface LinkButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

// eslint-disable-next-line no-empty-pattern
function LinkButton({ onClick, children }: LinkButtonProps) {
  return (
    <button className='btn btn-link font-thin text-neutral hover:scale-105' type='button' onClick={onClick}>
      {children}
    </button>
  );
}

export default LinkButton;
