import { companyPage } from "./company-page";
import { contactPage } from "./contact-page";
import { faq } from "./faq";
import { footer } from "./footer";
import { homePage } from "./home-page";
import { legalPage } from "./legal-page";
import { navigationItem } from "./navigation-item";
import { page } from "./page";
import { project } from "./project";
import { projectItem } from "./project-item";
import { redirect } from "./redirect";
import { service } from "./service";
import { serviceItem } from "./service-item";
import { serviceCategory } from "./service-category";
import { siteSettings } from "./settings";

export const singletons = [
  homePage,
  companyPage,
  contactPage,
  service,
  project,
  siteSettings,
  footer,
];

export const documents = [
  page,
  faq,
  legalPage,
  navigationItem,
  redirect,
  // Einzelne Leistungen und Projekte als normale Dokumente
  serviceItem,
  serviceCategory,
  projectItem,
  ...singletons,
];
