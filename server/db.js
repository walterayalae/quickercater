const Promise = require('bluebird');

const neo4j = Promise.promisifyAll(require('neo4j'));

const Node = new neo4j.GraphDatabase({ url: process.env.GRAPHENEDB_URL || 'http://neo4j:start@localhost:7474' });

const db = module.exports;

/*
  **********************************************************************************************

  Initializes the Neo4j database with dummy data. Nodes are created first, then Relationships.

  Make sure you are running the Neo4j server first!

  **********************************************************************************************
*/

db.init = () => Node.cypherAsync({
  query: `
    CREATE (alice:Owner {
      name: 'Alice',
      phone: '555-444-3333',
      email: 'alice@window.com',
      description: 'I love Mexican food',
      auth_key: true
    })
    CREATE (bob:Owner {
      name: 'Bob',
      phone: '555-444-5555',
      email: 'bob@window.com',
      description: 'I love American food',
      auth_key: true
    })
    CREATE (carly:Customer {
      name: 'Carly',
      phone: '555-333-5555',
      email: 'carly@window.com',
      auth_key: true
    })
    CREATE (dan:Customer {
      name: 'Dan',
      phone: '555-333-4444',
      email: 'dan@window.com',
      auth_key: false
    })

    CREATE (aliceDelivery:Package {
      name: 'Delivery',
      type: 'delivery',
      cost: 25,
      description: 'Fast and easy'
    })
    CREATE (aliceTruck:Package {
      name: 'Food Truck',
      type: 'truck',
      cost: 15,
      description: 'Fast and friendly'
    })
    CREATE (aliceOnSite:Package {
      name: 'On-site',
      type: 'onSite',
      cost: 75,
      description: 'The whole enchilada'
    })
    CREATE (bobDelivery:Package {
      name: 'Delivery',
      type: 'delivery',
      cost: 20,
      description: 'Slow and steady'
    })
    CREATE (bobTruck:Package {
      name: 'Food Truck',
      type: 'truck',
      cost: 10, 
      description: 'Slow and friendly'
    })
    CREATE (bobOnSite:Package {
      name: 'On-site',
      type: 'onSite',
      cost: 50,
      description: 'The whole tamale'
    })

    CREATE (aliceMenu1:Menu {
      name: 'Drinks',
      description: 'Tasty beverages'
    })
    CREATE (aliceMenu2:Menu {
      name: 'Appetizers',
      description: 'Side dishes'
    })
    CREATE (aliceMenu3:Menu {
      name: 'Main',
      description: 'Main entrees'
    })
    CREATE (aliceMenu4:Menu {
      name: 'Desserts',
      description: 'Tasty treats'
    })
    CREATE (bobMenu1:Menu {
      name: 'Drinks',
      description: 'Tasty beverages'
    })
    CREATE (bobMenu2:Menu {
      name: 'Sides',
      description: 'Side orders'
    })
    CREATE (bobMenu3:Menu {
      name: 'Main',
      description: 'Burgers for your hole'
    })
    CREATE (bobMenu4:Menu {
      name: 'Desserts',
      description: 'Tasty treats'
    })

    CREATE (bobDrink1:Item {
      name: 'Tea',
      description: 'Fresh brew',
      price: 1.5,
      picture: false
    })
    CREATE (bobDrink2:Item {
      name: 'Water',
      description: 'Free',
      price: 0,
      picture: false
    })
    CREATE (bobDrink3:Item {
      name: 'Lemonade',
      description: 'Fresh squeezed',
      price: 1.75,
      picture: false
    })
    CREATE (bobSide1:Item {
      name: 'Chips',
      description: 'Freshly bagged',
      price: .99,
      picture: false
    })
    CREATE (bobSide2:Item {
      name: 'Fries',
      description: 'Fresh fried',
      price: .99,
      picture: false
    })
    CREATE (bobSide3:Item {
      name: 'Onion Rings',
      description: 'Fresh fried',
      price: 1.99,
      picture: false
    })
    CREATE (bobMain1:Item {
      name: 'Hamburger',
      description: 'Classic burger',
      price: 2.99,
      picture: true
    })
    CREATE (bobMain2:Item {
      name: 'Cheeseburger',
      description: 'Classic plus cheese',
      price: 3.99,
      picture: false
    })
    CREATE (bobMain3:Item {
      name: 'Double Cheeseburger',
      description: 'Classic plue a whole lotta cheese',
      price: 6.99,
      picture: false
    })
    CREATE (bobDessert1:Item {
      name: 'Milkshake',
      description: 'Order me',
      price: 1.99,
      picture: false
    })
    CREATE (aliceDrink1:Item {
      name: 'Tea',
      description: 'Fresh brew',
      price: 1.5,
      picture: false
    })
    CREATE (aliceDrink2:Item {
      name: 'Water',
      description: 'Free',
      price: 0,
      picture: false
    })
    CREATE (aliceDrink3:Item {
      name: 'Lemonade',
      description: 'Fresh squeezed',
      price: 1.75,
      picture: false
    })
    CREATE (aliceSide1:Item {
      name: 'Chips',
      description: 'Freshly made',
      price: 1.99,
      picture: false
    })
    CREATE (aliceSide2:Item {
      name: 'Nachos',
      description: 'Fresh melted',
      price: 3.99,
      picture: false
    })
    CREATE (aliceSide3:Item {
      name: 'Quesadillas',
      description: 'Fresh grilled',
      price: 6.99,
      picture: false
    })
    CREATE (aliceMain1:Item {
      name: 'Enchilada',
      description: 'Nice and cheesy',
      price: 8.99,
      picture: true
    })
    CREATE (aliceMain2:Item {
      name: 'Carnitas',
      description: 'Nice and beefy',
      price: 10.99,
      picture: false
    })
    CREATE (aliceMain3:Item {
      name: 'Torta',
      description: 'On the go',
      price: 9.99,
      picture: false
    })
    CREATE (aliceDessert1:Item {
      name: 'Churro',
      description: 'Order me',
      price: 3.99,
      picture: false
    })

    CREATE (aliceStore:Store {
      name: 'Casa de Alice',
      picture: false,
      address: '123 YourMom Rd.',
      slogan: "I'll make all your wildest dreams come true",
      description: 'Not a house of prostitution, but we have nice chicharrones.'
    })
    CREATE (bobStore:Store {
      name: "Bob's Burger Hole",
      picture: false,
      address: '123 YourMom Blvd.',
      slogan: 'Fill up those buns and put a burger in your hole!',
      description: 'Also, not a house of prostitution, but our buns are soft'
    })

    CREATE (carlyOrder1:CustomerOrder {
      name: 'Burger Delivery',
      created_on: 'yesterday',
      request_date: 'tomorrow',
      fulfilled: false,
      total_price: 0,
      address: '321 RightBehindYou Ln.'
    })
    CREATE (carlyOrder2:CustomerOrder {
      name: 'Mexican Delivery',
      created_on: 'yesterday',
      request_date: 'tomorrow after tomorrow',
      fulfilled: false,
      total_price: 0,
      address: '321 RightBehindYou Ln.'
    })

    CREATE (alice)-[:CAN_EDIT]->(aliceDelivery)
    CREATE (alice)-[:CAN_EDIT]->(aliceTruck)
    CREATE (alice)-[:CAN_EDIT]->(aliceOnSite)
    CREATE (bob)-[:CAN_EDIT]->(bobDelivery)
    CREATE (bob)-[:CAN_EDIT]->(bobTruck)
    CREATE (bob)-[:CAN_EDIT]->(bobOnSite)

    CREATE (alice)-[:CAN_EDIT {order: 0}]->(aliceMenu1)
    CREATE (alice)-[:CAN_EDIT {order: 1}]->(aliceMenu2)
    CREATE (alice)-[:CAN_EDIT {order: 2}]->(aliceMenu3)
    CREATE (alice)-[:CAN_EDIT {order: 3}]->(aliceMenu4)
    CREATE (bob)-[:CAN_EDIT {order: 0}]->(bobMenu1)
    CREATE (bob)-[:CAN_EDIT {order: 1}]->(bobMenu2)
    CREATE (bob)-[:CAN_EDIT {order: 2}]->(bobMenu3)
    CREATE (bob)-[:CAN_EDIT {order: 3}]->(bobMenu4)

    CREATE (aliceMenu1)-[:CAN_EDIT {order: 0}]->(aliceDrink1)
    CREATE (aliceMenu1)-[:CAN_EDIT {order: 1}]->(aliceDrink2)
    CREATE (aliceMenu1)-[:CAN_EDIT {order: 2}]->(aliceDrink3)
    CREATE (bobMenu1)-[:CAN_EDIT {order: 0}]->(bobDrink1)
    CREATE (bobMenu1)-[:CAN_EDIT {order: 1}]->(bobDrink2)
    CREATE (bobMenu1)-[:CAN_EDIT {order: 2}]->(bobDrink3)
    CREATE (aliceMenu2)-[:CAN_EDIT {order: 0}]->(aliceSide1)
    CREATE (aliceMenu2)-[:CAN_EDIT {order: 1}]->(aliceSide2)
    CREATE (aliceMenu2)-[:CAN_EDIT {order: 2}]->(aliceSide3)
    CREATE (bobMenu2)-[:CAN_EDIT {order: 0}]->(bobSide1)
    CREATE (bobMenu2)-[:CAN_EDIT {order: 1}]->(bobSide2)
    CREATE (bobMenu2)-[:CAN_EDIT {order: 2}]->(bobSide3)
    CREATE (aliceMenu3)-[:CAN_EDIT {order: 0}]->(aliceMain1)
    CREATE (aliceMenu3)-[:CAN_EDIT {order: 1}]->(aliceMain2)
    CREATE (aliceMenu3)-[:CAN_EDIT {order: 2}]->(aliceMain3)
    CREATE (bobMenu3)-[:CAN_EDIT {order: 0}]->(bobMain1)
    CREATE (bobMenu3)-[:CAN_EDIT {order: 1}]->(bobMain2)
    CREATE (bobMenu3)-[:CAN_EDIT {order: 2}]->(bobMain3)
    CREATE (aliceMenu4)-[:CAN_EDIT {order: 0}]->(aliceDessert1)
    CREATE (bobMenu4)-[:CAN_EDIT {order: 0}]->(bobDessert1)

    CREATE (alice)-[:CAN_EDIT]->(aliceStore)
    CREATE (bob)-[:CAN_EDIT]->(bobStore)

    CREATE (carly)-[:CREATED {created_on: 'yesterday', expires: 'today'}]->(carlyOrder2)
    CREATE (carlyOrder2)-[:VIEW]->(carly)
    CREATE (carlyOrder2)-[:REQUEST {quantity: 25}]->(aliceDrink1)
    CREATE (carlyOrder2)-[:REQUEST {quantity: 25}]->(aliceDrink3)
    CREATE (carlyOrder2)-[:REQUEST {quantity: 50}]->(aliceSide1)
    CREATE (carlyOrder2)-[:REQUEST {quantity: 50}]->(aliceMain1)
    CREATE (carlyOrder2)-[:REQUEST {quantity: 50}]->(aliceDessert1)
    CREATE (carlyOrder2)-[:REQUEST]->(aliceDelivery)
    CREATE (carlyOrder2)-[:VIEW]->(alice)
    CREATE (alice)-[:CAN_EDIT]->(carlyOrder2)
    CREATE (carly)-[:CREATED {created_on: 'yesterday', expires: 'tomorrow'}]->(carlyOrder1)
    CREATE (carlyOrder1)-[:VIEW]->(carly)
    CREATE (carlyOrder1)-[:VIEW]->(bob)
    CREATE (carlyOrder1)-[:REQUEST {quantity: 100}]->(bobDrink3)
    CREATE (carlyOrder1)-[:REQUEST {quantity: 100}]->(bobSide1)
    CREATE (carlyOrder1)-[:REQUEST {quantity: 100}]->(bobMain3)
    CREATE (carlyOrder1)-[:REQUEST {quantity: 100}]->(bobDessert1)
    CREATE (carlyOrder1)-[:REQUEST]->(bobTruck)
    CREATE (bob)-[:CAN_EDIT]->(carlyOrder1)`,
});

