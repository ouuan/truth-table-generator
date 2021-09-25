import AstNode from './base';

export default class extends AstNode {
  type = 'atom' as const;

  operator = '';

  constructor(public str: string) {
    super();
  }

  setTruth(truth: boolean) {
    this.truth = truth;
  }

  // actually unused
  calc() {
    return !!this.type;
  }
}
