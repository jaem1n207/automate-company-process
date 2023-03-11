import { metadata } from "@/utils/metadata";
import { type NextSeoProps } from "next-seo";
import { useRouter } from "next/router";

interface SEOProps {
  title: string;
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

  const title = `${metadata.title}${titleProp}`;
  const description =
    descriptionProp ?? "Automate Archisketch Process for Archisketch Team";
  const url = `${metadata.url}${pathname}`;
  const image = imageProp ?? metadata.image;

  return {
    additionalLinkTags: [
      {
        rel: "icon",
        href: "/favicon.png",
      },
    ],
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
          alt: "Archi ﹒ Automate",
        },
      ],
    },
  };
};
