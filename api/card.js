export default async function handler(req, res) {
  const { tcgPlayerId } = req.query;
  const DEFAULT_KEY = 'pokeprice_free_ecf3ab9f5004051b7ac21e9cfc81bce2f9398e27e524544d';
  const authHeader = req.headers.authorization;
  const key = (authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null) || DEFAULT_KEY;
  const response = await fetch(
    `https://www.pokemonpricetracker.com/api/v2/cards?tcgPlayerId=${encodeURIComponent(tcgPlayerId)}`,
    { headers: { 'Authorization': `Bearer ${key}` } }
  );
  const data = await response.json();
  res.setHeader('Access-Control-Allow-Origin', '*');
  const remaining = response.headers.get('X-RateLimit-Remaining');
  if (remaining != null) res.setHeader('X-RateLimit-Remaining', remaining);
  res.json(data);
}
