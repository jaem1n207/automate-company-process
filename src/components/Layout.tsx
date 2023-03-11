import React from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/router";
import { classNames } from "@/utils/classes";
import Link from "next/link";
import { ROUTES } from "@/enum";

// const navigation = [
//   { name: "Dashboard", href: "/", current: false },
//   { name: "Editor", href: "/editor", current: false },
// ];

interface LayoutProps {
  children: React.ReactNode;
  /**
   * 현재 페이지의 경로
   *
   * 전달받은 페이지의 경로에는 레이아웃을 적용하지 않습니다.
   */
  path?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, path: pathProp }) => {
  const router = useRouter();

  // 현재 페이지가 주어진 경로와 일치하는지 확인
  const isMatchingPath = router.pathname === pathProp;

  const resetMyTeam = () => {
    localStorage.removeItem("my-team");
  };

  // React.useEffect(() => {
  //   const path = router.pathname;
  //   navigation.forEach((navItem) => {
  //     navItem.current = navItem.href === path;
  //   });
  // }, [router.pathname]);

  if (isMatchingPath) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-white">
      <Disclosure as="nav" className="bg-indigo-600">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Image
                      className="h-8 w-8"
                      src="/favicon-512.png"
                      alt="logo"
                      width={32}
                      height={32}
                    />
                  </div>
                  {/* <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-indigo-800 text-white"
                              : "text-gray-300 hover:bg-indigo-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div> */}
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <Link
                      href={ROUTES.TEAM_SELECTION}
                      onClick={resetMyTeam}
                      className="rounded-md bg-indigo-800 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                    >
                      팀 선택 다시 하기
                    </Link>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                <Disclosure.Button
                  key="Team Selection"
                  as="a"
                  href={ROUTES.TEAM_SELECTION}
                  onAuxClick={resetMyTeam}
                  className={classNames(
                    "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current="page"
                >
                  팀 선택 다시 하기
                </Disclosure.Button>
                {/* {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))} */}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <header className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900">
            {router.pathname === "/" ? "Dashboard" : "Editor"}
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 sm:px-0">{children}</div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
