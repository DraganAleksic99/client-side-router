import { createElement, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { matchPath, register, unregister } from '../lib/utils';

type RouteProps = {
    path?: string,
    exact?: boolean,
    component?: React.FunctionComponent<any>,
    render?: React.FunctionComponent<any>,
}

export function Route({ path, exact, component, render }: RouteProps) {
    const [, updateState] = useState({});

    useEffect(() => {
        register(updateState);
        
        const controller = new AbortController();

        // When the user navigates via the browser's forward/back
        // buttons, the popstate event is fired
        window.addEventListener(
            'popstate',
            () => {
                // This is a workaround to force a re-render
                // Class components in older versions of React
                // have convenient method forceUpdate to force
                // a re-render
                flushSync(() => {
                    updateState({});
                });
            },
            { 
                signal: controller.signal 
            }
        );

        return () => {
            controller.abort();
            unregister(updateState);
        };
    }, []);
    
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