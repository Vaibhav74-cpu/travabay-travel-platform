import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function SearchBox() {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || "");
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      setKeyword("");
      navigate(`/search/${keyword}`);
    } else {
      navigate("/packages");
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="flex w-full md:max-w-xl mx-2 md:mx-6"
    >
      <div className="flex w-full items-center bg-white rounded-full border border-gray-300 overflow-hidden shadow-sm">
        {/* Input */}
        <input
          type="text"
          name="q"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='Search "Eiffel Tower"'
          className="flex-1 px-4 py-2 text-sm text-black outline-none"
        />

        {/* Icon Button */}
        <button
          type="submit"
          className="px-3 py-2 text-gray-600 hover:text-blue-600 transition"
        >
          <Search size={18} />
        </button>
      </div>
    </form>
  );
}

export default SearchBox;
