import { UTMSource } from "./types";

export function parseUtmSource(
  utm_source: string | string[] | undefined,
): UTMSource {
  if (utm_source === undefined) {
    return UTMSource.DIRECT;
  }
  const source = typeof utm_source === "string" ? utm_source : utm_source?.[0];
  switch (source) {
    case "youtube":
      return UTMSource.YOUTUBE;
    case "blog":
      return UTMSource.BLOG;
    default:
      return UTMSource.UNKNOWN;
  }
}

export function parseUtmCampaign(
  utm_campaign: string | string[] | undefined,
): string {
  if (utm_campaign === undefined) {
    return "No Link provided";
  }
  const campaign =
    typeof utm_campaign === "string" ? utm_campaign : utm_campaign?.[0];

  return campaign;
}
