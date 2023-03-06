import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ToastContainer, Flip } from "react-toastify";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import Layout from "@/components/Layout";
import "react-toastify/dist/ReactToastify.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ToastContainer
        transition={Flip}
        position="top-center"
        theme="colored"
        autoClose={3000}
      />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
