export default async function handler(req, res) {
  const { query } = req.query;
  const response = await fetch(
    `https://www.pokemonpricetracker.com/api/v2/cards?search=${encodeURIComponent(query)}&limit=20`,
    {
      headers: {
        'Authorization': 'Bearer pokeprice_free_ecf3ab9f5004051b7ac21e9cfc81bce2f9398e27e524544d'
      }
    }
  );
  const data = await response.json();
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json(data);
}
