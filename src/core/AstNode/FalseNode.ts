import AstNode from './base';

export default class extends AstNode {
  type = 'false' as const;

  operator = '';

  constructor() {
    super();
    this.str = '0';
  }

  calc() {
    return !this.type;
  }
}
