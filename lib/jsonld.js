import { SITE_NAME, SITE_URL } from "./seo";
import { SUBS } from "./routes";

export function holdingOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    email: "hello@energica.group",
    subOrganization: SUBS.map((s) => ({
      "@type": "Organization",
      name: s.name,
      url: `${SITE_URL}${s.href}`,
    })),
  };
}

export function subsidiaryOrganizationJsonLd(sub) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: sub.name,
    url: `${SITE_URL}${sub.href}`,
    description: sub.desc,
    parentOrganization: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}
