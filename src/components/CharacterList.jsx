import { useEffect, useState } from "react";
import { getAllPeople } from "../utils/api"; // uses your multi-page version
import { getCharacterImage } from "../utils/getCharacterImage";
import SkeletonCard from "../components/SkeletonCard";

const imageFraming = {
  "Luke Skywalker": "object-center",
  "R2-D2": "object-center",
  "Darth Vader": "object-[50%_40%]",
  "Beru Whitesun lars": "object-center",
  "Obi-Wan Kenobi": "object-center",
  "Darth Maul": "object-center",
  "Plo Koon": "object-center",
  "Dooku": "object-center",
  "Captain Phasma": "object-center",
  "BB-8": "object-center",
  "R5-D4": "object-center",
  "Leia Organa": "object-center",
  "Biggs Darklighter": "object-center",
  "Yoda": "object-center",
  "Padmé Amidala": "object-[50%_25%]",
};

export default function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [dataReady, setDataReady] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);

  useEffect(() => {
    const MIN_SKELETON_TIME = 7000;

    const fetchData = async () => {
      const data = await getAllPeople();
      setCharacters(data);
      setDataReady(true);
    };

    fetchData();

    const timer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, MIN_SKELETON_TIME);

    return () => clearTimeout(timer);
  }, []);

  const loading = !(dataReady && minTimeElapsed);

  return (
    <div className="p-8 space-y-12">
      {/* Character Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {loading
        ? Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)
        : characters.map((char, index) => {

          const id = index + 1;
          const localImage = getCharacterImage(char.name);
          const positionClass = imageFraming[char.name] || "object-top";

          return (
            <div
              key={char.name}
              className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:scale-115 transition-transform duration-200"
            >
              {/* Image Section */}
              <div className="w-full h-64 bg-gray-700">
                <img
                  src={localImage || "/placeholder.jpg"}
                  alt={char.name}
                  onError={(e) =>
                    (e.currentTarget.src =
                      "https://starwars-visualguide.com/assets/img/placeholder.jpg")
                  }
                  className={`w-full h-full object-cover ${positionClass}`}
                />
              </div>

              {/* Info Section */}
              <div className="p-4 text-white">
                <h2 className="text-xl font-semibold text-blue-400 mb-1">
                  {char.name}
                </h2>
                <p className="text-sm text-gray-300">Height: {char.height} cm</p>
                <p className="text-sm text-gray-300">Mass: {char.mass} kg</p>
                <p className="text-sm text-gray-300">
                  Birth Year: {char.birth_year}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* /* Simple List of Names
      <div>
        <h2 className="text-2xl font-bold text-blue-400 mb-4">
          Character Name List
        </h2>
       <ul className="list-none text-gray-300 space-y-1">
        {characters.map((char) => (
            <li key={char.name} className="flex items-center space-x-2">
            <input
                type="checkbox"
                id={char.name}
                name={char.name}
                className="h-4 w-4 accent-indigo-500 rounded border-gray-600 focus:ring-2 focus:ring-indigo-400"
            />
            <label htmlFor={char.name} className="cursor-pointer">
                {char.name}
            </label>
            </li>
        ))}
        </ul>
      </div> */}
    </div>
  );
}
