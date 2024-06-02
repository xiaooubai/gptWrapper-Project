export interface Place {
  id: string;
  displayName: {
    text: string;
    languageCode: string;
  };
  location: {
    latitude: number;
    longitude: number;
  };
}
