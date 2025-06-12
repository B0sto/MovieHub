import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { updateSearchCount } from "@/lib/appwrite";

const API_BASE_URL = process.env.API_BASE_URL
const API_KEY = process.env.TMDB_API_KEY;
const API_OPTIONS = {
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

if (!API_KEY) {
  throw new Error("Not valid api key");
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const query = url.searchParams.get("query");
  const page = url.searchParams.get("page") || "2";

  const endpoint = query
    ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(
        query
      )}&page=${page}`
    : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${page}`;
  try {
    const response = await axios.get(endpoint, API_OPTIONS);

    if(query && response.data.results && response.data.results.length > 0) {
      await updateSearchCount({
        searchTerm: query,
        movie: response.data.results[0]
      })
    }

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error getting movies", error.message);
    return NextResponse.json(
      { error: "Error getting movies" },
      { status: 500 }
    );
  }
}
