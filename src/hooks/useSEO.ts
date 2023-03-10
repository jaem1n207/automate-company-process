// import { env } from "@/env.mjs";
import { isDev } from "@/utils/environment";
import { type NextSeoProps } from "next-seo";
import { useRouter } from "next/router";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
}

export const useSEO = ({
  title: titleProp,
  description: descriptionProp,
  image: imageProp,
}: SEOProps): NextSeoProps => {
  const router = useRouter();
  const { pathname } = router;

  // const websiteUrl = isDev ? env.NEXTAUTH_URL : "notyet.com";

  const title = titleProp ?? "Archi ﹒ Automate";
  const description =
    descriptionProp ?? "Automate Archisketch Process for Archisketch Team";
  // const url = `${websiteUrl}${pathname}`;
  // const image = imageProp ?? `${websiteUrl}/favicon.png`;
  const url = `https://archi-automate.vercel.app${pathname}`;
  const image = imageProp ?? `https://archi-automate.vercel.app/favicon.png`;

  return {
    title,
    description,
    canonical: url,
    openGraph: {
      type: "website",
      locale: "ko_KR",
      url,
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: "Ben ﹒ Automate",
        },
      ],
    },
  };
};
