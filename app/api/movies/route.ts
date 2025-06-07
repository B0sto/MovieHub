import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.TMDB_API_KEY;
const API_OPTIONS = {
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`
    }
}

if (!API_KEY) {
  throw new Error("Not valid api key");
}

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const query = url.searchParams.get("query");

  const endpoint = query
    ? `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        query
      )}`
    : `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc`;

  try {
    const response = await axios.get(endpoint, API_OPTIONS);

    return NextResponse.json(response.data);

  } catch (error: any) {
    console.error("Error getting movies", error.message);
    return NextResponse.json({error: "Error getting movies"}, {status: 500})
    
  }
}
