import { useState } from "react";
import { useRouter } from "next/router";
import { type Variants, motion } from "framer-motion";
import { DashboardIcon, EditorIcon } from "@/components/icons";
import { LOCAL_STORAGE_KEYS, ROUTES } from "@/enum";
import { type Team } from "@/models/team";
import { useSEO } from "@/hooks/useSEO";
import { NextSeo } from "next-seo";

interface TeamOption {
  label: string;
  value: Team;
  icon: JSX.Element;
  modalIcon: JSX.Element;
}

const teamOptions: TeamOption[] = [
  {
    label: "Dashboard",
    value: "dashboard",
    icon: <DashboardIcon className="h-2/6 w-2/4" />,
    modalIcon: <DashboardIcon />,
  },
  {
    label: "Editor",
    value: "editor",
    icon: <EditorIcon className="h-2/6 w-2/4" />,
    modalIcon: <EditorIcon />,
  },
];

interface OptionCardProps {
  option: TeamOption;
  selected?: Team;
  onClick: () => void;
}

const OptionCard = ({ option, selected, onClick }: OptionCardProps) => {
  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div variants={cardVariants}>
      <div
        className={`select-none hover:border-blue-500 hover:shadow-lg ${
          selected === option.value ? "border-blue-500" : "border-gray-300"
        } h-full cursor-pointer rounded-lg border p-24 transition-all duration-300 ease-in-out`}
        onClick={onClick}
      >
        <div className="mb-8 flex items-center justify-center">
          {option.icon}
        </div>
        <div className="text-center text-lg font-medium md:text-3xl">
          {option.label}
        </div>
      </div>
    </motion.div>
  );
};

const TeamSelection = () => {
  const SEO = useSEO({
    title: "Team Selection",
    description: "Automate Archisketch Process for Archisktch Team",
  });

  const [selectedTeam, setSelectedTeam] = useState<Team | undefined>();
  const router = useRouter();

  const handleCancel = () => {
    setSelectedTeam(undefined);
  };

  const handleOK = () => {
    if (!selectedTeam) return;

    localStorage.setItem(LOCAL_STORAGE_KEYS.MY_TEAM, selectedTeam);
    if (selectedTeam === "dashboard") {
      void router.push(ROUTES.DASHBOARD);
    } else if (selectedTeam === "editor") {
      void router.push(ROUTES.EDITOR);
    }
  };

  const cardListVariants: Variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <>
      <NextSeo {...SEO} />
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <motion.div
          className="md:(h-4/6 w-4/6) grid grid-cols-1 gap-4 md:grid-cols-2"
          initial="hidden"
          animate="visible"
          variants={cardListVariants}
        >
          {teamOptions.map((option) => (
            <OptionCard
              key={option.value}
              option={option}
              selected={selectedTeam}
              onClick={() => setSelectedTeam(option.value)}
            />
          ))}
        </motion.div>

        {selectedTeam && (
          <TeamSelectionModal
            selectedTeam={selectedTeam}
            onCancel={handleCancel}
            onOK={handleOK}
          />
        )}
      </div>
    </>
  );
};

interface TeamSelectionModalProps {
  selectedTeam: string;
  onCancel: () => void;
  onOK: () => void;
}

const TeamSelectionModal = ({
  selectedTeam,
  onCancel,
  onOK,
}: TeamSelectionModalProps) => {
  const selectedOption = teamOptions.find(
    (option) => option.value === selectedTeam
  );

  const modalVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalContentVariants = {
    initial: { scale: 0 },
    animate: { scale: 1 },
    exit: { scale: 0 },
  };

  return (
    <motion.div
      {...modalVariants}
      className="fixed top-0 bottom-0 left-0 right-0 bg-gray-900 bg-opacity-75"
    >
      <motion.div
        {...modalContentVariants}
        className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center"
      >
        <div className="w-full rounded-lg bg-white p-8 shadow-lg md:w-1/4">
          <h2 className="mb-4 text-center text-lg font-bold md:text-3xl">
            &lsquo;{selectedTeam === "dashboard" ? "대시보드" : "에디터"}
            &rsquo;팀을 선택하셨어요
          </h2>
          <div className="mb-8 flex items-center justify-center">
            {selectedOption?.modalIcon}
          </div>
          <div className="mt-8 flex justify-center text-sm md:text-base">
            <button
              className="mr-4 rounded-lg bg-gray-300 px-4 py-2 text-gray-800"
              onClick={onCancel}
            >
              다시 선택할게요
            </button>
            <button
              className="rounded-lg bg-blue-500 px-4 py-2 text-white"
              onClick={onOK}
            >
              네 {selectedTeam === "dashboard" ? "대시보드" : "에디터"}팀이에요
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TeamSelection;
