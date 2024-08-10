import { stateSetters } from "../../lib/utils";

type LinkProps = {
  to: string;
  replace?: boolean;
  children: React.ReactNode;
};

export function Link({ to, replace, children }: LinkProps) {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    replace ? historyReplace(to) : historyPush(to);
  };

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

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
}
