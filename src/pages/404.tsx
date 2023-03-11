import { useSEO } from "@/hooks/useSEO";
import { type NextPage } from "next";
import { NextSeo } from "next-seo";
import React from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const NotFound: NextPage = () => {
  const SEO = useSEO({
    title: "Not Found",
    description: "Automate Archisketch Process for Archisktch Team",
  });

  return (
    <>
      <NextSeo {...SEO} />
      <div className="flex select-none flex-col items-center justify-center">
        <motion.img
          className="mb-[-3rem] w-96"
          draggable={false}
          src="/404.png"
          alt="404"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0 }}
        />
        <motion.h1
          className="mb-4 text-4xl font-bold text-gray-800"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          앗! 죄송해요.
        </motion.h1>
        <motion.p
          className="mb-8 text-center text-lg text-gray-500"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          요청하신 페이지를 찾을 수 없어요. <br />
          입력하신 주소가 정확한지 다시 한번 확인해주세요.
        </motion.p>
        <div>
          <Link
            href="/"
            className="inline-flex items-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-base font-medium text-white hover:bg-blue-600"
          >
            <ArrowLeftIcon className="mr-2 h-5 w-5" />
            이전 페이지로 돌아가기
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
