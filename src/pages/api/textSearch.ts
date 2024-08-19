// pages/api/textSearch.ts
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const GOOGLE_PLACES_API_ENDPOINT =
  'https://places.googleapis.com/v1/places:searchText';
const GOOGLE_PLACES_API_KEY = '';
const pageSize = 3;

const fetchPlaces = async (textQuery: string): Promise<any> => {
  try {
    console.log('Fetching data from Google Places API');

    // Define the request body with additional parameters
    const requestBody = { textQuery, pageSize };

    const apiKey = GOOGLE_PLACES_API_KEY || '';
    if (!apiKey) {
      throw new Error('Google Places API key is not defined');
    }

    console.log('API Key:', apiKey);
    console.log('Request Body:', requestBody);

    // Define headers with proper typing
    const headers = {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY,
      'X-Goog-FieldMask':
        'places.id,places.displayName,places.primaryTypeDisplayName,places.location,places.priceLevel,places.reservable,places.websiteUri,places.nationalPhoneNumber',
    };

    console.log('Request Headers:', headers);
    console.log('Request Body:', requestBody);

    const response = await axios.post(GOOGLE_PLACES_API_ENDPOINT, requestBody, {
      headers,
    });

    console.log('Response Status:', response.status);
    console.log('Response Headers:', response.headers);
    console.log('Response Data:', JSON.stringify(response.data, null, 2));

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        'Error response from Google Places API:',
        error.response?.data,
      );
      throw new Error(
        `Failed to fetch data from the Google Places API: ${error.response?.data}`,
      );
    } else {
      console.error('Error fetching data from Google Places API:', error);
      throw new Error(`Error fetching data: ${error}`);
    }
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('API Route hit');
  console.log('Request body:', req.body);
  try {
    const { textQuery } = req.body;

    if (!textQuery) {
      console.error('Text query is missing');
      return res.status(400).json({ error: 'Text query is required' });
    }

    console.log('Text query received:', textQuery);

    const placesData = await fetchPlaces(textQuery);

    res.status(200).json(placesData);
  } catch (error) {
    console.error('Error in API route:', error);
    res.status(500).json({ error: error });
  }
};

export default handler;
