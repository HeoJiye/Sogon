export interface LinkProps {
  onClick?: () => void;
  children: React.ReactNode;
}

// eslint-disable-next-line no-empty-pattern
function Link({ onClick, children }: LinkProps) {
  return (
    <button className='btn btn-link font-thin text-neutral hover:scale-105' type='button' onClick={onClick}>
      {children}
    </button>
  );
}

export default Link;
