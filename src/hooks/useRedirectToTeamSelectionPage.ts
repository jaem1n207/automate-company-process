import { useEffect } from "react";
import { useRouter } from "next/router";
import { type Team } from "@/models/team";
import { useLocalStorage } from "./useLocalStorage";
import { isEmptryString } from "@/utils/assertions";
import { ROUTES } from "@/enum";

export const useRedirectToTeamSelectionPage = () => {
  const [myTeam] = useLocalStorage<Team>("my-team", "unknown");
  const router = useRouter();

  useEffect(() => {
    if (myTeam === "unknown" || isEmptryString(myTeam)) {
      void router.push(ROUTES.TEAM_SELECTION);
      return;
    }

    if (myTeam === "dashboard") {
      void router.push(ROUTES.DASHBOARD);
    } else if (myTeam === "editor") {
      void router.push(ROUTES.EDITOR);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
