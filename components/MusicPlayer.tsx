import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Play, Pause, Volume2 } from 'lucide-react'

interface Song {
  type: 'soundcloud' | 'udio';
  src: string;
  title: string;
}

interface MusicPlayerProps {
  songs: Song[];
  sunoLink: string;
  soundcloudLink: string;
  udioLink: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ songs, sunoLink, soundcloudLink,udioLink }) => {
    const [currentSongIndex, setCurrentSongIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)

  const nextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
  };

  const prevSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
  };
 
  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  };

  const currentSong = songs[currentSongIndex];

  return (
    <div className="w-full max-w-3xl mx-auto bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-2xl p-6">
   <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">{currentSong.title}</h2>
        </div>
      
    <div className="relative aspect-video mb-6">
      {currentSong.type === 'soundcloud' && (
        <iframe
          width="100%"
          height="100%"
          scrolling="no"
          frameBorder="no"
          allow="pause"
          src={currentSong.src}
          className="rounded-lg"
        ></iframe>
      )}
      {currentSong.type === 'udio' && (
        <iframe
          width="100%"
          height="100%"
          src={currentSong.src}
          className="rounded-lg"
        ></iframe>
        )}
      </div>
     
      <div className="flex justify-center items-center space-x-4 mb-6">
        <button onClick={prevSong} className="bg-gray-600 hover:bg-yellow-400 text-white rounded-full p-3 transition duration-300 ease-in-out transform hover:scale-110">
          <ChevronLeft size={24} />
        </button>
        <div className="flex justify-center space-x-4">
        <a href={sunoLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-200 transition duration-300 ease-in-out">
          Suno <ExternalLink size={18} className="inline" />
        </a>
        <a href={soundcloudLink} target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-200 transition duration-300 ease-in-out">
          SoundCloud <ExternalLink size={18} className="inline" />
        </a>
        <a href={udioLink} target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-300 transition duration-300 ease-in-out">
          Udio <ExternalLink size={18} className="inline" />
        </a>
      </div>
        <button onClick={nextSong} className="bg-gray-600 hover:bg-yellow-400 text-white rounded-full p-3 transition duration-300 ease-in-out transform hover:scale-110">
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;