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
      if (!res.data.length) {
        res.data.push({
          vin: '12345',
          make: 'BMW',
          model: '3 Series',
          variant: '320d M Sport',
          description: 'Lovely example',
          color: 'red',
          price: 14895,
          year: 2016,
          mileage: 22308,
          doors: 5,
          bodyType: 'Saloon',
          fuelType: 'Diesel',
          engineSize: 1995,
          transmission: 'Automatic',
          bhp: 201,
          torque: 230,
          zeroTo60: 7.6,
          condition: 'Used',
          interiorFeatures: 'Blutooth - Heated Seats - Air Conditioning',
          exteriorFeatures: 'Alloy Wheels - Xeonon Headlights',
          images:
            'https://inchcapecdn.azureedge.net/cdn-images/stock/a/au68jsy-1-xl.jpg',
          slug: 'cars/bmw-3-series-12345',
        });
      }
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
