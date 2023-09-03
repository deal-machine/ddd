/* import { initDatabase } from "./infrastructure/database/sequelize";

(async () => {
  const seq = await initDatabase();
  console.log(`\nConnected on ${seq.getDatabaseName()}\n`);
})();
*/

import { ChangeAddressCustomerEventProvider } from "./domain/services/customer/changeAddress/change-customer-address-event-provider";
import { ChangeCustomerAddressService } from "./domain/services/customer/changeAddress/change-customer-address-service";
import { CreateCustomerEventProvider } from "./domain/services/customer/create/create-customer-event-provider";
import { CreateCustomerService } from "./domain/services/customer/create/create-customer-service";
import { Uuid } from "./infrastructure/uuid/uuid";

const uuid = new Uuid();
const createEvent = new CreateCustomerEventProvider();

const createCustomer = new CreateCustomerService({
  event: createEvent,
  uuid,
});
const customer = createCustomer.execute("Douglas Lourenço");

const changeAddressEvent = new ChangeAddressCustomerEventProvider();
const changeAddress = new ChangeCustomerAddressService({
  event: changeAddressEvent,
});
changeAddress.execute(customer, {
  city: "Itapetininga",
  country: "Brasil",
  number: "000",
  street: "Street",
  zipcode: "1820000",
});
