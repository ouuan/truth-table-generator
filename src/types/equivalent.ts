import type AstNode from '~/core/AstNode/base';

export default interface Equivalent {
  name: string;
  result: AstNode;
}
