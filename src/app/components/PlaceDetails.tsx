import Image from 'next/image';
import React from 'react';

interface Photo {
  name: string;
  widthPx: number;
  heightPx: number;
  authorAttributions: {
    displayName: string;
    uri: string;
    photoUri: string;
  }[];
}

interface Place {
  displayName: {
    text: string;
  };
  location: {
    latitude: number;
    longitude: number;
  };
  photos: Photo[];
}

const PlaceDetails: React.FC<{ place: Place }> = ({ place }) => (
  <div className='place-details flex p-4 border-b border-gray-300'>
    <div className='flex-shrink-0 w-48'>
      {place.photos.slice(0, 2).map((photo, index) => {
        const photoUri = photo.authorAttributions[0].photoUri.startsWith('//')
          ? `https:${photo.authorAttributions[0].photoUri}`
          : photo.authorAttributions[0].photoUri;
        return (
          <div key={index} className='mb-2'>
            <Image
              src={photoUri}
              alt={photo.name}
              width={200}
              height={200}
              className='rounded-lg'
            />
          </div>
        );
      })}
    </div>
    <div className='ml-4'>
      <h2 className='text-xl font-semibold mb-2'>{place.displayName.text}</h2>
      <ul className='list-disc pl-4'>
        <li>
          Location: {place.location.latitude}, {place.location.longitude}
        </li>
        <li>Number of Photos: {place.photos.length}</li>
        {/* Add more details as needed */}
      </ul>
    </div>
  </div>
);

export default PlaceDetails;
