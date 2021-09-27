import AstNode from './base';

export default class extends AstNode {
  type = 'true' as const;

  operator = '';

  constructor() {
    super();
    this.str = '1';
  }

  calc() {
    return !!this.type;
  }
}
