import { sanityFetch } from "./sanity/live";
import {
  queryFooterData,
  queryNavigationData,
  querySiteSettings,
} from "./sanity/query";

export const getNavigationData = async () => {
  const startTime = Date.now();
  console.debug("Fetching navigation and settings data...");

  const [navigationData, settingsData, footerData] = await Promise.all([
    sanityFetch({ query: queryNavigationData }),
    sanityFetch({ query: querySiteSettings }),
    sanityFetch({ query: queryFooterData }),
  ]);

  const duration = Date.now() - startTime;
  console.debug(`getNavigationData fetch duration: ${duration}ms`);
  console.debug("Navigation data fetched:", navigationData.tags);
  console.debug("Settings data fetched:", settingsData.tags);
  console.debug("Footer data fetched:", footerData.tags);

  return {
    headerNavigation: navigationData.data?.header ?? [],
    footerNavigation: navigationData.data?.footer ?? [],
    siteSettings: settingsData.data,
    footerData: footerData.data,
  };
};
