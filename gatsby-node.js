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
    .get(`${process.env.API_URL}/cars/external/${process.env.DEALERSHIP_ID}`, {
      headers: {
        Authorization: `Bearer fmEB*cuY.]zwA!tby^PR_G<}{*EtI?°&h|hmdPm%ityuA<1|B(7T§TBEjwrXrDy6`,
      },
    })
    .then(res => {
      res.data.map(car => {
        const {
          _id,
          vin,
          make,
          model,
          trim,
          description,
          color,
          price,
          year,
          mileage,
          doors,
          seats,
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
          id: _id,
          parent: `__SOURCE__`,
          internal: {
            type: `Cars`, // name of the graphQL query --> allCars {}
          },
          children: [],

          vin,
          make: make.name,
          model: model.name,
          trim,
          description,
          color,
          price,
          year,
          mileage,
          doors,
          seats,
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
    })
    .catch(error => {
      console.log(error.response.status);
      if (error.response.status === 404) {
        const dummyNode = {
          // Required fields
          id: 'car-12345',
          parent: `__SOURCE__`,
          internal: {
            type: `Cars`, // name of the graphQL query --> allCars {}
          },
          children: [],

          carId: '12345',
          vin: '12345',
          make: 'BMW',
          model: '3 Series',
          trim: '320d M Sport',
          description: 'Lovely example',
          color: 'red',
          price: 14895,
          year: 2016,
          mileage: 22308,
          doors: 5,
          seats: 5,
          bodyType: 'Saloon',
          fuelType: 'Diesel',
          engineSize: 1995,
          transmission: 'Automatic',
          bhp: 201,
          torque: 230,
          zeroTo60: 7.6,
          condition: 'Used',
          interiorFeatures: ['Blutooth', 'Heated Seats', 'Air Conditioning'],
          exteriorFeatures: ['Alloy Wheels', 'Xeonon Headlights'],
          images: [
            'https://inchcapecdn.azureedge.net/cdn-images/stock/a/au68jsy-1-xl.jpg',
          ],
          slug: 'cars/bmw-3-series-12345',
        };
        // Get content digest of node. (Required field)
        const contentDigest = crypto
          .createHash(`md5`)
          .update(JSON.stringify(dummyNode))
          .digest(`hex`);
        // add it to userNode
        dummyNode.internal.contentDigest = contentDigest;

        // Create node with the gatsby createNode() API
        createNode(dummyNode);

        // Create page for node

        createPage({
          path: dummyNode.slug,
          component: path.resolve(`./src/templates/listing-view.tsx`),
          context: {
            slug: dummyNode.slug,
          },
        });
      }
    });

  // fetch raw data from the dealership-info api
  await axios
    .get(
      `${process.env.API_URL}/dealership/external/config/${
        process.env.DEALERSHIP_ID
      }`,
      {
        headers: {
          Authorization: `Bearer fmEB*cuY.]zwA!tby^PR_G<}{*EtI?°&h|hmdPm%ityuA<1|B(7T§TBEjwrXrDy6`,
        },
      }
    )
    .then(res => {
      // Create your node object
      const configNode = {
        // Required fields
        id: 'config',
        parent: `__SOURCE__`,
        internal: {
          type: `Config`,
        },
        children: [],
        ...res.data,
      };

      // Get content digest of node. (Required field)
      const contentDigest = crypto
        .createHash(`md5`)
        .update(JSON.stringify(configNode))
        .digest(`hex`);
      // add it to userNode
      configNode.internal.contentDigest = contentDigest;

      // Create node with the gatsby createNode() API
      createNode(configNode);
    })
    .catch(e => console.log(e));
  return;
};
