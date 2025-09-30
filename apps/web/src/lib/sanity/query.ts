import { defineQuery } from "next-sanity";

const imageFields = /* groq */ `
  "id": asset._ref,
  "preview": asset->metadata.lqip,
  hotspot {
    x,
    y
  },
  crop {
    bottom,
    left,
    right,
    top
  }
`;
// Base fragments for reusable query parts
const imageFragment = /* groq */ `
  image {
    ${imageFields}
  }
`;

const customLinkFragment = /* groq */ `
  ...customLink{
    openInNewTab,
    "href": select(
      type == "internal" => internal->slug.current,
      type == "external" => external,
      "#"
    ),
  }
`;

const markDefsFragment = /* groq */ `
  markDefs[]{
    ...,
    ${customLinkFragment}
  }
`;

const richTextFragment = /* groq */ `
  richText[]{
    ...,
    _type == "block" => {
      ...,
      ${markDefsFragment}
    },
    _type == "image" => {
      ${imageFields},
      "caption": caption
    }
  }
`;

const buttonsFragment = /* groq */ `
  buttons[]{
    text,
    variant,
    _key,
    _type,
    "openInNewTab": url.openInNewTab,
    "href": select(
      url.type == "internal" => url.internal->slug.current,
      url.type == "external" => url.external,
      url.href
    ),
  }
`;

// Page builder block fragments
const ctaBlock = /* groq */ `
  _type == "cta" => {
    ...,
    ${richTextFragment},
    ${buttonsFragment},
  }
`;
const imageLinkCardsBlock = /* groq */ `
  _type == "imageLinkCards" => {
    ...,
    ${richTextFragment},
    ${buttonsFragment},
    "cards": array::compact(cards[]{
      ...,
      "openInNewTab": url.openInNewTab,
      "href": select(
        url.type == "internal" => url.internal->slug.current,
        url.type == "external" => url.external,
        url.href
      ),
      ${imageFragment},
    })
  }
`;

const heroBlock = /* groq */ `
  _type == "hero" => {
    ...,
    ${imageFragment},
    ${buttonsFragment},
    ${richTextFragment}
  }
`;

const faqFragment = /* groq */ `
  "faqs": array::compact(faqs[]->{
    title,
    _id,
    _type,
    ${richTextFragment}
  })
`;

const faqAccordionBlock = /* groq */ `
  _type == "faqAccordion" => {
    ...,
    ${faqFragment},
    link{
      ...,
      "openInNewTab": url.openInNewTab,
      "href": select(
        url.type == "internal" => url.internal->slug.current,
        url.type == "external" => url.external,
        url.href
      )
    }
  }
`;

const featureCardsIconBlock = /* groq */ `
  _type == "featureCardsIcon" => {
    ...,
    ${richTextFragment},
    "cards": array::compact(cards[]{
      ...,
      ${richTextFragment},
    })
  }
`;

const standardsBadgeBlock = /* groq */ `
  _type == "standardsBadge" => {
    ...,
    norms[]{
      title,
      code,
      summary,
      mandatory,
      link
    },
    notes
  }
`;

const processGridBlock = /* groq */ `
  _type == "processGrid" => {
    ...,
    items[]{
      _key,
      title,
      description,
      icon,
      kpi
    },
    cta{
      label,
      href
    }
  }
`;

const fundingTeaserBlock = /* groq */ `
  _type == "fundingTeaser" => {
    ...,
    items[]{
      _key,
      title,
      fundingRate,
      summary,
      eligible
    },
    sources[]{
      _key,
      label,
      url
    }
  }
`;

const caseStudyCompactBlock = /* groq */ `
  _type == "caseStudyCompact" => {
    ...,
    metrics[]{
      _key,
      label,
      value
    },
    results,
    quote{
      text,
      author,
      role
    },
    cta{
      label,
      href
    }
  }
`;

const contactCtaBlock = /* groq */ `
  _type == "contactCta" => {
    ...,
    cta{
      label,
      href
    },
    secondaryCta{
      label,
      href
    }
  }
`;

const contactFormBlock = /* groq */ `
  _type == "contactForm" => {
    ...,
    "intro": intro[]{
      ...,
      ${markDefsFragment}
    },
    fields[]{
      _key,
      label,
      name,
      fieldType,
      placeholder,
      required
    },
    "privacyNotice": privacyNotice[]{
      ...,
      ${markDefsFragment}
    }
  }
`;

const projectGalleryBlock = /* groq */ `
  _type == "projectGallery" => {
    ...,
    "intro": intro[]{
      ...,
      ${markDefsFragment}
    },
    "projects": array::compact(projects[]->{
      _id,
      _type,
      title,
      summary,
      date,
      "slug": slug.current,
      coverImage{
        ${imageFields}
      }
    }),
    ${buttonsFragment}
  }
`;

const serviceListBlock = /* groq */ `
  _type == "serviceList" => {
    ...,
    presetAudience,
    presetDomain,
    presetLifecycle,
    presetServiceType,
    presetTags,
    enableClientFilters
  }
`;

