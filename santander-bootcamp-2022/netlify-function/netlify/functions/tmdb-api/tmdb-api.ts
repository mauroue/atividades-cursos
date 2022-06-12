import { Handler } from "@netlify/functions";

export const handler: Handler = async (event, context) => {
  const { name = "stranger" } = event.queryStringParameters!;

  try {
    fetch(
      `https://api.tmdb.org/3/authentication/token/new?api_key=${process.env.TMDB_API_KEY}`
    );
  } catch (err) {
    console.error("Error fetching token");
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello, ${name}!`,
    }),
  };
};
