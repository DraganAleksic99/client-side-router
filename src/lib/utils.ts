type StateSetterFunc = React.Dispatch<React.SetStateAction<Record<string, never>>>

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

// State setters are used to trigger a re-render
const stateSetters: Array<StateSetterFunc> = []

// Every Route component registers a state setter on mount
// When the user navigates via Link component, all 
// state setters are called
// This triggers a re-render of all Route components
const register = (stateSetter: StateSetterFunc) => stateSetters.push(stateSetter)

// Every Route component unregisters its state setter on unmount
const unregister = (stateSetter: StateSetterFunc) => stateSetters.splice(
  stateSetters.indexOf(stateSetter), 1
)

export { stateSetters, register, unregister }