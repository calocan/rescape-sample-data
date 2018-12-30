/*
  This represents private configuration values like keys and urls that are server specific.
  You can copy the format of this and pass your version to createDefaultConfig. Or for
  testing you can import this and merge it with specific values
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
