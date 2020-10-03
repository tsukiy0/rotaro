export enum AlertType {
  SUCCESS,
  ERROR,
}

export class Alert {
  constructor(
    public readonly type: AlertType,
    public readonly message: string,
  ) {}
}
