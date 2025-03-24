describe('resident api', () => {
  it('正符串正则表达式测试', () => {
    const test = '/resident/getByIdNumber/13022321242312';
    const reg = new RegExp('/resident/getByIdNumber/(\\S+)');
    expect(reg.test(test)).toBeTrue();
    expect(reg.exec(test).length).toBe(2);
    expect(reg.exec(test)[1]).toBe('13022321242312');
  });
});
