//b898c076a1214cafa52b8d5ff048051d
// Detects the visitor's own IP automatically when no `ip` param is passed
export const getUserGeoData = async () => {
  const API_KEY = 'b898c076a1214cafa52b8d5ff048051d';

  const response = await fetch(
    `https://api.ipgeolocation.io/v3/ipgeo?apiKey=${API_KEY}&fields=location,currency,country_metadata`
  );

  const data = await response.json();
  return data;
};

// getUserGeoData().then(data => {
//   console.log('Country:', data.location.country_name);
//   console.log('Currency code:', data.currency.code);     // e.g. "EUR"
//   console.log('Currency symbol:', data.currency.symbol); // e.g. "€"
//   console.log('Dial code:', data.country_metadata.calling_code); // e.g. "+49"
//   console.log('Flag URL:', data.location.country_flag);
// });