interface Ball {
  val: string;
  text?: string;
  color: string;
  big?: boolean;
  selected: boolean;
  dot?: string;
}
interface Random {
  val: number;
  selected: boolean;
}

interface Record {
  title: string;
  finished: boolean;
  loading: boolean;
  list: [];
  params: {};
  loaded: boolean;
}

export const records: Array<Record> = [
  {
    title: 'All periods',
    loading: false,
    finished: false,
    list: [],
    loaded: false,
    params: {
      pageNum: 1,
      pageSize: 20
    }
  },
  {
    title: 'My joined',
    loading: false,
    finished: false,
    list: [],
    loaded: false,
    params: {
      pageNum: 1,
      pageSize: 20
    }
  },
  {
    title: 'My won',
    loading: false,
    finished: false,
    list: [],
    loaded: false,
    params: {
      pageNum: 1,
      pageSize: 20
    }
  }
]

export const randoms: Array<Random> = [
  {
    val: 5,
    selected: false
  },
  {
    val: 10,
    selected: false
  },
  {
    val: 20,
    selected: false
  },
  {
    val: 50,
    selected: false
  },
  {
    val: 100,
    selected: false
  },
  {
    val: 1000,
    selected: false
  }
]

export const balls: Array<Ball> = [
  {
    text: 'Join Green',
    val: 'G',
    color: 'green',
    big: true,
    selected: false
  },
  {
    text: 'Join Violet',
    val: 'V',
    color: 'violet',
    big: true,
    selected: false
  },
  {
    text: 'Join Red',
    val: 'R',
    color: 'red',
    big: true,
    selected: false
  },
  {
    val: '0',
    color: 'violet',
    dot: 'dot-red',
    selected: false
  },
  {
    val: '1',
    color: 'green',
    selected: false
  },
  {
    val: '2',
    color: 'red',
    selected: false
  },
  {
    val: '3',
    color: 'green',
    selected: false
  },
  {
    val: '4',
    color: 'red',
    selected: false
  },
  {
    val: '5',
    color: 'violet',
    dot: 'dot-green',
    selected: false
  },
  {
    val: '6',
    color: 'red',
    selected: false
  },
  {
    val: '7',
    color: 'green',
    selected: false
  },
  {
    val: '8',
    color: 'red',
    selected: false
  },
  {
    val: '9',
    color: 'green',
    selected: false
  }
]
