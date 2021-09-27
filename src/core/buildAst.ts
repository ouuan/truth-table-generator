import { exhaustiveCheck } from 'ts-exhaustive-check';
import {
  AstNode,
  AtomNode,
  NotNode,
  AndNode,
  OrNode,
  ImplyNode,
  EqNode,
  TrueNode,
  FalseNode,
} from './AstNode';

const precedence = {
  '=': 5,
  '>': 4,
  '|': 3,
  '&': 2,
} as const;

export default function buildAst(expression: string): {
  root: AstNode,
  atomNodes: Map<string, AtomNode[]>
} | null {
  try {
    const exp = expression.replace(/\s/g, '')
      .replace(/∧/g, '&')
      .replace(/∨|v/g, '|')
      .replace(/⟷/g, '=')
      .replace(/→/g, '>')
      .replace(/¬|~/g, '!');

    if (/[^A-Z()!&|>=]/.test(exp)) return null;

    const stacks: (AstNode | '&' | '|' | '>' | '=' | '!')[][] = [[]];

    function current() {
      return stacks[stacks.length - 1];
    }

    function isBinaryOperator(x: unknown): x is '&' | '|' | '>' | '=' {
      return typeof x === 'string' && /^[&|>=]$/.test(x);
    }

    function push(x: (typeof stacks)[number][number]) {
      if (current().length === 0) {
        current().push(x);
        return;
      }
      const last = current()[current().length - 1];
      function error() {
        return `Invalid expression: "${x}" after "${last}"`;
      }
      if (last === '!') {
        if (isBinaryOperator(x)) throw error();
        if (x === '!') current().push('!');
        else {
          current().pop();
          push(new NotNode(x));
        }
      } else if (isBinaryOperator(last)) {
        if (isBinaryOperator(x)) throw error();
        current().push(x);
      } else if (isBinaryOperator(x)) current().push(x);
      else throw error();
    }

    function reduce() {
      const error = new Error('Reduce error');

      const right = current().pop();
      if (typeof right !== 'object') throw error;

      const operator = current().pop();
      if (typeof operator !== 'string') throw error;

      const left = current().pop();
      if (typeof left !== 'object') throw error;

      switch (operator) {
        case '&':
          push(new AndNode(left, right));
          break;
        case '|':
          push(new OrNode(left, right));
          break;
        case '>':
          push(new ImplyNode(left, right));
          break;
        case '=':
          push(new EqNode(left, right));
          break;
        case '!':
          throw error;
        default:
          exhaustiveCheck(operator);
      }
    }

    const atomNodes: Map<string, AtomNode[]> = new Map();

    for (let pos = 0; pos < exp.length; pos += 1) {
      const c = exp[pos];
      switch (c) {
        case '(':
          stacks.push([]);
          break;
        case ')': {
          while (current().length > 1) reduce();
          const res = current()[0];
          if (typeof res !== 'object') throw Error('End bracket error');
          stacks.pop();
          push(res);
          break;
        }
        case '&':
        case '|':
        case '>':
        case '=':
        {
          while (current().length > 1) {
            const operator = current()[current().length - 2];
            if (typeof operator !== 'string' || operator === '!') throw Error('Invalid stack');
            if (precedence[operator] < precedence[c] || (operator === c && c !== '>')) reduce();
            else break;
          }
          push(c);
          break;
        }
        case '!':
          push('!');
          break;
        case 'T':
          push(new TrueNode());
          break;
        case 'F':
          push(new FalseNode());
          break;
        default: {
          const node = new AtomNode(c);
          let nodes = atomNodes.get(c);
          if (!nodes) {
            nodes = [];
            atomNodes.set(c, nodes);
          }
          nodes.push(node);
          push(node);
          break;
        }
      }
    }

    if (stacks.length !== 1) throw Error('Bracket error');

    while (current().length > 1) reduce();

    const root = current()[0];
    if (typeof root === 'string') throw Error('Invalid root');

    root.updateStr();

    return {
      root,
      atomNodes,
    };
  } catch (error) {
    return null;
  }
}
