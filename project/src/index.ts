import { CreateCustomerEventProvider } from "./main/factories/create-customer-event-provider";
import { ChangeAddressCustomerEventProvider } from "./main/factories/change-customer-address-event-provider";
import { CreateCustomerService } from "./domain/services/customer/create/create-customer-service";
import { ChangeCustomerAddressService } from "./domain/services/customer/changeAddress/change-customer-address-service";
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
