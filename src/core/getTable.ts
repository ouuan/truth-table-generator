import { h, RenderFunction } from 'vue';
import { AstNode, AtomNode } from './AstNode';
import Data from '~/types/data';
import Step from '~/types/step';

import SimplificationButton from '~/components/SimplificationButton.vue';

interface Column {
  title: string | RenderFunction;
  key: string;
  align: 'center';
  children?: Column[];
}

export type { Column };

function getColumn(u: AstNode, root: AstNode, addStep: (step: Step)=> void): Column {
  const { children } = u;

  const result: Column = {
    title: children.length ? () => h(SimplificationButton, {
      node: u,
      root,
      addStep,
    }) : u.toString(),
    key: u.toString(),
    align: 'center',
  };

  if (children.length === 1) {
    result.children = [{
      title: u.operator,
      key: u.toString(),
      align: 'center',
    }, getColumn(children[0], root, addStep)];
  } else if (children.length === 2) {
    result.children = [getColumn(children[0], root, addStep), {
      title: u.operator,
      key: u.toString(),
      align: 'center',
    }, getColumn(children[1], root, addStep)];
  }

  return result;
}

export function getTable(
  root: AstNode,
  atomNodes: Map<string, AtomNode[]>,
  addStep: (step: Step)=> void,
) {
  const columns: Column[] = [];

  const atoms = Array.from(atomNodes.keys()).sort();
  atoms.forEach((atom) => {
    columns.push({
      title: atom,
      key: atom,
      align: 'center',
    });
  });

  columns.push(getColumn(root, root, addStep));

  const datas: Data[] = [];

  /* eslint-disable no-bitwise */
  for (let mask = 0; mask < (1 << atoms.length); mask += 1) {
    const data: Data = { key: mask };
    for (let i = 0; i < atoms.length; i += 1) {
      /* eslint-disable no-bitwise */
      data[atoms[i]] = (mask >> (atoms.length - 1 - i)) & 1;
    }

    root.dfsTruth(data);
    datas.push(data);
  }

  return {
    columns,
    data: datas,
  };
}
