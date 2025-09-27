import { author } from "./author";
import { blog } from "./blog";
import { blogIndex } from "./blog-index";
import { companyPage } from "./company-page";
import { contactPage } from "./contact-page";
import { faq } from "./faq";
import { footer } from "./footer";
import { homePage } from "./home-page";
import { jobPosting } from "./job-posting";
import { jobsIndexPage } from "./jobs-index-page";
import { legalPage } from "./legal-page";
import { navbar } from "./navbar";
import { navigationItem } from "./navigation-item";
import { page } from "./page";
import { project } from "./project";
import { redirect } from "./redirect";
import { service } from "./service";
import { siteSettings } from "./settings";
import { teamMember } from "./team-member";

export const singletons = [
  homePage,
  companyPage,
  jobsIndexPage,
  contactPage,
  siteSettings,
  blogIndex,
  footer,
  navbar,
];

export const documents = [
  blog,
  page,
  faq,
  author,
  service,
  project,
  teamMember,
  jobPosting,
  legalPage,
  navigationItem,
  redirect,
  ...singletons,
];
