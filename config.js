export const BASE_URL =
  import.meta.env.VITE_TEST_VAR === "development"
    ? "http://localhost:3500/api/v1"
    : "https://amazon-clone-be.vercel.app/api/v1";
