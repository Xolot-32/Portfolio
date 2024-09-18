import React, { useState, useRef, useCallback } from 'react';
import Vimeo from '@u-wave/react-vimeo';
import { Play, Pause } from 'lucide-react';
import Image from 'next/image';

interface VimeoVideoProps {
  videoId: string;
  title: string;
  description: string;
  logoSrc: string;
}

const VimeoVideo: React.FC<VimeoVideoProps> = ({ videoId, title, description, logoSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<any>(null);

  const togglePlay = useCallback(() => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pause();
      } else {
        playerRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const onReady = (player: any) => {
    playerRef.current = player;
  };

  return (
    <div className="relative aspect-video group">
      <Vimeo
        video={videoId}
        autoplay={false}
        muted={false}
        loop
        controls={false}
        responsive
        className="rounded-lg"
        onReady={onReady}
      />
      <div 
        className={`absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center transition-opacity duration-300 ${
          isPlaying ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="flex mb-1 p-1 bg-gray-400 bg-opacity-50 rounded-lg">
          <div className="w-14 h-14 relative">
            <Image
              src={logoSrc}
              alt={`Logo de ${title}`}
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
        <div className="text-center p-4">
          <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
          <p className="text-sm text-gray-300">{description}</p>
        </div>
      </div>
      <button
        onClick={togglePlay}
        className={`absolute bottom-4 right-4 bg-yellow-400 hover:bg-yellow-600 text-navy-900 font-bold p-2 rounded-full flex items-center justify-center transition-opacity duration-300 ${
          isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
        }`}
        aria-label={isPlaying ? 'Pause video' : 'Play video'}
      >
        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
      </button>
    </div>
  );
};

export default VimeoVideo;