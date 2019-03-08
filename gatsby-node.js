/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const axios = require('axios');
const crypto = require('crypto');
const path = require('path');

exports.sourceNodes = async ({ actions }) => {
  const { createNode, createPage } = actions;

  await axios
    .get(
      `https://aclo70943f.execute-api.us-east-2.amazonaws.com/prod/cars/${
        process.env.USER_ID
      }`
    )
    .then(res => {
      res.data.map(car => {
        const {
          vin,
          make,
          model,
          variant,
          description,
          color,
          price,
          year,
          mileage,
          doors,
          bodyType,
          fuelType,
          engineSize,
          transmission,
          bhp,
          torque,
          zeroTo60,
          condition,
          interiorFeatures,
          exteriorFeatures,
          images,
          slug,
        } = car;

        // Create your node object
        const carNode = {
          // Required fields
          id: 'car-' + vin.toString(),
          parent: `__SOURCE__`,
          internal: {
            type: `Cars`, // name of the graphQL query --> allCars {}
          },
          children: [],

          vin,
          make,
          model,
          variant,
          description,
          color,
          price,
          year,
          mileage,
          doors,
          bodyType,
          fuelType,
          engineSize,
          transmission,
          bhp,
          torque,
          zeroTo60,
          condition,
          interiorFeatures,
          exteriorFeatures,
          images,
          slug,
        };

        // Get content digest of node. (Required field)
        const contentDigest = crypto
          .createHash(`md5`)
          .update(JSON.stringify(carNode))
          .digest(`hex`);
        // add it to userNode
        carNode.internal.contentDigest = contentDigest;

        // Create node with the gatsby createNode() API
        createNode(carNode);

        // Create page for node

        createPage({
          path: slug,
          component: path.resolve(`./src/templates/listing-view.tsx`),
          context: {
            slug,
          },
        });
      });
    });

  (async function() {
    // fetch raw data from the dealership-info api
    // const fetchSiteData = () => get(`http://localhost:3000/dealership-info`);
    // // await for results
    // const res = await fetchSiteData();

    // Create your node object
    const dealershipInfoNode = {
      // Required fields
      // id: res.data.orgId.toString(),
      id: 'hg67js',
      parent: `__SOURCE__`,
      internal: {
        type: `DealershipInfo`,
      },
      children: [],
      country: 'US',
      currency: '£',
    };

    // Get content digest of node. (Required field)
    const contentDigest = crypto
      .createHash(`md5`)
      .update(JSON.stringify(dealershipInfoNode))
      .digest(`hex`);
    // add it to userNode
    dealershipInfoNode.internal.contentDigest = contentDigest;

    // Create node with the gatsby createNode() API
    createNode(dealershipInfoNode);
  })();
  return;
};
