import { NextResponse } from 'next/server';

// This would normally use Spotify API with refresh token. For demo, return static.
export async function GET() {
  // In production, fetch from Spotify API using OAuth tokens
  const demoData = {
    isPlaying: true,
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    albumArt: 'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36',
    songUrl: 'https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMi3b',
  };

  // Uncomment below for real implementation
  // const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env;
  // ... OAuth flow ...

  return NextResponse.json(demoData);
}