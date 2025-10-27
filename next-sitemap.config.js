/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://asimreviews.netlify.app", // 🔁 change to your actual domain when you get one
  generateRobotsTxt: true, // (optional)
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/admin', '/404'], // optional
};