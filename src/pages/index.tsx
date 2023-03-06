import { type NextPage } from "next";
import Head from "next/head";
// import { signIn, signOut, useSession } from "next-auth/react";
import { CheckIcon, CogIcon } from "@heroicons/react/24/solid";

// import { api } from "@/utils/api";
import TranslationForm from "@/components/TranslationForm";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useEffect, useState } from "react";
import SavePathModal from "@/components/SavePathModal";
import { toast } from "react-toastify";

const Home: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const [langPath, setLangPath] = useLocalStorage<string>("langPath", "");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleModalSave = (value: string) => {
    setLangPath(value);
    setIsModalVisible(false);
    toast.success("Language path set successfully!");
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    setIsModalVisible(!langPath);
  }, [langPath]);

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta
          name="description"
          content="Automate Archisketch Process for Dashboard Team"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <button
        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        onClick={() => setIsModalVisible(true)}
      >
        <CogIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
        Set Language Path
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
          Language path is set to: {langPath}
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
//       <p className="text-center text-2xl text-white">
//         {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
//         {secretMessage && <span> - {secretMessage}</span>}
//       </p>
//       <button
//         className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
//         onClick={sessionData ? () => void signOut() : () => void signIn()}
//       >
//         {sessionData ? "Sign out" : "Sign in"}
//       </button>
//     </div>
//   );
// };
