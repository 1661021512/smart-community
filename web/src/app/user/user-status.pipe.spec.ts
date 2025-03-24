import { UserStatusPipe } from "./user-status.pipe";


describe('StatusPipe', () => {
  it('create an instance', () => {
    const pipe = new UserStatusPipe();
    expect(pipe).toBeTruthy();
    // 这里的单元测试才是最关键的，开发时首先有的应该这两行代码
    expect(pipe.transform(0)).toEqual('冻结');
    expect(pipe.transform(1)).toEqual('正常');
  });
});
