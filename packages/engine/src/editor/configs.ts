import { isBrowser } from "../common/functions/isBrowser";

// Read configs from meta tags if available, otherwise use the process.env injected from build.
const configs = {};
const get = (configs, key, defaultValue) => {
  if (!isBrowser) {
    return;
  }
  const el = document.querySelector(`meta[name='env:${key.toLowerCase()}']`);
  if (el) {
    configs[key] = el.getAttribute("content");
  } else {
    configs[key] = defaultValue;
  }
};

get(configs, "API_ASSETS_ROUTE", process.env.API_ASSETS_ROUTE);
get(configs, "API_MEDIA_ROUTE", process.env.API_MEDIA_ROUTE);
get(configs, "API_MEDIA_SEARCH_ROUTE", process.env.API_MEDIA_SEARCH_ROUTE);
get(configs, "API_META_ROUTE", process.env.API_META_ROUTE);
get(configs, "API_PROJECT_PUBLISH_ACTION", process.env.API_PROJECT_PUBLISH_ACTION);
get(configs, "API_PROJECTS_ROUTE", process.env.API_PROJECTS_ROUTE);
get(configs, "API_ASSETS_ACTION", process.env.API_ASSETS_ACTION);
get(configs, "API_SCENES_ROUTE", process.env.API_SCENES_ROUTE);
get(configs, "API_SERVER_ADDRESS", process.env.API_SERVER_ADDRESS);
get(configs, "API_SOCKET_ENDPOINT", process.env.API_SOCKET_ENDPOINT);
get(configs, "BASE_ASSETS_PATH", process.env.BASE_ASSETS_PATH);
get(configs, "CLIENT_ADDRESS", process.env.CLIENT_ADDRESS);
get(configs, "CORS_PROXY_SERVER", process.env.CORS_PROXY_SERVER);
get(configs, "GA_TRACKING_ID", process.env.GA_TRACKING_ID);
get(configs, "IS_XR3", process.env.IS_XR3);
get(configs, "NON_CORS_PROXY_DOMAINS", process.env.NON_CORS_PROXY_DOMAINS);
get(configs, "SENTRY_DSN", process.env.SENTRY_DSN);
get(configs, "THUMBNAIL_ROUTE", process.env.THUMBNAIL_ROUTE);
get(configs, "THUMBNAIL_SERVER", process.env.THUMBNAIL_SERVER);
get(configs, "USE_DIRECT_UPLOAD_API", process.env.USE_DIRECT_UPLOAD_API);
get(configs, "API_RESOLVE_MEDIA_ROUTE", process.env.API_RESOLVE_MEDIA_ROUTE);

get(configs, "USE_HTTPS", process.env.USE_HTTPS);

(configs as any).name = (): string => "Scene Editor";
(configs as any).longName = (): string => "Scene Editor";

export default configs;