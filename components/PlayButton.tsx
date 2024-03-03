import { FaPlay } from "react-icons/fa";
const PlayButton = () => {
    return (
        <button 
        className="
          absolute 
          transition 
          opacity-0 
          rounded-full 
          flex 
          items-center 
          justify-center 
          bg-purple-500 
          p-4 
          drop-shadow-md 
          right-5
          group-hover:opacity-100 
          hover:scale-110
        "
      >
        <FaPlay className="text-black" />
      </button>
    );
}

export default PlayButton;