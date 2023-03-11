import { useEffect } from "react";
import { useRouter } from "next/router";
import { LOCAL_STORAGE_KEYS, ROUTES } from "@/enum";

export const useRedirectToTeamSelectionPage = () => {
  const router = useRouter();

  useEffect(() => {
    const myTeam = window.localStorage.getItem(LOCAL_STORAGE_KEYS.MY_TEAM);

    if (myTeam === "dashboard") {
      void router.push(ROUTES.DASHBOARD);
    } else if (myTeam === "editor") {
      void router.push(ROUTES.EDITOR);
    } else {
      void router.push(ROUTES.TEAM_SELECTION);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
