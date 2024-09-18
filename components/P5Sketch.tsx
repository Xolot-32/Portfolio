import React, { useState } from 'react';
import { Play, Pause, RefreshCw, ExternalLink } from 'lucide-react';

interface P5SketchProps {
  src: string;
  title: string;
  description: string;
}

const P5Sketch: React.FC<P5SketchProps> = ({ src, title, description }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggle = () => {
    if (!isLoaded) {
      setIsLoaded(true);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleReload = () => {
    setIsLoaded(false);
    setIsPlaying(false);
    setTimeout(() => {
      setIsLoaded(true);
      setIsPlaying(true);
    }, 100);
  };

  // Función para obtener el enlace del editor
  const getEditorLink = (fullLink: string) => {
    return fullLink.replace('/full/', '/editor/');
  };

  return (
    <div className="relative aspect-square rounded-lg overflow-hidden border border-gray-200">
      <div className="absolute inset-0">
        {isLoaded && (
          <iframe
            src={isPlaying ? src : 'about:blank'}
            className="w-full h-full border-0"
            title={title}
            allow="autoplay; fullscreen; encrypted-media"
          />
        )}
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-70 text-white p-4">
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-sm text-gray-200 mb-2">{description}</p>
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
          <a 
            href={getEditorLink(src)}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 hover:bg-green-600 text-white rounded-full p-2 transition-colors duration-300"
            aria-label="Open in p5js editor"
          >
            <ExternalLink size={20} />
          </a>
            
            <button 
              onClick={handleReload}
              className="bg-gray-500 hover:bg-gray-600 text-white rounded-full p-2 transition-colors duration-300"
              aria-label="Reload sketch"
            >
              <RefreshCw size={20} />
            </button>
            <button 
              onClick={handleToggle}
              className="bg-yellow-400 hover:bg-yellow-600 text-navy-900 rounded-full p-2 transition-colors duration-300"
              aria-label={isPlaying ? "Pause sketch" : "Play sketch"}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default P5Sketch;