export class User {
  id: number;
  openid: string;
  
  constructor(data = {} as { id: number, openid: string }) {
    this.id = data.id;
    this.openid = data.openid;
  }
}
