import AstNode from './base';
import Data from '~/types/data';

export default class extends AstNode {
  type = 'eq' as const;

  operator = '↔';

  constructor(left: AstNode, right: AstNode) {
    super();
    this.children.push(left, right);
  }

  calc(data: Data) {
    return this.children[0].dfsTruth(data) === this.children[1].dfsTruth(data);
  }
}
