import { sanityFetch } from "./sanity/live";
import { queryNavigationData, querySiteSettings } from "./sanity/query";

export const getNavigationData = async () => {
  console.time("getNavigationData fetch duration");
  console.debug("Fetching navigation and settings data...");

  const [navigationData, settingsData] = await Promise.all([
    sanityFetch({ query: queryNavigationData }),
    sanityFetch({ query: querySiteSettings }),
  ]);

  console.timeEnd("getNavigationData fetch duration");
  console.debug("Navigation data fetched:", navigationData.tags);
  console.debug("Settings data fetched:", settingsData.tags);

  return {
    headerNavigation: navigationData.data?.header ?? [],
    footerNavigation: navigationData.data?.footer ?? [],
    siteSettings: settingsData.data,
  };
};
