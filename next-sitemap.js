module.exports = {
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        allow: '/',
        userAgent: '*',
      },
    ],
  },
  siteUrl:
    process.env.SITE_URL || 'https://budgetbasics.openbudgetsindia.org/',
};
