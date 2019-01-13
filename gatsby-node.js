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
    // const fetchSiteData = () => axios.get(`http://localhost:3000/listings`);
    // await for results
    const res = [
      {
        id: 1,
        vehicleId: 'BT02FLY',
        make: 'Audi',
        model: 'A4',
        trim: 'Black Edition 35 TDI S tronic',
        description: 'Drives great and is a good runner.',
        color: 'white',
        price: 23999,
        year: 2018,
        mileage: 8765,
        doors: 4,
        bodyType: 'Saloon',
        fuelType: 'Diesel',
        engine: { size: 2998 },
        transmission: 'Automatic',
        performance: {
          bhp: 345,
          torque: 317,
          zeroTo60: 7.2,
        },
        condition: 'used',
        features: {
          interior: ['Steering wheel', 'Leather seats', 'TV'],
          exterior: ['15&quot; steel wheels', 'Battery saver function'],
        },
        images: [
          'https://assets.gocar.be/picserver1/userdata/1/25733/VmlTxhgqF/kfz43643555_bild1.jpg',
        ],
        slug: 'cars/audi-a4-white-2018-listing-1',
      },
      {
        id: 2,
        vehicleId: 'CX67JUF',
        make: 'Volkswagen',
        model: 'Transporter',
        trim: '2.0 T28 TDI P/V HIGHLINE BMT 1d 101 BHP',
        description:
          'DRIVEN GROUP TEESSIDE IS DELIGHTED TO OFFER THIS BEAUTIFULLY PRESENTED VOLKSWAGEN TRANSPORTER 2.0 T28 TDI P/V HIGHLINE BMT. FINISHED IN RED AND COMPLIMENTED BY GREY HALF-LEATHER INTERIOR. THIS STUNNING CAR BENEFITS FROM REGISTERED SERVICE HISTORY AND PRE DELIVERY SERVICE AND HEALTH CHECK JUST CARRIED OUT AT 8500 MILES). THIS VEHICLE COMES EQUIPPED WITH HIGH SPECIFICATION, WHICH INCLUDES, 20 INCH ALLOY WHEELS, REVERSE PARKING SENSORS, HEATED WING MIRRORS, CRUISE CONTROL, ECO STOP/START TECHNOLOGY, BLUETOOTH AUDIO PLAYER &amp; TELEPHONE SYSTEM, TOUCH SCREEN MEDIA DISPLAY, USB/AUX INPUT, CD PLAYER, DAB/FM/AM RADIO, AUTOMATIC HEADLIGHTS, STEERING WHEEL CONTROLS, TRIP COMPUTER, CLIMATE CONTROL, AIR CONDITIONING, HEATED FRONT WINDOW SCREEN.  DRIVEN GROUP IS DELIGHTED TO OFFER THIS CAR COMPLETE WITH 3 YEARS MOT AND A COMPREHENSIVE WARRANTY , COMPETITIVE BUY NOW PAY LATER OPTIONS INCLUDING &pound;99 DEPOSIT, PART EXCHANGE AND EXISTING FINANCE AGREEMENT SETTLEMENT.   , DRIVE THIS CAR HOME WITH COMPLETE CONFIDENCE AND SATISFACTION:  ALL CARS PROUDLY OFFERED BY DRIVEN GROUP ARE RIGOROUSLY INSPECTED, HPI CHECKED AND PREPARED TO THE HIGHEST STANDARD   TO DRIVE THIS CAR HOME, VISIT WWW.DRIVEGROUP.CO.UK OR CALL 01642-601999 TO ARRANGE AN APPOINTMENT WITH OUR SALES TEAM REF:TDN4B',
        color: 'silver',
        price: 24990,
        year: 2017,
        mileage: 8500,
        doors: 4,
        bodyType: 'Van',
        fuelType: 'Diesel',
        engine: { size: 1968 },
        transmission: 'Manual',
        performance: {
          bhp: 345,
          torque: 317,
          zeroTo60: 7.2,
        },
        condition: 'used',
        features: {
          interior: [
            '12V power point front',
            '13L multifunction glovebox',
            '60/40 split rear seats',
            'Centre console storage',
            'Coin tray',
          ],
          exterior: ['15&quot; steel wheels', 'Battery saver function'],
        },
        images: [
          'https://cdn2.autoexpress.co.uk/sites/autoexpressuk/files/2017/03/dsc_3806_0.jpg',
        ],
        slug: 'cars/volkswagen-transporter-silver-2017-listing-2',
      },
      {
        id: 3,
        vehicleId: 'GY12EPK',
        make: 'BMW',
        model: 'M3',
        trim: '4.0 M3 2d 415 BHP CARBON ROOF - RED LEATHER - NAV',
        description:
          'DRIVEN GROUP TEESSIDE IS DELIGHTED TO OFFER THIS BEAUTIFULLY PRESENTED M3 FINISHED IN CARBON BLACK AND COMPLIMENTED WITH A BLACK CARBON ROOF. THIS SUPERB SPEED MACHINE IS OFFERED COMPLETE WITH RED LEATHER, SATELLITE NAVIGATION, CLIMATE CONTROL, DIGITAL MEDIA DISPLAY, ELECTRIC MIRRORS, MULTI FUNCTION STEERING WHEEL AND MUCH MORE. THIS CAR ALSO BENEFITS FROM A REGISTERED SERVICE HISTORY (4 BMW SERVICES &amp; 3 SPECIALIST) -    DRIVEN GROUP IS COMMITTED TO OFFERING OUTSTANDING SERVICE AT EACH STAGE OF YOUR EXCITING CAR PURCHASE JOURNEY AND IS DELIGHTED TO OFFER THIS CAR COMPLETE WITH 3 YEARS MOT AND A COMPREHENSIVE WARRANTY, COMPETITIVE BUY NOW PAY LATER OPTIONS INCLUDING &pound;99 DEPOSIT, PART EXCHANGE AND EXISTING FINANCE AGREEMENT SETTLEMENT --    TO DRIVE THIS CAR HOME, VISIT WWW.DRIVENGROUP.CO.UK OR CALL 01642-601999 TO ARRANGE AN APPOINTMENT WITH OUR SALES TEAM  REF:AUPQB',
        color: 'black',
        price: 22990,
        year: 2012,
        mileage: 59120,
        doors: 2,
        bodyType: 'Coupe',
        fuelType: 'Petrol',
        engine: { size: 3999 },
        transmission: 'Manual',
        performance: {
          bhp: 415,
          torque: 295,
          zeroTo60: 4.8,
        },
        condition: 'used',
        features: {
          interior: [
            '12V power point front',
            '13L multifunction glovebox',
            '60/40 split rear seats',
            'Centre console storage',
            'Coin tray',
          ],
          exterior: ['15&quot; steel wheels', 'Battery saver function'],
        },
        images: [
          'https://images.clickdealer.co.uk/vehicles/1521/1521216/large2/31143948.jpg',
          'https://images.clickdealer.co.uk/vehicles/1521/1521216/large2/31143690.jpg',
          'https://images.clickdealer.co.uk/vehicles/1521/1521216/large2/31143691.jpg',
          'https://images.clickdealer.co.uk/vehicles/1521/1521216/large2/31143692.jpg',
        ],
        slug: 'cars/bmw-m3-black-2012-listing-3',
      },
      {
        id: 4,
        vehicleId: 'LL65MYD',
        make: 'Land Rover',
        model: 'Range Rover',
        trim: '2.0 TD4 SE TECH 5d AUTO 177 BHP',
        description:
          'DRIVEN GROUP TEESSIDE IS DELIGHTED TO OFFER THIS BEAUTIFULLY PRESENTED M3 FINISHED IN CARBON BLACK AND COMPLIMENTED WITH A BLACK CARBON ROOF. THIS SUPERB SPEED MACHINE IS OFFERED COMPLETE WITH RED LEATHER, SATELLITE NAVIGATION, CLIMATE CONTROL, DIGITAL MEDIA DISPLAY, ELECTRIC MIRRORS, MULTI FUNCTION STEERING WHEEL AND MUCH MORE. THIS CAR ALSO BENEFITS FROM A REGISTERED SERVICE HISTORY (4 BMW SERVICES &amp; 3 SPECIALIST) -    DRIVEN GROUP IS COMMITTED TO OFFERING OUTSTANDING SERVICE AT EACH STAGE OF YOUR EXCITING CAR PURCHASE JOURNEY AND IS DELIGHTED TO OFFER THIS CAR COMPLETE WITH 3 YEARS MOT AND A COMPREHENSIVE WARRANTY, COMPETITIVE BUY NOW PAY LATER OPTIONS INCLUDING &pound;99 DEPOSIT, PART EXCHANGE AND EXISTING FINANCE AGREEMENT SETTLEMENT --    TO DRIVE THIS CAR HOME, VISIT WWW.DRIVENGROUP.CO.UK OR CALL 01642-601999 TO ARRANGE AN APPOINTMENT WITH OUR SALES TEAM  REF:AUPQB',
        color: 'white',
        price: 22990,
        year: 2016,
        mileage: 41010,
        doors: 5,
        bodyType: 'SUV',
        fuelType: 'Diesel',
        engine: { size: 1999 },
        transmission: 'Automatic',
        performance: {
          bhp: 177,
          torque: 317,
          zeroTo60: 9,
        },
        condition: 'used',
        features: {
          interior: [
            '12V power point front',
            '13L multifunction glovebox',
            '60/40 split rear seats',
            'Centre console storage',
            'Coin tray',
          ],
          exterior: ['15&quot; steel wheels', 'Battery saver function'],
        },
        images: [
          'https://images.clickdealer.co.uk/vehicles/1883/1883025/large2/30484456.jpg',
          'https://images.clickdealer.co.uk/vehicles/1883/1883025/large2/30484460.jpg',
          'https://images.clickdealer.co.uk/vehicles/1883/1883025/large2/30484462.jpg',
          'https://images.clickdealer.co.uk/vehicles/1883/1883025/large2/30484465.jpg',
          'https://images.clickdealer.co.uk/vehicles/1883/1883025/large2/30484467.jpg',
        ],
        slug: 'cars/land-rover-range-rover-white-2016-listing-4',
      },
      {
        id: 5,
        vehicleId: 'NJ63OZK',
        make: 'Audi',
        model: 'Q5',
        trim: '2.0 TDI QUATTRO S LINE PLUS S/S 5d 175 BHP',
        description:
          'DRIVEN GROUP TEESSIDE IS DELIGHTED TO OFFER THIS BEAUTIFULLY PRESENTED M3 FINISHED IN CARBON BLACK AND COMPLIMENTED WITH A BLACK CARBON ROOF. THIS SUPERB SPEED MACHINE IS OFFERED COMPLETE WITH RED LEATHER, SATELLITE NAVIGATION, CLIMATE CONTROL, DIGITAL MEDIA DISPLAY, ELECTRIC MIRRORS, MULTI FUNCTION STEERING WHEEL AND MUCH MORE. THIS CAR ALSO BENEFITS FROM A REGISTERED SERVICE HISTORY (4 BMW SERVICES &amp; 3 SPECIALIST) -    DRIVEN GROUP IS COMMITTED TO OFFERING OUTSTANDING SERVICE AT EACH STAGE OF YOUR EXCITING CAR PURCHASE JOURNEY AND IS DELIGHTED TO OFFER THIS CAR COMPLETE WITH 3 YEARS MOT AND A COMPREHENSIVE WARRANTY, COMPETITIVE BUY NOW PAY LATER OPTIONS INCLUDING &pound;99 DEPOSIT, PART EXCHANGE AND EXISTING FINANCE AGREEMENT SETTLEMENT --    TO DRIVE THIS CAR HOME, VISIT WWW.DRIVENGROUP.CO.UK OR CALL 01642-601999 TO ARRANGE AN APPOINTMENT WITH OUR SALES TEAM  REF:AUPQB',
        color: 'blue',
        price: 16990,
        year: 2013,
        mileage: 71019,
        doors: 5,
        bodyType: 'SUV',
        fuelType: 'Diesel',
        engine: { size: 1968 },
        transmission: 'Manuel',
        performance: {
          bhp: 175,
          torque: 280,
          zeroTo60: 9,
        },
        condition: 'used',
        features: {
          interior: [
            '12V power point front',
            '13L multifunction glovebox',
            '60/40 split rear seats',
            'Centre console storage',
            'Coin tray',
          ],
          exterior: ['15&quot; steel wheels', 'Battery saver function'],
        },
        images: [
          'https://images.clickdealer.co.uk/vehicles/1807/1807256/large2/30795374.jpg',
          'https://images.clickdealer.co.uk/vehicles/1807/1807256/large2/30795375.jpg',
          'https://images.clickdealer.co.uk/vehicles/1807/1807256/large2/30795378.jpg',
          'https://images.clickdealer.co.uk/vehicles/1807/1807256/large2/28709394.jpg',
          'https://images.clickdealer.co.uk/vehicles/1807/1807256/large2/28709395.jpg',
          'https://images.clickdealer.co.uk/vehicles/1807/1807256/large2/30795381.jpg',
        ],
        slug: 'cars/audi-q5-blue-2013-listing-5',
      },
    ];

    // map into these results and create nodes
    await res.data.map(listing => {
      const {
        vehicleId,
        make,
        model,
        trim,
        description,
        color,
        price,
        year,
        mileage,
        doors,
        bodyType,
        fuelType,
        transmission,
        engine,
        performance,
        condition,
        features,
        images,
        slug,
      } = listing;
      // Create your node object
      const listingNode = {
        // Required fields
        id: 'listing-' + listing.id.toString(),
        parent: `__SOURCE__`,
        internal: {
          type: `Listings`, // name of the graphQL query --> allListings {}
          // contentDigest will be added just after
          // but it is required
        },
        children: [],

        vehicleId,
        make,
        model,
        trim,
        description,
        color,
        price,
        year,
        mileage,
        doors,
        bodyType,
        fuelType,
        engine: { size: engine.size },
        transmission,
        performance: {
          bhp: performance.bhp,
          torque: performance.torque,
          zeroTo60: performance.zeroTo60,
        },
        condition,
        features: {
          interior: features.interior,
          exterior: features.exterior,
        },
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
    // const fetchSiteData = () =>
    // axios.get(`http://localhost:3000/dealership-info`);
    // await for results
    const res = {
      orgId: 1,
      country: 'us',
      currency: '$',
    };

    // Create your node object
    const dealershipInfoNode = {
      // Required fields
      id: res.data.orgId.toString(),
      parent: `__SOURCE__`,
      internal: {
        type: `DealershipInfo`,
      },
      children: [],
      country: res.data.country,
      currency: res.data.currency,
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
