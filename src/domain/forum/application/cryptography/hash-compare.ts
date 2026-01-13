export abstract class HashCompare {
  abstract compare(plain: string, password: string): Promise<boolean>
}
