# JA - Tech
A simple user-management tool. Steps to run development server:

1. `npm install`
2. `npm run dev`
3. Voila!

## Client
The client is made using the NextJS 13, utilising the server side components within the `app` directory.
All client rendered components are intended to be on leaf nodes to ensure the reduction in bundle size.

### Components
All components that require state updates have been separated into client components using the `use client`
directive. A number of custom components have been created to serve the functions of inputs, tables, spinners and more.
Further work should still be done to separate out:

- Card elements
- Typography elements
- Spacers

### Data fetching
Caching has been kept to a minimum due to the nature of the application. Since we are dealing with a user
management application, it is important to have non-stale data when listing or getting the data. All data
is fetched server side so pre-rendering is possible with `POST`, `PUT`, and `DELETE` operations having to occur within
client components.

A `safeGet` component was made to allow graceful retried failing of a GET request, this is important for those
in countries with poor internet access. Further work should be done to:

- Have in-app loading states e.g. on button clicks
- More granular errors for data fetching
- The backend URL should be moved to an `.env` file to allow changing between environments

### External libraries
External libraries were kept to an absolute minimum with the key additions being:

- `uuid` - for generating version 4 uuids for a user (this would be moved to the backend)
- `react-tooltip` - to give users information on the edit and delete icons
- `heroicons` - this is the icon library utilised by tailwind, so it made sense to use this instead of FA or similar

## Backend
Although the brief stated a backend wasn't necessary, in order to maintain a global state and have an accurate
view on pagination, a simple express server was created. This runs alongside the NextJS application.

Data is loaded from a JSON, stored in a cache and the cache is operated on with HTTP requests. Restarting the 
application restarts the state of the backend as this is only a test.

All the server logic is held in the `/express/index.js` file.

### Data
All data is stored in `express/data.json` and is gathered from https://dummyjson.com/users. Small changes
were made to the model from DummyJSON to fit the applications needs such as removing unnecessary fields and
replacing the `id` with version 4 uuid. A mixture of `id` and `userName` is used for fetching data but
this could be consolidated in the future. The reason to allow fetching by `userName` is to reduce the calls
to the backend and create more readable URLs for users and search engines. For example:

```
http://localhost:3000/users/8a7348ed-7930-4ed3-be77-590b2a963794/view
http://localhost:3000/users/8a7348ed-7930-4ed3-be77-590b2a963794/edit
```

becomes:

```
http://localhost:3000/users/joe-bloggs/view
http://localhost:3000/users/joe-bloggs/edit
```