db.clearRelationships = () => Node.cypherAsync({
  query: `
    MATCH ()-[r]-()
    DELETE r`,
});

db.clearNodes = () => Node.cypherAsync({
  query: `
    MATCH (n)
    DELETE n`,
});

db.reset = () => db.clearRelationships()
  .then(() => db.clearNodes())
  .then(() => db.init());

/*
  **********************************************************************************************

  These functions will handle generic nodes and relationships.

  Make sure you are running the Neo4j server first!

  **********************************************************************************************
*/

db.createRelationship = (parentLabel, parentId, relLabel, destLabel, destIdArray) =>
  Node.cypherAsync({
    query: `
      WITH {destIdArray} AS destIds
      UNWIND destIds AS destId
      MATCH (parent:${parentLabel}) WHERE ID(parent) = {parentId}
      MATCH (dest:${destLabel}) WHERE ID(dest) = destId
      MERGE (parent)-[rel:${relLabel}]->(dest)
      RETURN parent, rel, dest`,
    params: {
      parentId,
      destIdArray,
    },
  });

db.findRelationship = (parentLabel, parentId, relLabel, destLabel, destId) =>
  Node.cypherAsync({
    query: `
      MATCH (parent:${parentLabel}) WHERE ID(parent) = {parentId}
      MATCH (dest:${destLabel}) WHERE ID(dest) = {destId}
      MATCH (parent)-[rel:${relLabel}]-(dest)
      RETURN rel`,
    params: {
      parentId,
      destId,
    },
  });