const pageBuilderFragment = /* groq */ `
  pageBuilder[]{
    ...,
    _type,
    ${ctaBlock},
    ${heroBlock},
    ${faqAccordionBlock},
    ${featureCardsIconBlock},
    ${standardsBadgeBlock},
    ${processGridBlock},
    ${fundingTeaserBlock},
    ${caseStudyCompactBlock},
    ${contactCtaBlock},
    ${imageLinkCardsBlock},
    ${contactFormBlock},
    ${projectGalleryBlock},
    ${serviceListBlock}
  }
`;

/**
 * Query to extract a single image from a page document
 * This is used as a type reference only and not for actual data fetching
 * Helps with TypeScript inference for image objects
 */
export const queryImageType = defineQuery(`
  *[_type == "page" && defined(image)][0]{
    ${imageFragment}
  }.image
`);

export const queryHomePageData =
  defineQuery(`*[_type == "homePage" && _id == "homePage"][0]{
    ...,
    _id,
    _type,
    "slug": slug.current,
    title,
    description,
    ${pageBuilderFragment}
  }`);

export const querySlugPageData = defineQuery(`
  *[_type in ["page","service","companyPage","contactPage","homePage","project"] && slug.current in [$slug, $slugWithLeading]][0]{
    ...,
    "slug": slug.current,
    ${pageBuilderFragment}
  }
  `);

export const querySlugPagePaths = defineQuery(`
  *[_type in ["page","service","companyPage","contactPage","homePage","project"] && defined(slug.current)].slug.current
`);

const ogFieldsFragment = /* groq */ `
  _id,
  _type,
  "title": select(
    defined(ogTitle) => ogTitle,
    defined(seoTitle) => seoTitle,
    title
  ),
  "description": select(
    defined(ogDescription) => ogDescription,
    defined(seoDescription) => seoDescription,
    description
  ),
  "image": image.asset->url + "?w=566&h=566&dpr=2&fit=max",
  "dominantColor": image.asset->metadata.palette.dominant.background,
  "seoImage": seoImage.asset->url + "?w=1200&h=630&dpr=2&fit=max", 
  "logo": *[_type == "siteSettings"][0].logo.asset->url + "?w=80&h=40&dpr=3&fit=max&q=100",
  "date": coalesce(date, _createdAt)
`;

export const queryHomePageOGData = defineQuery(`
  *[_type == "homePage" && _id == $id][0]{
    ${ogFieldsFragment}
  }
  `);

export const querySlugPageOGData = defineQuery(`
  *[_type == "page" && _id == $id][0]{
    ${ogFieldsFragment}
  }
`);

export const queryGenericPageOGData = defineQuery(`
  *[ defined(slug.current) && _id == $id][0]{
    ${ogFieldsFragment}
  }
`);

const navigationLinkFields = /* groq */ `
  _id,
  title,
  kind,
  order,
  openInNewTab,
  "href": select(
    kind == "external" => coalesce(external, "#"),
    kind == "internal" && internal->_type == "serviceCategory" => select(
      defined(internal->slug.current) && internal->slug.current != "" => select(
        internal->slug.current match '^/leistungen($|/)' => coalesce(internal->slug.current, "/leistungen"),
        internal->slug.current match '^/' => "/leistungen" + internal->slug.current,
        "/leistungen/" + internal->slug.current
      ),
      "/leistungen"
    ),
    kind == "internal" && defined(internal->slug.current) => coalesce(internal->slug.current, "/"),
    kind == "internal" => "/",
    "#"
  )
`;

export const queryNavigationData = defineQuery(`{
  "header": *[_type == "navigationItem" && location == "header"] | order(order asc){
    ${navigationLinkFields}
  },
  "footer": *[_type == "navigationItem" && location == "footer"] | order(order asc){
    ${navigationLinkFields}
  }
}`);

export const querySitemapData = defineQuery(`{
  "slugPages": *[_type == "page" && defined(slug.current)]{
    "slug": slug.current,
    "lastModified": _updatedAt
  }
}`);
export const querySiteSettings = defineQuery(`
  *[_type == "siteSettings"][0]{
    _id,
    _type,
    label,
    siteTitle,
    siteDescription,
    contactEmail,
    socialLinks{
      linkedin,
      facebook,
      twitter,
      instagram,
      youtube
    },
    logo {
      ${imageFields}
    }
  }
`);

export const queryFooterData = defineQuery(`
  *[_type == "footer"][0] {
    _id,
    _type,
    title,
    contactInfo {
      companyName,
      address,
      phone,
      email
    },
    socialLinks {
      facebook,
      twitter,
      instagram,
      linkedin,
      youtube
    },
    footerLinks {
      quickLinks[] {
        title,
        href,
        openInNewTab
      }
    },
    copyrightLinks {
      copyrightLinks[] {
        title,
        href,
        openInNewTab
      }
    },
    copyrightText
  }
`);

export const queryRedirects = defineQuery(`
  *[_type == "redirect"]{
    "source":source.current, 
    "destination":destination.current, 
    permanent
  }
`);
