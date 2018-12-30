/*
  This represents private configuration values like keys and urls that are server specific.
 */
export default {
  // Settings is merged into the overall application state
  settings: {
    api: {
      protocol: 'http',
      host: 'localhost',
      port: '8000',
      path: '/graphql/'
    },
    mapbox: {
      mapboxApiAccessToken: 'pk.eyJ1IjoiY2Fsb2NhbiIsImEiOiJjaXl1aXkxZjkwMG15MndxbmkxMHczNG50In0.07Zu3XXYijL6GJMuxFtvQg',
    }
  }
};
