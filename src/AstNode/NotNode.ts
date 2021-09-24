import AstNode from './base';

export default class extends AstNode {
  type = 'not' as const;

  operator = '¬';

  str: string;

  constructor(internal: AstNode) {
    super();
    this.children.push(internal);
    this.children[0].parent = this;
    this.str = `¬${internal}`;
  }

  calc(data: any) {
    return !this.children[0].dfsTruth(data);
  }
}
