# Client-Side Router - Build your own React-Router!

Simple implementation of client-side router based on React-Router v4.

## How it works?

In a client side application, there are really only two ways for the user to update the URL. 
The first way is clicking on an anchor tag and the second is by clicking the back/forward button.

Whenever the user clicks on the forward or back button, "popstate" event is fired. 
Because it's the Route components that are rendering the UI based off the current URL, Routes 
listen for and re-render whenever a popstate event occurs.

Every rendered Route component registers a state setter function to the stateSetters array.
When the user clicks on the anchor tag, which is rendered by a Link component, the component loops through 
stateSetters array and calls all the state setter functions triggering a re-render of all the Route components.

## Quickstart

### 1. Clone this repository

Run the following command to clone the repo:

```
git clone https://github.com/DraganAleksic99/client-side-router.git
```

### 2. Run app locally

```
npm run dev
```

### Open in your browser

You can now visit http://localhost:5173.
