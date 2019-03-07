/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const axios = require('axios');
const crypto = require('crypto');
const path = require('path');

exports.sourceNodes = ({ graphql, actions }) => {
  const { createNode, createPage } = actions;

  (async function() {
    // fetch raw data from the listings api
    const fetchSiteData = () => axios.get(``);
    // await for results
    const res = await fetchSiteData();

    // map into these results and create nodes
    await res.data.map(car => {
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
      const listingNode = {
        // Required fields
        id: 'listing-' + vin.toString(),
        parent: `__SOURCE__`,
        internal: {
          type: `Listings`, // name of the graphQL query --> allListings {}
          // contentDigest will be added just after
          // but it is required
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
        .update(JSON.stringify(listingNode))
        .digest(`hex`);
      // add it to userNode
      listingNode.internal.contentDigest = contentDigest;

      console.log(listingNode);

      // Create node with the gatsby createNode() API
      createNode(listingNode);

      // Create page for node

      createPage({
        path: slug,
        component: path.resolve(`./src/templates/listing-view.tsx`),
        context: {
          slug,
        },
      });
    });
  })();

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

// exports.createPages = ({ graphql, actions }) => {
//   setTimeout(function() {
//     const { createPage } = actions;
//     return new Promise((resolve, reject) => {
//       resolve(
//         graphql(`
//           {
//             allListings {
//               edges {
//                 node {
//                   id
//                   make
//                   model
//                 }
//               }
//             }
//           }
//         `).then(result => {
//           if (result.errors) {
//             reject(result.errors);
//           }
//           result.data.allListings.edges.forEach(edge => {
//             createPage({
//               path: `${edge.node.make}-${edge.node.model}-${edge.node.id}`,
//               component: path.resolve(`./src/templates/listing-view.tsx`),
//               context: {
//                 slug: `${edge.node.make}-${edge.node.model}-${edge.node.id}`,
//               },
//             });
//           });
//           return;
//         })
//       );
//     });
//   }, 3000);
// };
