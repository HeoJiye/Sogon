export interface IconButtonProps {
  icon: React.ReactNode;
}

function IconButton({ icon }: IconButtonProps) {
  return (
    <button type='button' className='animate-btn h-fit w-fit cursor-pointer rounded-full p-[2%] hover:bg-base-200'>
      {icon}
    </button>
  );
}

export default IconButton;
