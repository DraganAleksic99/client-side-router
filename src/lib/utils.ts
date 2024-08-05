export const matchPath = (
    pathname: string, 
    options: { exact?: boolean, path?: string }
) => {
    const { exact = false, path } = options

    if (!path) {
        return {
            path: null,
            url: pathname,
            isExact: true
        }
    }
    
    // returns an array containing the matched text or null otherwise
    const match = new RegExp(`^${path}`).exec(pathname)

    if (!match) {
        return null
    }

    const url = match[0]
    const isExact = pathname === url

    if (exact && !isExact) {
        // There was a match, but it wasn't
        // an exact match as specified by
        // the exact prop.
        return null
    }

    return {
        path,
        url,
        isExact
    }
}