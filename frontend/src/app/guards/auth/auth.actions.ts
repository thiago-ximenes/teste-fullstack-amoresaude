export class CheckToken {
  static readonly type = '[Auth] Check Token';
}

export class UpdateToken {
  static readonly type = '[Auth] Update Token';
  constructor(public token: string) {
  }
}
