// src/components/Banner/bannerData.js

import topBannerImg from "../../assets/page-banners/topBanner.png";

// Home
import home1 from "../../assets/page-banners/home1.jpg";
import home2 from "../../assets/page-banners/home2.jpg";
import home3 from "../../assets/page-banners/home3.jpg";

// Kids
import kids1 from "../../assets/page-banners/kids1.png";
import kids2 from "../../assets/page-banners/kids2.png";
import kids3 from "../../assets/page-banners/kids3.png";
import kids4 from "../../assets/page-banners/kids4.png";

// GenZ
import genz1 from "../../assets/page-banners/genz1.png";
import genz2 from "../../assets/page-banners/genz2.png";
import genz3 from "../../assets/page-banners/genz3.png";
import genz4 from "../../assets/page-banners/genz4.png";
import genz5 from "../../assets/page-banners/genz5.png";
import genz6 from "../../assets/page-banners/genz6.png";
import genz7 from "../../assets/page-banners/genz7.png";

// Men / Women
import menImg from "../../assets/page-banners/men.png";
import womenImg from "../../assets/page-banners/women.png";

export const topBanner = {
  img: topBannerImg,
  link: "/",
};

export const homeBanners = [
  { id: 1, img: home1, link: "/" },
  { id: 2, img: home2, link: "/" },
  { id: 3, img: home3, link: "/" },
];

export const kidsBanners = [
  { id: 1, img: kids1, link: "/kids" },
  { id: 2, img: kids2, link: "/kids" },
  { id: 3, img: kids3, link: "/kids" },
  { id: 4, img: kids4, link: "/kids" },
];

export const genzBanners = [
  { id: 1, img: genz1, link: "/genz" },
  { id: 2, img: genz2, link: "/genz" },
  { id: 3, img: genz3, link: "/genz" },
  { id: 4, img: genz4, link: "/genz" },
  { id: 5, img: genz5, link: "/genz" },
  { id: 6, img: genz6, link: "/genz" },
  { id: 7, img: genz7, link: "/genz" },
];

export const menBanner = {
  img: menImg,
  link: "/men",
};

export const menSecondaryBanners = [
  { id: 1, img: menImg, link: "/men" },
  { id: 2, img: menImg, link: "/men" }
];

export const womenBanner = {
  img: womenImg,
  link: "/women",
};

export const womenSecondaryBanners = [
  { id: 1, img: womenImg, link: "/women" },
  { id: 2, img: womenImg, link: "/women" }
];
