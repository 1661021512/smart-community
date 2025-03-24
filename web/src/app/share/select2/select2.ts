/**
 * SELECT2
 */
export class Select2<T, D> {
  /**值*/
  id: T;
  /**选中后输入到select框中的文字*/
  label: string;
  /**选中前显示在下拉列表中的*/
  option: string;
  searchFn: (searchKey: string) => boolean;
  value?: D;

  constructor(data = {} as { label: string, option: string, id: T, value?: D, searchFn?: (searchKey: string) => boolean; }) {
    this.label = data.label;
    this.option = data.option;
    this.id = data.id;
    this.value = data.value;
    if (typeof data.searchFn === 'function') {
      this.searchFn = data.searchFn;
    } else {
      this.searchFn = (searchKey: string) => {
        return this.option.includes(searchKey);
      }
    }
  }
}

export type SELECT2_MODEL = 'id' | 'object';
