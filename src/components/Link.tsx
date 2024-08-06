type LinkProps = {
    to: string,
    replace?: boolean,
    children: React.ReactNode,
}

export function Link({ to, replace, children }: LinkProps) {
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault()
        replace ? historyReplace(to) : historyPush(to)
    }

    const historyPush = (path: string) => {
        history.pushState({}, '', path)
    }

    const historyReplace = (path: string) => {
        history.replaceState({}, '', path)
    }

    return <a href={to} onClick={handleClick}>{children}</a>
}
