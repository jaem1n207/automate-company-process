import Head from "next/head";
import React from "react";

import { useRedirectToTeamSelectionPage } from "@/hooks/useRedirectToTeamSelectionPage";

const Editor = () => {
  useRedirectToTeamSelectionPage();

  return (
    <>
      <Head>
        <title>Editor</title>
        <meta
          name="description"
          content="Automate Archisketch Process for Editor Team"
        />
        <link rel="icon" href="/favicon-512.png" />
      </Head>
      Editor
    </>
  );
};

export default Editor;
