type Props = {
  label: string;
  onClick?: () => void;
  size: 1 | 2 | 3;
};

export const Button = ({ label, onClick, size }: Props) => {
  return (
    <div 
        className={`flex justify-center items-center w-1/2 self-center mt-8 cursor-pointer bg-[#97A2D7] text-white rounded-xl hover:bg-[#727ba8] transition duration-700 ease-in-out
           ${size === 1 && 'h-14 text-2xl'}
           ${size === 2 && 'h-10 text-md'}
           ${size === 3 && 'h-7 text-xs'}`} 
        onClick={onClick}
    >
        {label}
    </div>
  );
};
