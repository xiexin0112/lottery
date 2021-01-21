interface Search {
  title: string;
  goodsType: number;
  list: any[];
  loaded: boolean;
}

export const search: Array<Search> = [
  {
    title: 'Clothing',
    goodsType: 1,
    list: [],
    loaded: false
  },
  {
    title: 'Shoes',
    goodsType: 1,
    list: [],
    loaded: false
  },
  {
    title: 'Bags',
    goodsType: 1,
    list: [],
    loaded: false
  }
]
