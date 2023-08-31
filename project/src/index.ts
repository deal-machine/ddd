import { Customer, Order, OrderItem, Product } from "./domain/entities/";
import { Address } from "./domain/value-objects/";

function print(message: string | number): void {
  console.log(`\n result \n ${message} \n`);
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

const product = new Product({
  id: "product-id",
  name: "product-name",
  category: "product-category",
  description: "product-description",
});

const orderItem = new OrderItem({
  id: "1234",
  name: "Item example one",
  price: 12,
  productId: product.getId(),
  quantity: 2,
});
const orderItemTwo = new OrderItem({
  id: "122",
  name: "second item example",
  price: 1,
  productId: product.getId(),
  quantity: 6,
});

const order = new Order({
  customerId: customer.getId(),
  id: "123123",
  items: [orderItem, orderItemTwo],
});

print(order.getTotal());
