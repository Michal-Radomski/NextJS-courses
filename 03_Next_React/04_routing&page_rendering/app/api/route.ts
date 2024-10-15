export function GET(request: Request): Response {
  console.log("request:", request);

  // return Response.json();
  return new Response("Hello!");
}

export function POST(request: Request): Response {
  console.log("request:", request);
  return new Response("Hello!");
}
