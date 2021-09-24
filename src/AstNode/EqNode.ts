import AstNode from './base';

export default class extends AstNode {
  type = 'eq' as const;

  operator = '⟷';

  str : string;

  constructor(left: AstNode, right: AstNode) {
    super();
    this.children.push(left, right);
    this.children[0].parent = this;
    this.children[1].parent = this;
    this.str = `${left} ⟷ ${right}`;
  }

  calc(data: any) {
    return this.children[0].dfsTruth(data) === this.children[1].dfsTruth(data);
  }
}
