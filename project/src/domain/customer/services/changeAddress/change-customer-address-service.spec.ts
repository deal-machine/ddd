import { EventProvider } from "../../../../@shared/events";
import { DomainException } from "../../../../@shared/errors";
import { ChangeCustomerAddressService } from "./change-customer-address-service";
import { Customer } from "../../entities/customer";
import { Address } from "../../value-objects";
import { ChangeAddressCustomerEventProvider } from "../../../../main/factories/change-customer-address-event-provider";

interface SutInterface {
  sut: ChangeCustomerAddressService;
  eventStub: EventProvider<any>;
}

const makeEventStub = (): EventProvider<any> => {
  const eventStub = new ChangeAddressCustomerEventProvider();
  return eventStub;
};
const makeSut = (): SutInterface => {
  const eventStub = makeEventStub();
  const sut = new ChangeCustomerAddressService({
    event: eventStub,
  });
  return {
    sut,
    eventStub,
  };
};
describe("Change Customer Address Service", () => {
  it("should throw DomainException when address is empty", () => {
    const { sut } = makeSut();
    const customer = new Customer({ id: "1", name: "customer name" });
    const address = {
      country: "address.country",
      number: "address.number",
      street: "address.street",
      zipcode: "address.zipcode",
    } as Address;
    try {
      sut.execute(customer, address);
    } catch (error: any) {
      expect(error).toBeTruthy();
      expect(error).toBeInstanceOf(DomainException);
      expect(error.message).toBe("city is required to change Address");
    }
  });
  it("should call changeAddress and notify event", () => {
    const { sut, eventStub } = makeSut();
    const dispatchSpy = jest.spyOn(eventStub, "dispatch");

    const customer = new Customer({ id: "1", name: "customer name" });
    const address = {
      country: "address.country",
      number: "address.number",
      street: "address.street",
      zipcode: "address.zipcode",
      city: "address.city",
    };

    sut.execute(customer, address);

    expect(dispatchSpy).toBeCalled();
    expect(dispatchSpy).toBeCalledWith(customer);
  });
});
