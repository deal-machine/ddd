import { v4 } from "uuid";
import { IdentifierGeneratorAdapter } from "../../application/protocols";

export class Uuid implements IdentifierGeneratorAdapter {
  generate(): string {
    return v4();
  }
}
