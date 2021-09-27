import AstNode from './base';
import Data from '~/types/data';

export default class extends AstNode {
  type = 'or' as const;

  operator = '∨';

  constructor(left: AstNode, right: AstNode) {
    super();
    this.children.push(left, right);
  }

  calc(data: Data) {
    const r = this.children[1].dfsTruth(data);
    return this.children[0].dfsTruth(data) || r;
  }
}
