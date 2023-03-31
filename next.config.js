/** @type {import('next').NextConfig} */
const withImages = require("next-images");
module.exports = {
  async rewrites() {
    return [
      {
        source: "/:any*",
        destination: "/",
      },
    ];
  },
};
