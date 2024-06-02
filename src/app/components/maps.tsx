// components/Map.tsx

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
    <div className='place-details-with-map flex p-4 border-b border-gray-300 w-full h-96'>
      <div className='flex-grow h-full'>{MapComponent}</div>
    </div>
  );
};

export default Maps;
