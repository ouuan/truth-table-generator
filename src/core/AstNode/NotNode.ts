import AstNode from './base';
import Data from '~/types/data';

export default class extends AstNode {
  type = 'not' as const;

  operator = '¬';

  constructor(internal: AstNode) {
    super();
    this.children.push(internal);
  }

  calc(data: Data) {
    return !this.children[0].dfsTruth(data);
  }
}