db.findRelationshipById = (relId) =>
  Node.cypherAsync({
    query: `
      MATCH (rel) WHERE ID(rel) = {id}
      RETURN rel`,
    params: {
      id: relId,
    },
  });

db.deleteRelationship = (parentLabel, parentId, relLabel, destLabel, destId) =>
  Node.cypherAsync({
    query: `
      MATCH (parent:${parentLabel}) WHERE ID(parent) = {parentId}
      MATCH (dest:${destLabel}) WHERE ID(dest) = {destId}
      MATCH (parent)-[rel:${relLabel}]-(dest)
      DELETE rel`,
    params: {
      parentId,
      destId,
    },
  });

db.findNode = (nodeLabel, nodeId) => Node.cypherAsync({
  query: `
    MATCH (node:${nodeLabel}) WHERE ID(node) = ${nodeId}
    RETURN node`,
  params: {
    id: nodeId,
  },
})
.then(response => {
  if (response.length === 0) {
    const errMessage = 'Node does not exist';
    throw errMessage;
  }
  return response[0].node;
})
.catch(err => err);

db.deleteNode = (nodeLabel, nodeId) => Node.cypherAsync({
  query: `
    MATCH (node:${nodeLabel}) WHERE ID(node) = ${nodeId}
    OPTIONAL MATCH (node)-[rel]-()
    DELETE node, rel`,
  params: {
    nodeId,
  },
})
.then(response => response);

