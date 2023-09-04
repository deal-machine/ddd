import { v4 } from "uuid";
import { IdentifierGeneratorAdapter } from "../../@shared/adapters";

export class Uuid implements IdentifierGeneratorAdapter {
  generate(): string {
    return v4();
  }
}
