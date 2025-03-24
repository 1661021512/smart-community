/**
 * 带有描述信息的枚举类型
 */
export interface StatusEnum<T> {
  /**显示时的样式*/
  clazz?: string;
  /**对值的描述*/
  description: string;
  /**值*/
  value: T;
}
