export interface IconButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
}

function IconButton({ icon, onClick }: IconButtonProps) {
  return (
    <button
      type='button'
      className='animate-btn h-fit w-fit cursor-pointer rounded-full p-[2%] hover:bg-base-200'
      onClick={() => onClick?.()}
    >
      {icon}
    </button>
  );
}

export default IconButton;
