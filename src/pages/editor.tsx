import React from "react";

import { useRedirectToTeamSelectionPage } from "@/hooks/useRedirectToTeamSelectionPage";
import { useSEO } from "@/hooks/useSEO";
import { NextSeo } from "next-seo";
import EditorTranslationForm from "@/components/EditorTranslationForm";

const Editor = () => {
  const SEO = useSEO({
    title: "Editor",
    description: "Automate Archisketch Process for Editor Team",
  });
  useRedirectToTeamSelectionPage();

  return (
    <>
      <NextSeo {...SEO} />
      <EditorTranslationForm />
    </>
  );
};

export default Editor;
