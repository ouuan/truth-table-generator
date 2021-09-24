abstract class AstNode {
  abstract type: 'atom' | 'bracket' | 'not' | 'and' | 'or' | 'imply' | 'eq';

  abstract operator: string;

  protected truth = false;

  private needUpdate = false;

  protected children: AstNode[] = [];

  getChildren() {
    return this.children;
  }

  abstract str: string;

  toString() {
    return this.str;
  }

  parent? : AstNode;

  getTruth() {
    return this.truth;
  }

  markNeedUpdate() {
    if (this.needUpdate) return;
    this.needUpdate = true;
    if (this.parent) this.parent.markNeedUpdate();
  }

  abstract calc(data: any): boolean;

  dfsTruth(data: any): boolean {
    if (data[this.str] !== undefined && !this.needUpdate) return this.truth;
    this.needUpdate = false;
    if (this.type !== 'atom') this.truth = this.calc(data);
    /* eslint-disable no-param-reassign */
    data[this.str] = Number(this.truth);
    return this.truth;
  }
}

export default AstNode;
