////////////////////////////////////////////// Helper code, do not edit /////////////////////////////////////////
import { allIds, fetchOrderById } from "../api/index.js";

////////////////////////////////// Your code tasks is below //////////////////////////////////////////////////////
const TODAY = Date.now();
const UNIX_TO_DAYS = 1000 * 60 * 60 * 24;

export const fetchAllOrders = async () => {
  const ids = allIds;
  // .....

  const ordersPromises = ids.map((id) =>
    fetchOrderById(id).catch((err) => console.error(err))
  );

  const orders = await Promise.all(ordersPromises).then((values) => values);
  return orders;
  //   1. TODO: fetch all ids using the "fetchOrderById" and the given ids, make it work as efficient and clean as possible.
};

export const bucketOrdersByUsers = async () => {
  let ordersByUsers = {};
  const fetchedOrders = await fetchAllOrders();

  const usersArray = fetchedOrders.map((order) => order.userId);
  const uniqueUsersArray = new Set(usersArray);

  uniqueUsersArray.forEach((value) => {
    const userOrders = fetchedOrders.filter((order) => order.userId === value);
    ordersByUsers[value] = userOrders;
  });

  //   2. TODO: using the function from section 1 you should now bucket the orders by user.
  // each key in the object (ordersByUsers) represents a userId and each value is an array of the orders of that user.
  return ordersByUsers;
};

export const getLast2WeeksOrders = async () => {
  //   3. TODO: fetch all Ids and return array with only the last 2 weeks orders. make it work as efficient and clean as possible.
  const fetchedOrders = await fetchAllOrders();

  const last2WeeksOrders = fetchedOrders.filter(
    (order) => (TODAY - order.timestamp) / UNIX_TO_DAYS < 14
  );

  return last2WeeksOrders;
};

export const bucketOrdersByDate = async () => {
  const last2WeeksOrders = await getLast2WeeksOrders();
  let ordersByDate = {};
  for (let i = 0; i < 14; i++) {
    ordersByDate[i] = [];
  }

  last2WeeksOrders.forEach((order) => {
    const dayToMap = Math.floor((TODAY - order.timestamp) / UNIX_TO_DAYS);
    ordersByDate[dayToMap].push(order);
  });
  //   4. TODO: using the function from section 3 bucket the orders by date.
  // each key in the object (ordersByDate) represents a day and each value is an array of the orders in that date.
  return ordersByDate;
};

// fetchAllOrders();
// .then(console.log);

// bucketOrdersByUsers();
// // .then(console.log);

// getLast2WeeksOrders();
// // .then(console.log);

// bucketOrdersByDate();
// .then(console.log);

////////////////////////////////////////
