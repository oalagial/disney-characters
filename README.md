# Disney's characters app

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

This project uses the Disney API (https://disneyapi.dev/). Disney API is a restful and GraphQL API based on Disney characters. Using this API you can get information on Disney characters.


## Available Scripts

In the project directory, you can run:

### `npm start`


### `npm test`

I have implemented some tests in components, but not for all cases, due to lack of time.


### `Imporant Notes:`

1) The user can't select the number of characters per page, because API doesn't support this capability. 
https://github.com/ManuCastrillonM/disney-api/blob/c3ed7510006689c57ae0197a3cbf35b228e21ecb/src/services/crud.js#L6

2) API doesn't support paging when you use filters (name and tvShow). This can lead to lagging if the count of results is very big.
