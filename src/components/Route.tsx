import { createElement, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { matchPath } from '../lib/utils';

type RouteProps = {
    path?: string,
    exact?: boolean,
    component?: React.FunctionComponent<any>,
    render?: React.FunctionComponent<any>,
}

export function Route({ path, exact, component, render }: RouteProps) {
    const [, updateState] = useState(null);

    useEffect(() => {
        // When the user navigates via the browser's forward/back
        // buttons, the popstate event is fired
        window.addEventListener('popstate', handlePopstate);

        return () => {
            window.removeEventListener('popstate', handlePopstate);
        };
    }, []);

    const handlePopstate = () => {
        // This is a workaround to force a re-render
        // Class components in older versions of React
        // have convenient method forceUpdate to force
        // a re-render
        flushSync(() => {
            updateState(null);
        });
    };
    
    const match = matchPath(
        window.location.pathname, // global variable
        { path, exact }
    );

    if (!match) return null; // Do not render if current location does not match the path prop

    if (component) {
        // The component prop takes precedent over the
        // render method. If the current location matches
        // the path prop, create a new element passing in
        // match as the prop
        return createElement(component, { match });
    }

    if (render) {
        // If there's a match but component
        // was undefined, invoke the render
        // prop passing in match as an argument
        return render({ match });
    }

    return null;
}