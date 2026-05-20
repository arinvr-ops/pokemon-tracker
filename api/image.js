export default async function handler(req, res) {
  const { url } = req.query;
  if (!url || !url.includes('tcgplayer-cdn.tcgplayer.com')) {
    return res.status(400).json({ error: 'Invalid URL' });
  }
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  res.setHeader('Content-Type', response.headers.get('content-type'));
  res.setHeader('Cache-Control', 'public, max-age=86400');
  res.send(Buffer.from(buffer));
}