/*
  **********************************************************************************************

  These functions will service the GET, POST, UPDATE, and DELETE endpoints for Owner.

  Make sure you are running the Neo4j server first!

  **********************************************************************************************
*/

// !!! STILL NEEDS TO IMPLEMENT VALIDATION TO AVOID DUPLICATING DATA !!!
db.createOwner = (owner) => Node.cypherAsync({
  query: `
    MERGE (owner:Owner {
      name: {name},
      phone: {phone},
      email: {email},
      description: {description},
      auth_key: {auth_key}
    })
    RETURN owner`,
  params: {
    name: owner.name,
    phone: owner.phone,
    email: owner.email,
    description: owner.description,
    auth_key: owner.auth_key,
  },
})
.then(response => response[0].owner);

db.findAllOwners = () => Node.cypherAsync({
  query: 'MATCH (owner:Owner) RETURN owner',
})
.then(response => response.map(e => e.owner));

/*
  **********************************************************************************************

  These functions will service the GET, POST, UPDATE, and DELETE endpoints for Orders.

  **********************************************************************************************
*/
db.createOrder = (order) => Node.cypherAsync({
  query: `
    MERGE (order:CustomerOrder {
      name: {name},
      created_on: {created_on},
      request_date: {request_date},
      fulfilled: {fulfilled},
      total_price: {total_price},
      address: {address}
    }) 
    RETURN order`,
  params: {
    name: order.name,
    created_on: order.created_on,
    request_date: order.request_date,
    fulfilled: order.fulfilled,
    total_price: order.total_price,
    address: order.address,
  },
})
.then(response => response[0].order);

