import React, { useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { type LanguageLabel } from "@/models/language";
import { useMutation } from "@tanstack/react-query";

interface Country {
  name: string;
  code: string;
}

interface FormValues {
  key: string;
  value: string;
  country: Country;
}

type InputValues = {
  [key in LanguageLabel]: string;
};

const translateText = async (text: string, target: string): Promise<string> => {
  // const key = env.GOOGLE_TRANSLATE_API_KEY;
  const res = await fetch(
    `https://translation.googleapis.com/language/translate/v2?key=AIzaSyDQrxShV3XQsYSk6Kq_-tQefpvL8rnampQ&q=${text}&target=${target}`,
    {
      method: "POST",
    }
  );
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data = await res.json();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
  return data.data.translations[0].translatedText;
};

const Countries: Country[] = [
  { name: "🇰🇷 Korea, Republic of", code: "KR" },
  { name: "🇺🇸 United States", code: "US" },
  { name: "🇯🇵 Japan", code: "JP" },
  { name: "🇻🇳 Vietnam", code: "VN" },
];

const TranslationForm = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    key: "",
    value: "",
    country: Countries[0] || { name: "", code: "" },
  });
  const [translation, setTranslation] = useState<InputValues>({
    ko: "",
    en: "",
    ja: "",
    vi: "",
  });

  const { isLoading, mutate } = useMutation(
    ["translateText", formValues.value],
    async () => {
      const { value } = formValues;
      const results = await Promise.all([
        translateText(value, "ko"),
        translateText(value, "en"),
        translateText(value, "ja"),
        translateText(value, "vi"),
      ]);
      return {
        ko: results[0],
        en: results[1],
        ja: results[2],
        vi: results[3],
      };
    },
    {
      onSuccess: (data) => {
        setTranslation(data);
        console.log(data);
      },
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // submit form values to server or API
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md">
      <div className="mb-4">
        <label htmlFor="key" className="mb-1 block font-medium text-gray-700">
          Key to Add
        </label>
        <input
          type="text"
          id="key"
          name="key"
          value={formValues.key}
          onChange={handleChange}
          required
          className="w-full rounded-md border px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="value" className="mb-1 block font-medium text-gray-700">
          Value to Add
        </label>
        <input
          type="text"
          id="value"
          name="value"
          value={formValues.value}
          onChange={handleChange}
          required
          className="w-full rounded-md border px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="country"
          className="mb-1 block font-medium text-gray-700"
        >
          Country
        </label>
        <Listbox
          value={formValues.country}
          onChange={(value) => {
            setFormValues((prevValues) => ({
              ...prevValues,
              country: value,
            }));
          }}
        >
          <div className="relative">
            <Listbox.Button className="flex w-full items-center justify-between rounded-md border px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500">
              <span className="block truncate">{formValues.country.name}</span>
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
            </Listbox.Button>
            <Transition
              as={React.Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {Countries.map((country) => (
                  <Listbox.Option
                    key={country.code}
                    className={({ active }) =>
                      `${
                        active ? "bg-blue-500 text-white" : "text-gray-900"
                      } relative cursor-default select-none py-2 pl-10 pr-4`
                    }
                    value={country}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`${
                            selected ? "font-medium" : "font-normal"
                          } block truncate`}
                        >
                          {country.name}
                        </span>
                        {selected ? (
                          <span
                            className={`${
                              active ? "text-white" : "text-blue-500"
                            } absolute inset-y-0 left-0 flex items-center pl-3`}
                          >
                            <CheckIcon className="h-5 w-5" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>

      <div className="mb-4">
        <button
          type="submit"
          className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white"
        >
          번역 실행
        </button>
      </div>
    </form>
  );
};

export default TranslationForm;
