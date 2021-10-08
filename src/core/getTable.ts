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
  className?: string;
}

export type { Column };

function getColumn(u: AstNode, root: AstNode, addStep: (step: Step) => void): Column {
  const { children, type } = u;

  const result: Column = {
    title: type !== 'atom' ? () => h(SimplificationButton, {
      node: u,
      root,
      addStep,
    }) : u.toString(),
    key: u.toString(),
    align: 'center',
  };

  const main = {
    title: u.operator,
    key: u.toString(),
    align: 'center',
    ...(u === root ? {
      className: 'truth-table-result',
    } : {}),
  } as const;

  if (children.length === 1) {
    result.children = [
      main,
      getColumn(children[0], root, addStep),
    ];
  } else if (children.length === 2) {
    result.children = [
      getColumn(children[0], root, addStep),
      main,
      getColumn(children[1], root, addStep),
    ];
  }

  return result;
}

export function getTable(
  root: AstNode,
  atomNodes: Map<string, AtomNode[]>,
  addStep: (step: Step) => void,
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
  const truths: boolean[] = [];

  for (let mask = 0; mask < (1 << atoms.length); mask += 1) {
    const data: Data = { key: mask };
    for (let i = 0; i < atoms.length; i += 1) {
      data[atoms[i]] = (mask >> (atoms.length - 1 - i)) & 1;
    }

    truths.push(root.dfsTruth(data));
    datas.push(data);
  }

  return {
    atoms,
    columns,
    data: datas,
    truths,
  };
}
