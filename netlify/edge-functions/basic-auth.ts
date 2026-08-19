// Gates every request behind HTTP Basic Auth for the preview deploy.
// Credentials come from Netlify environment variables (site settings ->
// Environment variables), never from this file, since this repo is public.

export default async (request: Request, context: any) => {
  const validUser = Deno.env.get("BASIC_AUTH_USER");
  const validPass = Deno.env.get("BASIC_AUTH_PASS");

  // If the env vars aren't configured, fail closed rather than open.
  if (!validUser || !validPass) {
    return new Response("Preview auth is not configured", { status: 503 });
  }

  const auth = request.headers.get("authorization");

  if (auth?.startsWith("Basic ")) {
    const decoded = atob(auth.slice(6));
    const separatorIndex = decoded.indexOf(":");
    const user = decoded.slice(0, separatorIndex);
    const pass = decoded.slice(separatorIndex + 1);

    if (user === validUser && pass === validPass) {
      return context.next();
    }
  }

  return new Response("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Caizin Preview"',
    },
  });
};

export const config = { path: "/*" };
