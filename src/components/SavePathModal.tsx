import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";

import { regex } from "@/utils/regex";
import { XMarkIcon } from "@heroicons/react/24/solid";
import axios, { type AxiosResponse } from "axios";
import {
  type ReadLangFilesParamsType,
  type ReadLangFIlesReturnType,
} from "@/models/api";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

type Props = {
  initialValue: string;
  visible: boolean;
  onClose: () => void;
  onSave: (value: string) => void;
};

const SavePathModal = ({ initialValue, visible, onClose, onSave }: Props) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const modalRef = useRef<HTMLDivElement>(null);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (error) return;

    if (value.trim() === "") {
      setError("값을 입력해주세요.");
      return;
    }

    try {
      const params: ReadLangFilesParamsType = {
        langPath: value,
      };

      const { data } = await axios.get<ReadLangFIlesReturnType>(
        "/api/readLangFiles",
        {
          params,
        }
      );
      onSave(value);
      toast.success(data.message);
      onClose();
      router.reload();
    } catch (error) {
      console.error(error);

      if (axios.isAxiosError(error)) {
        const { response } = error;
        if (response) {
          const { data } = response as AxiosResponse<ReadLangFIlesReturnType>;
          if (window !== undefined) {
            const langPath = localStorage.getItem("langPath");
            if (langPath) {
              localStorage.removeItem("langPath");
            }
            // setTimeout(() => {
            //   router.reload();
            // }, 1000);
          }
          return toast.error(data.message, {
            autoClose: 20_000,
          });
        }
      }

      return toast.error("langPath를 저장하는데 실패했어요. :(");
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.trim();
    setValue(val);
    if (val === "") {
      setError("");
    } else if (regex.directoryPath.test(val) === false || val.includes(" ")) {
      setError("유효한 디렉토리 경로를 입력해주세요.");
    } else {
      setError("");
    }
  };

  const handleCancel = () => {
    if (initialValue) {
      onClose();
      setValue(initialValue);
    }
  };

  const errorVariants = {
    hidden: {
      opacity: 0,
      height: 0,
    },
    visible: {
      opacity: 1,
      height: "auto",
    },
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
      }
    };

    if (!initialValue) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (!initialValue) {
        document.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [onClose, initialValue]);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <Transition appear show={visible} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={handleCancel}
        ref={modalRef}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <span className="inline-block h-screen align-middle" aria-hidden="true">
          &#8203;
        </span>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                {initialValue && (
                  <button
                    className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-600"
                    onClick={onClose}
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                )}
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Set Language Path
                </Dialog.Title>
                <form
                  className="space-y-4"
                  onSubmit={(e) => void handleSave(e)}
                >
                  <div className="mt-2">
                    <input
                      type="text"
                      value={value}
                      onChange={handleInput}
                      className={`border ${
                        error ? "border-red-500" : "border-gray-300"
                      } w-full rounded-md px-3 py-2`}
                      placeholder="C:\\example\\path"
                    />

                    <AnimatePresence>
                      {error && (
                        <motion.div
                          className="mt-1 text-sm text-red-500"
                          variants={errorVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                        >
                          {error}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="mt-4">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SavePathModal;
