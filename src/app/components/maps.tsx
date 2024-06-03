// components/Map.tsx

import { Rating } from '@smastrom/react-rating';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import React, { useState } from 'react';

import { Place } from '@/app/types/Places';

const Maps: React.FC<{ place: Place }> = ({ place }) => {
  const [thisPlace, setThisPlace] = useState(place);
  const [mapCenter, setMapCenter] = useState({
    lat: place.location.latitude,
    lng: place.location.longitude,
  });

  if (!place || !mapCenter) return <div>Loading...</div>;

  const MapComponent = (
    <APIProvider apiKey='AIzaSyAx-dM2RiFz9rCIexmVm88gzBo7CaU62sw'>
      <Map center={mapCenter} zoom={15}>
        <Marker position={mapCenter} />
      </Map>
    </APIProvider>
  );

  return (
    <div
      className='flex p-4 border-b border-gray-300 w-full'
      style={{ height: '36rem' }}
    >
      <div className='w-1/3 bg-white p-4'>
        <h2 className='text-2xl font-bold mb-4'>
          {thisPlace.displayName.text}
        </h2>
        <div className='flex items-center mb-4'>
          <Rating style={{ maxWidth: 120 }} value={3} readOnly />
          <span className='ml-2 text-2xl font-bold'>3/5 - </span>
          <span className='ml-2 text-2xl font-bold'>$$$</span>
        </div>
        <p className='text-lg mb-4'>{thisPlace.primaryTypeDisplayName.text}</p>
        <div>
          <a href={thisPlace.websiteUri} className='text-blue-500 underline'>
            {thisPlace.websiteUri}
          </a>
        </div>
        <div>
          <a className='text-blue-500 underline'>
            {thisPlace.nationalPhoneNumber}
          </a>
        </div>
      </div>
      <div className='w-2/3 h-full'>{MapComponent}</div>
    </div>
  );
};

export default Maps;
