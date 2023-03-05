import { useEffect, useState } from "react";
import { type Translations } from "@/models/language";

import { useTranslate } from "@/hooks/useTranslation";
import TranslationResultsInputs from "./TranslationResultsInputs";

const TranslationForm = () => {
  const [text, setText] = useState("");
  const { ko, en, ja, vi, isLoading, translateText } = useTranslate();
  const [translations, setTranslations] = useState<Translations>({
    ko: "",
    en: "",
    ja: "",
    vi: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleTranslateClick = () => {
    translateText(text).catch((error) => console.error(error));
  };

  useEffect(() => {
    if (!isLoading) {
      setTranslations({ ko, en, ja, vi });
    }
  }, [en, isLoading, ja, ko, vi]);

  return (
    <div>
      <input type="text" value={text} onChange={handleInputChange} />
      <button disabled={isLoading} onClick={handleTranslateClick}>
        Translate
      </button>
      <TranslationResultsInputs
        onSubmit={handleTranslateClick}
        initialValues={translations}
      />
    </div>
    // <form onSubmit={handleSubmit} className="mx-auto max-w-md">
    //   <div className="mb-4">
    //     <label htmlFor="key" className="mb-1 block font-medium text-gray-700">
    //       Key to Add
    //     </label>
    //     <input
    //       type="text"
    //       id="key"
    //       name="key"
    //       value={formValues.key}
    //       onChange={handleChange}
    //       required
    //       className="w-full rounded-md border px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
    //     />
    //   </div>

    //   <div className="mb-4">
    //     <label htmlFor="value" className="mb-1 block font-medium text-gray-700">
    //       Value to Add
    //     </label>
    //     <input
    //       type="text"
    //       id="value"
    //       name="value"
    //       value={formValues.value}
    //       onChange={handleChange}
    //       required
    //       className="w-full rounded-md border px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
    //     />
    //   </div>

    //   <div className="mb-4">
    //     <label
    //       htmlFor="country"
    //       className="mb-1 block font-medium text-gray-700"
    //     >
    //       Country
    //     </label>
    //     <Listbox
    //       value={formValues.country}
    //       onChange={(value) => {
    //         setFormValues((prevValues) => ({
    //           ...prevValues,
    //           country: value,
    //         }));
    //       }}
    //     >
    //       <div className="relative">
    //         <Listbox.Button className="flex w-full items-center justify-between rounded-md border px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500">
    //           <span className="block truncate">{formValues.country.name}</span>
    //           <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
    //         </Listbox.Button>
    //         <Transition
    //           as={React.Fragment}
    //           enter="transition ease-out duration-100"
    //           enterFrom="transform opacity-0 scale-95"
    //           enterTo="transform opacity-100 scale-100"
    //           leave="transition ease-in duration-75"
    //           leaveFrom="transform opacity-100 scale-100"
    //           leaveTo="transform opacity-0 scale-95"
    //         >
    //           <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
    //             {Countries.map((country) => (
    //               <Listbox.Option
    //                 key={country.code}
    //                 className={({ active }) =>
    //                   `${
    //                     active ? "bg-blue-500 text-white" : "text-gray-900"
    //                   } relative cursor-default select-none py-2 pl-10 pr-4`
    //                 }
    //                 value={country}
    //               >
    //                 {({ selected, active }) => (
    //                   <>
    //                     <span
    //                       className={`${
    //                         selected ? "font-medium" : "font-normal"
    //                       } block truncate`}
    //                     >
    //                       {country.name}
    //                     </span>
    //                     {selected ? (
    //                       <span
    //                         className={`${
    //                           active ? "text-white" : "text-blue-500"
    //                         } absolute inset-y-0 left-0 flex items-center pl-3`}
    //                       >
    //                         <CheckIcon className="h-5 w-5" />
    //                       </span>
    //                     ) : null}
    //                   </>
    //                 )}
    //               </Listbox.Option>
    //             ))}
    //           </Listbox.Options>
    //         </Transition>
    //       </div>
    //     </Listbox>
    //   </div>

    //   <div className="mb-4">
    //     <button
    //       type="submit"
    //       className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white"
    //     >
    //       번역 실행
    //     </button>
    //   </div>
    // </form>
  );
};

export default TranslationForm;
