import { useEffect, useState } from "react";

import VectorA from "../assets/Vectors/VectorA.svg";
import VectorB from "../assets/Vectors/VectorB.svg";
import VectorC from "../assets/Vectors/VectorC.svg";
import VectorD from "../assets/Vectors/VectorD.svg";
import VectorE from "../assets/Vectors/VectorE.svg";

const vectors = [VectorA, VectorB, VectorC, VectorD, VectorE];


export default function SkeletonCard() {
  const [currentVector, setCurrentVector] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVector((prev) => (prev + 1) % vectors.length);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden animate-pulse">
      {/* HUD Vector Slideshow */}
      <div className="relative w-full h-64 bg-gray-900 flex items-center justify-center overflow-hidden">
        <img
          src={vectors[currentVector]}
          alt=""
          aria-hidden="true"
          className="absolute w-3/4 h-3/4 object-contain opacity-80 transition-opacity duration-150"
        />
      </div>

      {/* Fake text */}
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-700 rounded w-2/3"></div>
        <div className="h-3 bg-gray-700 rounded w-1/2"></div>
        <div className="h-3 bg-gray-700 rounded w-1/3"></div>
      </div>
    </div>
  );
}
