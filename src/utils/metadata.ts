import { isDev } from "./environment";

const getBaseUrl = () => {
  if (isDev) {
    return "http://localhost:3000";
  } else {
    return "https://archisketch-automate-process.vercel.app";
  }
};

export const metadata = {
  title: "Archi ﹒ ",
  description: "Automate Archisketch Process for Archisketch Team",
  tags: ["react", "typescript", "nextjs", "hooks"],
  url: getBaseUrl(),
  date: "2021-08-30T00:00:00.000Z",
  image: `${getBaseUrl()}/og-image.jpg`,
};
