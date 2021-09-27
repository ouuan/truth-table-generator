import AstNode from './base';

export default class extends AstNode {
  type = 'atom' as const;

  operator = '';

  constructor(name: string) {
    super();
    this.str = name;
  }

  // actually unused
  calc() {
    return !!this.type;
  }
}
