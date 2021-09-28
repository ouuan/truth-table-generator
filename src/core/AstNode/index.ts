import { exhaustiveCheck } from 'ts-exhaustive-check';
import AstNode from './base';
import AtomNode from './AtomNode';
import NotNode from './NotNode';
import AndNode from './AndNode';
import OrNode from './OrNode';
import ImplyNode from './ImplyNode';
import EqNode from './EqNode';
import TrueNode from './TrueNode';
import FalseNode from './FalseNode';
import Equivalent from '~/types/equivalent';

export {
  AstNode,
  AtomNode,
  NotNode,
  AndNode,
  OrNode,
  ImplyNode,
  EqNode,
  TrueNode,
  FalseNode,
};

// Ideally this should be implemented in derived classes,
// but that could lead to cyclic imports, which is tricky to resolve
export function equivalents(node: AstNode): Equivalent[] {
  const result: Equivalent[] = [];

  switch (node.type) {
    case 'and':
      if (node.ch(0).type === node.type) {
        result.push({
          name: '结合律',
          result: new AndNode(node.ch(0).ch(0), new AndNode(node.ch(0).ch(1), node.ch(1))),
        });
      }
      if (node.ch(1).type === node.type) {
        result.push({
          name: '结合律',
          result: new AndNode(new AndNode(node.ch(0), node.ch(1).ch(0)), node.ch(1).ch(1)),
        });
      }
      result.push({
        name: '交换律',
        result: new AndNode(node.ch(1), node.ch(0)),
      });
      if (node.ch(0).type === 'or' && node.ch(1).type === 'or' && node.ch(0).ch(0).toString() === node.ch(1).ch(0).toString()) {
        result.push({
          name: '分配律',
          result: new OrNode(node.ch(0).ch(0), new AndNode(node.ch(0).ch(1), node.ch(1).ch(1))),
        });
      }
      if (node.ch(1).type === 'or') {
        result.push({
          name: '分配律',
          result: new OrNode(
            new AndNode(node.ch(0), node.ch(1).ch(0)),
            new AndNode(node.ch(0), node.ch(1).ch(1)),
          ),
        });
      }
      if (node.ch(0).toString() === node.ch(1).toString()) {
        result.push({
          name: '等幂律',
          result: node.ch(0),
        });
      }
      if (node.ch(1).type === 'or' && node.ch(0).toString() === node.ch(1).ch(0).toString()) {
        result.push({
          name: '吸收律',
          result: node.ch(0),
        });
      }
      if (node.ch(0).type === 'not' && node.ch(1).type === 'not') {
        result.push({
          name: '摩根律',
          result: new NotNode(new OrNode(node.ch(0).ch(0), node.ch(1).ch(0))),
        });
      }
      if (node.ch(1).type === 'not') {
        result.push({
          name: '摩根律',
          result: new NotNode(new ImplyNode(node.ch(0), node.ch(1).ch(0))),
        });
      }
      if (node.ch(1).type === 'true') {
        result.push({
          name: '同一律',
          result: node.ch(0),
        });
      }
      if (node.ch(1).type === 'false') {
        result.push({
          name: '零律',
          result: node.ch(1),
        });
      }
      if (node.ch(1).type === 'not' && node.ch(0).toString() === node.ch(1).ch(0).toString()) {
        result.push({
          name: '补余律',
          result: new FalseNode(),
        });
      }
      if (node.ch(0).type === 'imply' && node.ch(1).type === 'imply' && node.ch(0).ch(1).toString() === node.ch(1).ch(1).toString()) {
        result.push({
          name: '前提析取合并',
          result: new ImplyNode(new OrNode(node.ch(0).ch(0), node.ch(1).ch(0)), node.ch(0).ch(1)),
        });
      }
      if (node.ch(0).type === 'or' && node.ch(1).type === 'or'
        && node.ch(0).ch(1).type === 'not' && node.ch(1).ch(0).type === 'not'
        && node.ch(0).ch(0).toString() === node.ch(1).ch(0).ch(0).toString()
        && node.ch(0).ch(1).ch(0).toString() === node.ch(1).ch(1).toString()) {
        result.push({
          name: '从取假来描述双条件',
          result: new EqNode(node.ch(0).ch(0), node.ch(1).ch(1)),
        });
      }
      if (node.ch(0).type === 'imply' && node.ch(1).type === 'imply'
        && node.ch(0).ch(0).toString() === node.ch(1).ch(1).toString()
        && node.ch(0).ch(1).toString() === node.ch(1).ch(0).toString()) {
        result.push({
          name: '等价等值式',
          result: new EqNode(node.ch(0).ch(0), node.ch(0).ch(1)),
        });
      }
      break;
    case 'atom':
      break;
    case 'eq':
      if (node.ch(0).type === node.type) {
        result.push({
          name: '结合律',
          result: new EqNode(node.ch(0).ch(0), new EqNode(node.ch(0).ch(1), node.ch(1))),
        });
      }
      if (node.ch(1).type === node.type) {
        result.push({
          name: '结合律',
          result: new EqNode(new EqNode(node.ch(0), node.ch(1).ch(0)), node.ch(1).ch(1)),
        });
      }
      result.push({
        name: '交换律',
        result: new EqNode(node.ch(1), node.ch(0)),
      });
      if (node.ch(0).toString() === node.ch(1).toString()) {
        result.push({
          name: '等幂律',
          result: new TrueNode(),
        });
      }
      if (node.ch(0).type === 'true') {
        result.push({
          name: '同一律',
          result: node.ch(1),
        });
      }
      if (node.ch(0).type === 'false') {
        result.push({
          name: '同一律',
          result: new NotNode(node.ch(1)),
        });
      }
      if (node.ch(1).type === 'not' && node.ch(0).toString() === node.ch(1).ch(0).toString()) {
        result.push({
          name: '补余律',
          result: new FalseNode(),
        });
      }
      result.push({
        name: '从取真来描述双条件',
        result: new OrNode(
          new AndNode(node.ch(0), node.ch(1)),
          new AndNode(new NotNode(node.ch(0)), new NotNode(node.ch(1))),
        ),
      }, {
        name: '从取假来描述双条件',
        result: new AndNode(
          new OrNode(node.ch(0), new NotNode(node.ch(1))),
          new OrNode(new NotNode(node.ch(0)), node.ch(1)),
        ),
      }, {
        name: '等价等值式',
        result: new AndNode(
          new ImplyNode(node.ch(0), node.ch(1)),
          new ImplyNode(node.ch(1), node.ch(0)),
        ),
      });
      break;
    case 'false':
      break;
    case 'imply':
      if (node.ch(1).type === 'imply') {
        result.push({
          name: '分配律',
          result: new ImplyNode(
            new ImplyNode(node.ch(0), node.ch(1).ch(0)),
            new ImplyNode(node.ch(0), node.ch(1).ch(1)),
          ),
        });
      }
      if (node.ch(0).toString() === node.ch(1).toString()) {
        result.push({
          name: '等幂律',
          result: new TrueNode(),
        });
      }
      if (node.ch(0).type === 'true') {
        result.push({
          name: '同一律',
          result: node.ch(1),
        });
      }
      if (node.ch(1).type === 'false') {
        result.push({
          name: '同一律',
          result: new NotNode(node.ch(0)),
        });
      }
      if (node.ch(1).type === 'true') {
        result.push({
          name: '零律',
          result: node.ch(1),
        });
      }
      if (node.ch(0).type === 'false') {
        result.push({
          name: '零律',
          result: new TrueNode(),
        });
      }
      if (node.ch(1).type === 'not' && node.ch(0).toString() === node.ch(1).ch(0).toString()) {
        result.push({
          name: '补余律',
          result: node.ch(1),
        });
      }
      if (node.ch(0).type === 'not' && node.ch(1).toString() === node.ch(0).ch(0).toString()) {
        result.push({
          name: '补余律',
          result: node.ch(1),
        });
      }
      result.push({
        name: '蕴含等值式',
        result: new OrNode(new NotNode(node.ch(0)), node.ch(1)),
      }, {
        name: '假言易位',
        result: new ImplyNode(new NotNode(node.ch(1)), new NotNode(node.ch(0))),
      });
      if (node.ch(0).type === 'not' && node.ch(1).type === 'not') {
        result.push({
          name: '假言易位',
          result: new ImplyNode(node.ch(1).ch(0), node.ch(0).ch(0)),
        });
      }
      if (node.ch(1).type === 'imply') {
        result.push({
          name: '前提合取合并',
          result: new ImplyNode(new AndNode(node.ch(0), node.ch(1).ch(0)), node.ch(1).ch(1)),
        }, {
          name: '前提交换',
          result: new ImplyNode(node.ch(1).ch(0), new ImplyNode(node.ch(0), node.ch(1).ch(1))),
        });
      }
      if (node.ch(0).type === 'and') {
        result.push({
          name: '前提合取合并',
          result: new ImplyNode(node.ch(0).ch(0), new ImplyNode(node.ch(0).ch(1), node.ch(1))),
        });
      }
      if (node.ch(0).type === 'or') {
        result.push({
          name: '前提析取合并',
          result: new AndNode(
            new ImplyNode(node.ch(0).ch(0), node.ch(1)),
            new ImplyNode(node.ch(0).ch(1), node.ch(1)),
          ),
        });
      }
      break;
    case 'not':
      if (node.ch(0).type === 'not') {
        result.push({
          name: '双重否定律',
          result: node.ch(0).ch(0),
        });
      }
      if (node.ch(0).type === 'or') {
        result.push({
          name: '摩根律',
          result: new AndNode(new NotNode(node.ch(0).ch(0)), new NotNode(node.ch(0).ch(1))),
        });
      }
      if (node.ch(0).type === 'and') {
        result.push({
          name: '摩根律',
          result: new OrNode(new NotNode(node.ch(0).ch(0)), new NotNode(node.ch(0).ch(1))),
        });
      }
      if (node.ch(0).type === 'imply') {
        result.push({
          name: '摩根律',
          result: new AndNode(node.ch(0).ch(0), new NotNode(node.ch(0).ch(1))),
        });
      }
      if (node.ch(0).type === 'eq') {
        result.push({
          name: '摩根律',
          result: new OrNode(
            new AndNode(new NotNode(node.ch(0).ch(0)), node.ch(0).ch(1)),
            new AndNode(node.ch(0).ch(0), new NotNode(node.ch(0).ch(1))),
          ),
        });
      }
      if (node.ch(0).type === 'true') {
        result.push({
          name: '¬T = F',
          result: new FalseNode(),
        });
      }
      if (node.ch(0).type === 'false') {
        result.push({
          name: '¬F = T',
          result: new TrueNode(),
        });
      }
      break;
    case 'or':
      if (node.ch(0).type === node.type) {
        result.push({
          name: '结合律',
          result: new OrNode(node.ch(0).ch(0), new OrNode(node.ch(0).ch(1), node.ch(1))),
        });
      }
      if (node.ch(1).type === node.type) {
        result.push({
          name: '结合律',
          result: new OrNode(new OrNode(node.ch(0), node.ch(1).ch(0)), node.ch(1).ch(1)),
        });
      }
      result.push({
        name: '交换律',
        result: new OrNode(node.ch(1), node.ch(0)),
      });
      if (node.ch(1).type === 'and') {
        result.push({
          name: '分配律',
          result: new AndNode(
            new OrNode(node.ch(0), node.ch(1).ch(0)),
            new OrNode(node.ch(0), node.ch(1).ch(1)),
          ),
        });
      }
      if (node.ch(0).type === 'and' && node.ch(1).type === 'and' && node.ch(0).ch(0).toString() === node.ch(1).ch(0).toString()) {
        result.push({
          name: '分配律',
          result: new AndNode(node.ch(0).ch(0), new OrNode(node.ch(0).ch(1), node.ch(1).ch(1))),
        });
      }
      if (node.ch(0).toString() === node.ch(1).toString()) {
        result.push({
          name: '等幂律',
          result: node.ch(0),
        });
      }
      if (node.ch(1).type === 'and' && node.ch(0).toString() === node.ch(1).ch(0).toString()) {
        result.push({
          name: '吸收律',
          result: node.ch(0),
        });
      }
      if (node.ch(0).type === 'not' && node.ch(1).type === 'not') {
        result.push({
          name: '摩根律',
          result: new NotNode(new AndNode(node.ch(0).ch(0), node.ch(1).ch(0))),
        });
      }
      if (node.ch(0).type === 'and' && node.ch(1).type === 'and'
        && node.ch(0).ch(0).type === 'not' && node.ch(1).ch(1).type === 'not'
        && node.ch(0).ch(0).ch(0).toString() === node.ch(1).ch(0).toString()
        && node.ch(0).ch(1).toString() === node.ch(1).ch(1).ch(0).toString()) {
        result.push({
          name: '摩根律',
          result: new NotNode(new EqNode(node.ch(1).ch(0), node.ch(0).ch(1))),
        });
      }
      if (node.ch(1).type === 'false') {
        result.push({
          name: '同一律',
          result: node.ch(0),
        });
      }
      if (node.ch(1).type === 'true') {
        result.push({
          name: '零律',
          result: node.ch(1),
        });
      }
      if (node.ch(1).type === 'not' && node.ch(0).toString() === node.ch(1).ch(0).toString()) {
        result.push({
          name: '补余律',
          result: new TrueNode(),
        });
      }
      if (node.ch(0).type === 'not') {
        result.push({
          name: '蕴涵等值式',
          result: new ImplyNode(node.ch(0).ch(0), node.ch(1)),
        });
      }
      if (node.ch(0).type === 'and' && node.ch(1).type === 'and'
        && node.ch(1).ch(0).type === 'not' && node.ch(1).ch(1).type === 'not'
        && node.ch(0).ch(0).toString() === node.ch(1).ch(0).ch(0).toString()
        && node.ch(0).ch(1).toString() === node.ch(1).ch(1).ch(0).toString()) {
        result.push({
          name: '从取真来描述双条件',
          result: new EqNode(node.ch(0).ch(0), node.ch(0).ch(1)),
        });
      }
      break;
    case 'true':
      break;
    default:
      exhaustiveCheck(node.type);
  }

  return result;
}
