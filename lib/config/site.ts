import { USER } from "../data/user";
import type { NavItem } from "../types/nav";

export const SITE_INFO = {
  name: USER.displayName,
  url: process.env.APP_URL || "https://bryanpalay.me",
  ogImage: USER.ogImage,
  description: USER.bio,
  keywords: USER.keywords,
};

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
};

export const MAIN_NAV: NavItem[] = [
  {
    title: "Portfolio",
    href: "/",
  },
];

export const GITHUB_USERNAME = "bry-ly";
export const SOURCE_CODE_GITHUB_REPO = "ncdai/chanhdai.com";
export const SOURCE_CODE_GITHUB_URL = "https://github.com/bry-ly/bryanpalay.me";

export const SPONSORSHIP_URL = "https://github.com/sponsors/ncdai";

export const UTM_PARAMS = {
  utm_source: "bryanpalay.me",
  utm_medium: "referral",
  utm_campaign: "portfolio",
};
