import { useSelector } from "react-redux";
import lang from "../utils/LanguageConstants";

const GptSearchBar = () => {
  const langKey = useSelector((store)=>store.config.lang);
  return (
    <div className="pt-16 flex justify-center">
      <form className="p-2 m-3 bg-black w-full max-w-3xl grid grid-cols-12 gap-2 rounded-lg">
        <input
          type="text"
          placeholder={lang[langKey].gptSearchPlaceholder}
          className="col-span-9 px-3 py-2 text-black rounded placeholder-gray-500 bg-white text-sm"
        />
        <button
          type="submit"
          className="col-span-3 bg-red-700 hover:bg-red-800 text-white py-2 px-4 rounded"
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
