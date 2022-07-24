export class ApiAddresses {
  private static readonly baseAddress = "https://ulm-dsl.de";

  static inboxApi(name: string): string {
    return `${this.baseAddress}/inbox-api.php?name=${name}`;
  }

  static mailApi(name: string, id: number): string {
    return `${this.baseAddress}/mail-api.php?name=${name}&id=${id}`;
  }
}