/* Assumption here is that an array of item objects [{itemId: , quantity: },..]
is passed in to add to the order*/
db.addItemsToOrder = (orderId, items, ownerId) => Node.cypherAsync({
  query: `
    WITH {items} AS itemArray
    UNWIND itemArray AS menuitem
    MATCH (owner:Owner) WHERE ID(owner) = ${ownerId}
    MATCH (item:Item)<-[:CAN_EDIT]-(menu:Menu)<-[:CAN_EDIT]-(owner) WHERE ID(item) = menuitem.itemId
    MATCH (order:CustomerOrder) WHERE ID(order) = ${orderId}
    MERGE (order)-[rel:REQUEST {quantity: menuitem.quantity}]->(item)
    RETURN rel`,
  params: {
    orderId,
    items,
    ownerId,
  },
})
.then(response => response);

db.createOrderCustomerRelationship = (orderId, customerId, orderExpiry) => Node.cypherAsync({
  query: `
    MATCH (order:CustomerOrder) WHERE ID(order) = ${orderId}
    MATCH (customer:Customer) WHERE ID(customer) = ${customerId}
    MERGE (order)<-[relA:CREATED {expires: {orderExpiry}}]-(customer)
    MERGE (order)-[relB:VIEW]->(customer)
    RETURN relA, relB`,
  params: {
    orderId,
    orderExpiry,
    customerId,
  },
})
.then(response => response);

db.createOrderPackageRelationship = (orderId, packageId, quantity) => Node.cypherAsync({
  query: `
    MATCH (order:CustomerOrder) WHERE ID(order) = ${orderId}
    MATCH (pkg:Package) WHERE ID(pkg) = ${packageId}
    MERGE (order)-[rel:REQUEST {quantity: {quantity}}]->(pkg)
    RETURN rel`,
  params: {
    orderId,
    packageId,
    quantity,
  },
})
.then(response => response);

db.createOrderAndRelationships = (orderInfo) => {
  var saveOrder = {};
  return db.createOrder(orderInfo.order)
    .then((orderCreated) => {
      saveOrder = Object.assign({}, orderCreated);
      return Promise.all([db.addItemsToOrder(orderCreated._id, orderInfo.items, orderInfo.ownerId),
        db.createOrderCustomerRelationship(
          orderCreated._id, orderInfo.customerId, orderInfo.package.expires),
        db.createOrderPackageRelationship(
          orderCreated._id, orderInfo.package.id, 1),
        db.createRelationship(
          'Owner', orderInfo.ownerId, 'VIEW', 'CustomerOrder', [orderCreated._id]),
        ]);
    })
    .then(response => ({ order: saveOrder, relationships: response }));
};

db.fetchOrder = (orderId) => Node.cypherAsync({
  query: `
    MATCH (order:CustomerOrder) WHERE ID(order) = {orderId}
    MATCH (item:Item)<-[relA:REQ]-(order)
    MATCH (pkg:Package)<-[relB:REQ]-(order)
    MATCH (customer:Customer)<-[relC:VIEW]-(order)
    RETURN order, item, relA, pkg, customer`,
  params: {
    orderId,
  },
})
.then(response => {
  if (response.length === 0) {
    const errMessage = 'Order does not exist';
    throw errMessage;
  }
  return response;
})
.catch(err => err);

db.fetchAllPendingOrders = (ownerId) => Node.cypherAsync({
  query: `
    MATCH (owner:Owner) WHERE ID(owner) = {ownerId}
    MATCH (order:Order)<-[rel:CAN_EDIT]-(owner)
    WHERE order.fulfilled = false
    RETURN order`,
  params: {
    ownerId,
  },
})
.then(response => response);

db.fetchAllCompletedOrders = (ownerId) => Node.cypherAsync({
  query: `
    MATCH (owner:Owner) WHERE ID(owner) = {ownerId}
    MATCH (order:Order)-[rel:VIEW]->(owner)
    WHERE order.fulfilled = true
    RETURN order`,
  params: {
    ownerId,
  },
})
.then(response => response);

db.updateOrderStatus = (orderId, status) => Node.cypherAsync({
  query: `
    MATCH (order:CustomerOrder) WHERE ID(order) = {orderId}
    SET order.fulfilled: {status}
    RETURN order`,
  params: {
    orderId,
    status,
  },
})
.then(response => response);

db.updateItemQtyOnOrder = (orderId, itemId, quantity) => Node.cypherAsync({
  query: `
    MATCH (order:CustomerOrder) WHERE ID(order) = {orderId}
    MATCH (item:Item) WHERE ID(item) = {itemId}
    MATCH (item)-[rel:REQUEST]->(order)
    SET rel.quantity: {quantity}
    RETURN order`,
  params: {
    orderId,
    itemId,
    quantity,
  },
})
.then(response => response);

