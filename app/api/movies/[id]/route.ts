import { NextResponse } from "next/server";
import axios from "axios";

const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY = process.env.TMDB_API_KEY;
const API_OPTIONS = {
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  const params = await context.params;
  const id = params.id;

  if (!API_KEY) {
    return NextResponse.json({ error: "Missing TMDB API key" }, { status: 404 });
  }

  const movieRes = await axios.get(`${API_BASE_URL}/movie/${id}`, API_OPTIONS);
  const movie = movieRes.data;

  const videoRes = await axios.get(`${API_BASE_URL}/movie/${id}/videos`, API_OPTIONS);
  const videos = videoRes.data.results;

  const trailer = videos.find(
    (v: any) => v.type === "Trailer" && v.site === "YouTube"
  );

  movie.trailer_url = trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;

  return NextResponse.json(movie);
}
