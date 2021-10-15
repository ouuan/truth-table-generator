import { exhaustiveCheck } from 'ts-exhaustive-check';
import { NText, TreeOption } from 'naive-ui';
import { h } from 'vue';

import { AstNode } from './AstNode';
import equivalents from './equivalents';
import WangHaoTooLongError from '~/types/WangHaoTooLongError';

interface WangHaoProof extends TreeOption {
  key: string;
  label: string;
  isTrue: boolean;
  children?: WangHaoProof[];
}

export default class WangHao {
  private left = new Set<AstNode>();

  private right = new Set<AstNode>();

  private leftStr = new Set<string>();

  private rightStr = new Set<string>();

  private isTrue = false;

  private tot: { value: number };

  key: number;

  private rule = '';

  constructor(root: AstNode);

  constructor(old: WangHao);

  constructor(x: AstNode | WangHao) {
    if (x instanceof AstNode) {
      this.leftStr.add('T');
      this.rightStr.add('F');
      this.rightStr.add(x.toString());
      if (x.toString().length > 1) {
        this.right.add(x);
      }
      if (x.type === 'true') {
        this.isTrue = true;
        this.rule = 'T ⇒ T';
      }
      this.key = 1;
      this.tot = { value: 1 };
    } else {
      for (const l of x.left) this.left.add(l);
      for (const r of x.right) this.right.add(r);
      for (const l of x.leftStr) this.leftStr.add(l);
      for (const r of x.rightStr) this.rightStr.add(r);
      this.tot = x.tot;
      this.tot.value += 1;
      if (this.tot.value > 1e4) throw new WangHaoTooLongError();
      this.key = x.tot.value;
    }
  }

  toString(): string {
    const lItems = [];
    const rItems = [];

    for (const l of this.leftStr.values()) {
      if (l !== 'T') {
        lItems.push(l);
      }
    }
    if (lItems.length === 0) lItems.push('T');

    for (const r of this.rightStr.values()) {
      if (r !== 'F') {
        rItems.push(r);
      }
    }
    if (rItems.length === 0) rItems.push('F');

    return `${lItems.join(', ')} ⇒ ${rItems.join(', ')}`;
  }

  private del(node: AstNode, side: 'left' | 'right') {
    this[side].delete(node);
    this[`${side}Str`].delete(node.toString());
  }

  private add(node: AstNode, side: 'left' | 'right') {
    if (this[`${side}Str`].has(node.toString())) return;
    this[`${side}Str`].add(node.toString());
    if (node.toString().length > 1) this[side].add(node);
    if (this[side === 'left' ? 'rightStr' : 'leftStr'].has(node.toString())) {
      this.isTrue = true;
      this.rule = `${node} ⇒ ${node}`;
    }
  }

  solve(): WangHaoProof {
    const children: WangHaoProof[] = [];

    if (!this.isTrue) {
      if (this.left.size > 0) {
        const node: AstNode = this.left.values().next().value;

        const a = new WangHao(this);
        a.del(node, 'left');

        this.rule = `${node.operator} ⇒`;

        switch (node.type) {
          case 'not':
          {
            a.add(node.ch(0), 'right');
            children.push(a.solve());
            break;
          }
          case 'and':
          {
            a.add(node.ch(0), 'left');
            a.add(node.ch(1), 'left');
            children.push(a.solve());
            break;
          }
          case 'or':
          {
            const b = new WangHao(a);
            a.add(node.ch(0), 'left');
            b.add(node.ch(1), 'left');
            children.push(a.solve(), b.solve());
            break;
          }
          case 'imply':
          {
            const b = new WangHao(a);
            a.add(node.ch(1), 'left');
            b.add(node.ch(0), 'right');
            children.push(a.solve(), b.solve());
            break;
          }
          case 'eq':
          {
            const b = new WangHao(a);
            a.add(node.ch(0), 'left');
            a.add(node.ch(1), 'left');
            b.add(node.ch(0), 'right');
            b.add(node.ch(1), 'right');
            children.push(a.solve(), b.solve());
            break;
          }
          case 'nor':
          case 'xor':
          case 'nand':
          case 'impliedby':
          {
            const { result } = equivalents(node)[0];
            result.updateStr();
            a.add(result, 'left');
            children.push(a.solve());
            break;
          }
          case 'atom':
          case 'true':
          case 'false':
            throw Error(`${node.type} appears in WangHao's left!`);
          default:
            exhaustiveCheck(node.type);
        }
      } else if (this.right.size > 0) {
        const node: AstNode = this.right.values().next().value;

        const a = new WangHao(this);
        a.del(node, 'right');

        this.rule = `⇒ ${node.operator}`;

        switch (node.type) {
          case 'not':
          {
            a.add(node.ch(0), 'left');
            children.push(a.solve());
            break;
          }
          case 'and':
          {
            const b = new WangHao(a);
            a.add(node.ch(0), 'right');
            b.add(node.ch(1), 'right');
            children.push(a.solve(), b.solve());
            break;
          }
          case 'or':
          {
            a.add(node.ch(0), 'right');
            a.add(node.ch(1), 'right');
            children.push(a.solve());
            break;
          }
          case 'imply':
          {
            a.add(node.ch(0), 'left');
            a.add(node.ch(1), 'right');
            children.push(a.solve());
            break;
          }
          case 'eq':
          {
            const b = new WangHao(a);
            a.add(node.ch(0), 'left');
            a.add(node.ch(1), 'right');
            b.add(node.ch(0), 'right');
            b.add(node.ch(1), 'left');
            children.push(a.solve(), b.solve());
            break;
          }
          case 'nor':
          case 'xor':
          case 'nand':
          case 'impliedby':
          {
            const { result } = equivalents(node)[0];
            result.updateStr();
            a.add(result, 'right');
            children.push(a.solve());
            break;
          }
          case 'atom':
          case 'true':
          case 'false':
            throw Error(`${node.type} appears in WangHao's right!`);
          default:
            exhaustiveCheck(node.type);
        }
      }

      if (children.length) {
        this.isTrue = true;
        children.forEach(({ isTrue }) => {
          if (!isTrue) {
            this.isTrue = false;
          }
        });
      }
    }

    return {
      key: `${Number(this.isTrue)}-${this.key}-wh-${new Date().valueOf()}`,
      label: this.toString(),
      isTrue: this.isTrue,
      children: children.length === 0 ? undefined : children,
      isLeaf: children.length === 0,
      suffix: () => h(NText, {
        type: 'info',
        style: {
          minWidth: '4em',
          textAlign: 'right',
        },
      }, {
        default: () => (this.rule ? this.rule : undefined),
      }),
    };
  }
}
