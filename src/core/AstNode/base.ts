import Data from '~/types/data';

import precedence from './precedence';

abstract class AstNode {
  abstract type: 'atom' | 'not' | 'and' | 'nand' | 'xor' | 'or' | 'nor' | 'imply' | 'impliedby' | 'eq' | 'true' | 'false';

  abstract operator: string;

  children: AstNode[] = [];

  ch(index: number) {
    return this.children[index];
  }

  static quote(u: AstNode, v: AstNode): string {
    if (precedence[u.type] < precedence[v.type] + 1) {
      return `(${v})`;
    }
    return v.toString();
  }

  protected str = '';

  updateStr() {
    this.children.forEach((v) => v.updateStr());
    if (this.children.length === 1) {
      this.str = `${this.operator}${AstNode.quote(this, this.children[0])}`;
    } else if (this.children.length === 2) {
      this.str = `${AstNode.quote(this, this.children[0])} ${this.operator} ${AstNode.quote(this, this.children[1])}`;
    }
  }

  toString(): string {
    return this.str;
  }

  abstract calc(data: Data): boolean;

  dfsTruth(data: Data): boolean {
    if (data[this.str] === undefined) {
      /* eslint-disable no-param-reassign */
      data[this.str] = this.calc(data) ? 1 : 0;
    }
    return !!data[this.str];
  }
}

export default AstNode;
