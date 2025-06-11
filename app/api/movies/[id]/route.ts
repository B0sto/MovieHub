import { NextResponse } from "next/server";
import axios from 'axios';

const API_BASE_URL = process.env.API_BASE_URL
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

  const res = await axios.get(`${API_BASE_URL}/movie/${id}?api_key=${API_KEY}`, API_OPTIONS);


  const movie = await res.data;
  return NextResponse.json(movie);
}
