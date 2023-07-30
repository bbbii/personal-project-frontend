const env = {
  mode: process.env.NODE_ENV,
  api: {
    MAIN_API_URL: process.env.VUE_APP_BASE_URL,
    TOSS_API_KEY: process.env.VUE_APP_TOSS_API_KEY,
    TOSS_INCODED_KEY: process.env.VUE_APP_TOSS_INCODED_KEY,
  },
};

export default env;
