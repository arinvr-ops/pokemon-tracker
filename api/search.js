export default async function handler(req, res) {
  const { query, tcgPlayerId } = req.query;
  const DEFAULT_KEY = 'pokeprice_free_ecf3ab9f5004051b7ac21e9cfc81bce2f9398e27e524544d';
  const authHeader = req.headers.authorization;
  const key = (authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null) || DEFAULT_KEY;
  let url = 'https://www.pokemonpricetracker.com/api/v2/cards?';
  if (tcgPlayerId) {
    url += 'tcgPlayerId=' + tcgPlayerId;
  } else {
    url += 'search=' + encodeURIComponent(query) + '&limit=8';
  }
  const response = await fetch(url, {
    headers: { 'Authorization': 'Bearer ' + key }
  });
  const data = await response.json();
  res.setHeader('Access-Control-Allow-Origin', '*');
  const remaining = response.headers.get('X-RateLimit-Remaining');
  if (remaining != null) res.setHeader('X-RateLimit-Remaining', remaining);
  res.json(data);
}
