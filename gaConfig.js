module.exports = {
  development: {
    debug: true,
    gaOptions: {
      //userId: insertAuth0IdHere,
      siteSpeedSampleRate: 100
    },
  },
  staging: {
    debug: true,
    gaOptions: {
      //userId: insertAuth0IdHere,
      siteSpeedSampleRate: 100
    },
  },
  production: {
    debug: false,
    gaOptions: {
      //userId: insertAuth0IdHere,
      siteSpeedSampleRate: 100
    },
  },
};
