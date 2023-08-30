import { Customer, Order, OrderItem } from "./domain/entities/";
import { Address } from "./domain/value-objects/address";

function print(message: string | number): void {
  console.log(`result \n ${message} \n`);
}

const customer = new Customer({ id: "12", name: "Douglas Eduardo" });
const address = new Address({
  city: "itapetininga",
  country: "brasil",
  number: 1,
  street: "sarutaia",
  zipcode: "1820000",
});
customer.changeAddress(address);
print(customer.address.toString());

const orderItem = new OrderItem({
  id: "1234",
  name: "Item example one",
  price: 12,
});
const orderItemTwo = new OrderItem({
  id: "122",
  name: "second item example",
  price: 1,
});

const order = new Order({
  customerId: customer.id,
  id: "123123",
  items: [orderItem, orderItemTwo],
});

print(JSON.stringify(order));
print(order.total());
