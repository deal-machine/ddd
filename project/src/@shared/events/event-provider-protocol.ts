export interface EventProvider<T> {
  dispatch(value: T): void;
}