/*
  **********************************************************************************************

  These functions will service the GET, POST, UPDATE, and DELETE endpoints for Menus.

  **********************************************************************************************
*/

db.getMenuByOwnerId = (ownerId) => Node.cypherAsync({
  query: `
    MATCH (owner:Owner) WHERE ID(owner) = ${ownerId}
    MATCH (owner)-[rel1:CAN_EDIT]->(menu:Menu)-[rel2:CAN_EDIT]->(item:Item)
    RETURN menu, item ORDER BY rel1.order, rel2.order`,
  params: {
    ownerId,
  },
});

db.createStore = (store) => Node.cypherAsync({
  query: `
    MERGE (store:Store {
      name: {name},
      picture: {picture},
      address: {address},
      slogan: {slogan},
      description: {description}
    }) 
    RETURN store`,
  params: {
    name: store.name,
    picture: store.picture,
    address: store.address,
    slogan: store.slogan,
    description: store.description,
  },
})
.then(response => response[0].order);

db.findAllStores = () => Node.cypherAsync({
  query: 'MATCH (stores:Store) RETURN stores',
})
.then(response => response.map(e => e.stores));

db.createItem = (itemObj) => Node.cypherAsync({
  query: `
    MERGE (item:Item {
      name: {name},
      description: {description},
      price: {price},
      picture: {picture}
    }) 
    RETURN item`,
  params: {
    name: itemObj.name,
    description: itemObj.description,
    price: itemObj.price,
    picture: itemObj.picture,
  },
})
.then(response => response[0].item);

db.getItemById = (itemId) => {
  if (itemId === undefined) {
    throw new Error('Id is undefined');
  } else {
    return Node.cypherAsync({
      query: `
        MATCH (item:Item) 
        WHERE ID(item) = ${itemId}
        RETURN item`,
    })
    .then(response => {
      if (response[0]) {
        return response[0].item;
      } else {
        return 'Item does not exist';
      }
    });
  }
};

db.getItemByPicture = (picture) => Node.cypherAsync({
  query: `
    MATCH (item:Item)
    WHERE item.picture = {picture}
    RETURN item`,
  params: {
    picture,
  },
}).then(resp => resp[0].item);

db.updateItem = (itemObj) => {
  const id1 = itemObj._id;
  delete itemObj._id;  // don't want to create an '_id' prop (doesn't go both ways)
  return Node.cypherAsync({
    query: `
      MATCH (item:Item)
      WHERE ID(item) = {id}
      SET item = {itemObj}
      RETURN item`,
    params: {
      id: id1,
      name: itemObj.name,
      description: itemObj.description,
      price: itemObj.price,
      picure: itemObj.picure,
      itemObj,
    },
  }).then(response => response[0].item);
};

db.removeItemById = (itemId) => Node.cypherAsync({
  query: `MATCH (i:Item)
          WHERE ID(i) = {id}  
          OPTIONAL MATCH () -[rel]-(i)
          DELETE rel
          DELETE i
          return count(i) as success`,
  params: {
    id: itemId,
  },
}).then(response=> response[0].success == 1 );

/*
 **********************************************************************************************
  This functions will create, update, get and delete packages.

 **********************************************************************************************
*/

db.createPackage = (pack) => Node.cypherAsync({
  query: `
    MERGE(pack:Package {
      name: {name},
      type: {type},
      cost: {cost},
      description: {description}
    })
    RETURN pack`,
  params: {
    name: pack.name,
    type: pack.type,
    cost: pack.cost,
    description: pack.description,
  },
})
.then(response => response[0].pack);

db.findPackageByOwner = (ownerID, pack) => Node.cypherAsync({
  query: `MATCH (owner:Owner) WHERE ID(owner)= ${ownerID}
          MATCH (owner)-[rel:CAN_EDIT]->(pack:Package {name:{name}}) 
          RETURN pack`,
  params: {
    name: pack.name,
  },
})
.then(response => {
  if (response.length === 0) {
    const errMessage = 'No package available';
    throw errMessage;
  }
  return response[0].pack;
})
.catch(err => err);

db.deletePackage = (packType) => Node.cypherAsync({
  query: 'MATCH (pack:Package { type: {type} }) DELETE pack',
  params: {
    type: packType,
  },
})
.then(response => response);
