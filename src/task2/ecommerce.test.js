import { fetchOrderById } from "../api";
import {
  fetchAllOrders,
  bucketOrdersByUsers,
  getLast2WeeksOrders,
  bucketOrdersByDate,
} from "./ecommerce";

const ORDER_ID = "70ef599e5eca171b2bce84d1";

const ORDER_OBJECT = {
  id: expect.any(String),
  userId: expect.any(String),
  timestamp: expect.any(Number),
  title: expect.any(String),
};

test("Ecommerce - fetchOrderById", async () => {
  let orders = await fetchOrderById(ORDER_ID);
  expect(orders).toBeTruthy();
});

test("Ecommerce - fetchAllOrders", async () => {
  let orders = await fetchAllOrders();
  expect(orders).toBeTruthy();
  orders.forEach((order) =>
    expect(order).toEqual(expect.objectContaining(ORDER_OBJECT))
  );
});

test("Ecommerce - bucketOrdersByUsers", async () => {
  let usersBucket = await bucketOrdersByUsers();
  expect(usersBucket).toBeTruthy();

  for (const user in usersBucket) {
    expect(usersBucket[user]).toEqual(expect.arrayContaining([ORDER_OBJECT]));
  }
});

test("Ecommerce - getLast2WeeksOrders", async () => {
  let last2WeeksOrders = await getLast2WeeksOrders();
  expect(last2WeeksOrders).toBeTruthy();

  last2WeeksOrders.forEach((order) =>
    expect(order).toEqual(expect.objectContaining(ORDER_OBJECT))
  );
});

test("Ecommerce - bucketOrdersByDate", async () => {
  let ordersByDate = await bucketOrdersByDate();
  expect(ordersByDate).toBeTruthy();

  for (const date in ordersByDate) {
    if (ordersByDate[date].length > 0) {
      expect(ordersByDate[date]).toEqual(
        expect.arrayContaining([ORDER_OBJECT])
      );
    }
  }
});
