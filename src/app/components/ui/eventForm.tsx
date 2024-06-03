import React, { useState } from 'react';

import { Place } from '@/app/types/Places';

import { Input } from './input'; // Ensure the path is correct

const EventDetailsForm: React.FC<{ onFormSubmit: (data: any) => void }> = ({
  onFormSubmit,
}) => {
  const [guests, setGuests] = useState('');
  const [location, setLocation] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [theme, setTheme] = useState('');
  const [budget, setBudget] = useState('');
  const [requirements, setRequirements] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Combine Location, Theme, and Other Requirements into one string
    const textQuery = `${location} ${theme}`;
    console.log('Text Query:', textQuery);

    // Make the POST request to your Next.js API endpoint
    try {
      console.log('eeeeeedce');
      const response = await fetch('/api/textSearch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ textQuery }), // Sending the data as expected by your API
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
      let data: { places: Place[] };
      try {
        data = await response.json();
      } catch (error) {
        console.error('Error parsing response as JSON:', error);
        throw error; // Re-throw the error so it can be handled further up the call stack
      }
      console.log('rrr');
      console.log('API Response:', data); // Log the entire data object
      alert(data);

      // Access the places data correctly
      if (data && data.places) {
        onFormSubmit(data.places); // Pass the places data to the parent component
      } else {
        console.error('Places data not found in the API response');
      }
    } catch (error) {
      console.error('API Error:', error);
      alert('Failed to submit the form. Check console for errors.');
    }
  };

  return (
    <div className='bg-white p-4 shadow'>
      <h1 className='text-xl font-semibold mb-4'>
        Hey there! Welcome to Dabble, excited to help you plan your next event.
        Can you start by providing a few details?
      </h1>
      <form className='space-y-4' onSubmit={handleSubmit}>
        <Input
          id='guests'
          name='guests'
          placeholder='100'
          type='number'
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          className='mt-1 block w-full'
        />
        <Input
          id='location'
          name='location'
          placeholder='Enter location'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className='mt-1 block w-full'
        />
        <Input
          id='eventTime'
          name='eventTime'
          placeholder='Enter time'
          value={eventTime}
          onChange={(e) => setEventTime(e.target.value)}
          className='mt-1 block w-full'
        />
        <Input
          id='theme'
          name='theme'
          placeholder='e.g., Casual, Formal, Theme Party'
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className='mt-1 block w-full'
        />
        <Input
          id='budget'
          name='budget'
          placeholder='Enter your budget'
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className='mt-1 block w-full'
        />
        <Input
          id='requirements'
          name='requirements'
          placeholder='Any other specifics'
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          className='mt-1 block w-full'
        />
        <button
          type='submit'
          className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-md'
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EventDetailsForm;
