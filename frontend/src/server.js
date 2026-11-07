const localServer = "http://localhost:8000/api/v2";
const codespacesServer =
  typeof window !== "undefined" &&
  window.location.hostname.endsWith(".app.github.dev")
    ? `https://${window.location.hostname.replace(
        /-\d+\.app\.github\.dev$/,
        "-8000.app.github.dev"
      )}/api/v2`
    : localServer;

export const server = import.meta.env.VITE_API_URL || codespacesServer;
