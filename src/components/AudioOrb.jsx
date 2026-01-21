import { useEffect, useRef, useState } from "react";
import { battlefront2Playlist } from "../assets/SW-Audio/playlists";

export default function AudioOrb() {
  const audioRef = useRef(null);

  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Shuffle BF2 playlist once on mount
  useEffect(() => {
    const shuffled = [...battlefront2Playlist].sort(
      () => Math.random() - 0.5
    );
    setPlaylist(shuffled);
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying((prev) => !prev);
  };

  const playNextTrack = () => {
    setCurrentIndex((prev) =>
      prev + 1 < playlist.length ? prev + 1 : 0
    );
  };

  return (
    <div className="fixed bottom-10 right-15 z-50 w-fit">
      <button
        onClick={togglePlay}
        aria-label="Toggle background music"
        className={`
            cursor-pointer
          flex items-center justify-center
          w-14 h-14 rounded-full
          text-white text-xl
          bg-gradient-to-br from-indigo-500 to-indigo-800
          shadow-[0_0_24px_rgba(99,102,241,0.7)]
          transition-transform duration-200
          hover:scale-110
          ${isPlaying ? "animate-pulse" : ""}
        `}
      >
        ♪
      </button>

      {playlist.length > 0 && (
        <audio
          ref={audioRef}
          src={playlist[currentIndex].src}
          onEnded={playNextTrack}
        />
      )}
    </div>
  );
}
