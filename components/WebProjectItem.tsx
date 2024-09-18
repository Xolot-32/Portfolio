import React from 'react';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface WebProjectItemProps {
  title: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
}

const WebProjectItem: React.FC<WebProjectItemProps> = ({ title, description, imageUrl, projectUrl }) => {
  return (
    <div className="relative aspect-video group cursor-pointer overflow-hidden rounded-lg">
      <Image
        src={imageUrl}
        alt={title}
        layout="fill"
        objectFit="cover"
        className="transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-90">
        <div className="absolute top-0 left-0 p-4 text-white">
          <h3 className="text-lg text-blue-400 font-semibold mb-2">{title}</h3>
          <p className="text-sm text-gray-200">{description}</p>
        </div>
        <Link 
          href={projectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-4 right-4 bg-blue-500 hover:bg-yellow-400 text-navy-900 rounded-full p-3 transition-colors duration-300"
        >
          <ExternalLink size={24} />
        
        </Link>
      </div>
    </div>
  );
};

export default WebProjectItem;