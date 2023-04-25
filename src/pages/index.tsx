import { type NextPage } from "next";
// import { signIn, signOut, useSession } from "next-auth/react";
import { CheckIcon, CogIcon } from "@heroicons/react/24/solid";

import TranslationForm from "@/components/TranslationForm";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useEffect, useState } from "react";
import SavePathModal from "@/components/SavePathModal";
import { useSEO } from "@/hooks/useSEO";
import { NextSeo } from "next-seo";
import { useRedirectToTeamSelectionPage } from "@/hooks/useRedirectToTeamSelectionPage";
import { LOCAL_STORAGE_KEYS } from "@/enum";

const Home: NextPage = () => {
  const SEO = useSEO({
    title: "TeamB",
    description: "Automate Archisketch Process for TeamB Team",
  });
  useRedirectToTeamSelectionPage();

  const [langPath, setLangPath] = useLocalStorage<string>(
    LOCAL_STORAGE_KEYS.LANG_PATH,
    ""
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleModalSave = (value: string) => {
    setLangPath(value);
    setIsModalVisible(false);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    setIsModalVisible(!langPath);
  }, [langPath]);

  return (
    <>
      <NextSeo {...SEO} />
      <button
        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        onClick={() => setIsModalVisible(true)}
      >
        <CogIcon className="mr-2 -ml-1 h-5 w-5" aria-hidden="true" />
        언어 파일 경로 설정
      </button>
      <SavePathModal
        initialValue={langPath}
        visible={isModalVisible}
        onClose={handleModalClose}
        onSave={handleModalSave}
      />
      {langPath && (
        <div className="my-4 flex items-center rounded-md bg-green-100 p-2 text-green-800">
          <CheckIcon className="mr-2 h-5 w-5" aria-hidden="true" />
          {/* Language path is set to: {langPath} */}
          언어 파일 경로가 설정되었습니다. ({langPath})
        </div>
      )}
      <TranslationForm />
    </>
  );
};

export default Home;

// const AuthShowcase: React.FC = () => {
//   const { data: sessionData } = useSession();

//   const { data: secretMessage } = api.example.getSecretMessage.useQuery(
//     undefined, // no input
//     { enabled: sessionData?.user !== undefined }
//   );

//   return (
//     <div className="flex flex-col items-center justify-center gap-4">
//       <p className="text-2xl text-center text-white">
//         {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
//         {secretMessage && <span> - {secretMessage}</span>}
//       </p>
//       <button
//         className="px-10 py-3 font-semibold text-white no-underline transition rounded-full bg-white/10 hover:bg-white/20"
//         onClick={sessionData ? () => void signOut() : () => void signIn()}
//       >
//         {sessionData ? "Sign out" : "Sign in"}
//       </button>
//     </div>
//   );
// };
