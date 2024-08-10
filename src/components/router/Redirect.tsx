import { useEffect } from "react";
import { stateSetters } from "../../lib/utils";

type RedirectProps = {
  to: string;
  push?: boolean;
};

export function Redirect({ to, push = false }: RedirectProps) {
  useEffect(() => {
    push ? historyPush(to) : historyReplace(to);
  }, []);

  const historyPush = (path: string) => {
    history.pushState({}, "", path);

    // Trigger a re-render of all Route components
    stateSetters.forEach((stateSetter) => stateSetter({}));
  };

  const historyReplace = (path: string) => {
    history.replaceState({}, "", path);

    // Trigger a re-render of all Route components
    stateSetters.forEach((stateSetter) => stateSetter({}));
  };
}
