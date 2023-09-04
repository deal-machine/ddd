import { ChangeCustomerAddressService } from "./domain/customer/services/changeAddress/change-customer-address-service";
import { CreateCustomerService } from "./domain/customer/services/create/create-customer-service";
import { Uuid } from "./infrastructure/@shared/adapters/uuid/uuid";
import { ChangeAddressCustomerEventProvider } from "./main/factories/change-customer-address-event-provider";
import { CreateCustomerEventProvider } from "./main/factories/create-customer-event-provider";

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
