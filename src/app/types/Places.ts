export interface Place {
  id: string;
  displayName: {
    text: string;
    languageCode: string;
  };
  primaryTypeDisplayName: {
    text: string;
    languageCode: string;
  };
  location: {
    latitude: number;
    longitude: number;
  };
  priceLevel: string;
  reservable: boolean;
  websiteUri: string;
  nationalPhoneNumber: string;
}
