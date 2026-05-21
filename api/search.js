export default async function handler(req, res) {
  const { query, tcgPlayerId } = req.query;
  const DEFAULT_KEY = 'pokeprice_free_ecf3ab9f5004051b7ac21e9cfc81bce2f9398e27e524544d';
  const authHeader = req.headers.authorization;
  const key = (authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null) || DEFAULT_KEY;
  const params = new URLSearchParams();
  if (tcgPlayerId) {
    params.set('tcgPlayerId', tcgPlayerId);
  } else {
    params.set('search', query || '');
    params.set('limit', '8');
  }
  const response = await fetch('https://www.pokemonpricetracker.com/api/v2/cards?' + params.toString(), {
    headers: { 'Authorization': 'Bearer ' + key }
  });
  const data = await response.json();
  res.setHeader('Access-Control-Allow-Origin', '*');
  const remaining = response.headers.get('X-RateLimit-Remaining');
  if (remaining != null) res.setHeader('X-RateLimit-Remaining', remaining);
  if (!response.ok) return res.status(response.status).json(data);
  res.json(data);
}
