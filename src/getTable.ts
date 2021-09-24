import { AstNode, AtomNode } from './AstNode';

interface Column {
  title: string;
  key: string;
  align: 'center';
  children?: Column[];
}

export type { Column };

function getColumn(u: AstNode): Column {
  const children = u.getChildren();

  if (u.type === 'bracket') return getColumn(children[0]);

  const result: Column = {
    title: u.str,
    key: u.str,
    align: 'center',
  };

  if (children.length === 1) {
    result.children = [{
      title: u.operator,
      key: u.str,
      align: 'center',
    }, getColumn(children[0])];
  } else if (children.length === 2) {
    result.children = [getColumn(children[0]), {
      title: u.operator,
      key: u.str,
      align: 'center',
    }, getColumn(children[1])];
  }

  return result;
}

export default function getTable(root: AstNode, atomNodes: Map<string, AtomNode[]>) {
  const columns: Column[] = [];

  const atoms = Array.from(atomNodes.keys()).sort();
  atoms.forEach((atom) => {
    columns.push({
      title: atom,
      key: atom,
      align: 'center',
    });
  });

  columns.push(getColumn(root));

  const datas: any[] = [];

  /* eslint-disable no-bitwise */
  for (let mask = 0; mask < (1 << atoms.length); mask += 1) {
    for (let i = 0; i < atoms.length; i += 1) {
      /* eslint-disable no-bitwise */
      const target = Boolean((mask >> i) & 1);
      atomNodes.get(atoms[atoms.length - 1 - i])?.forEach((node) => {
        if (node.getTruth() !== target) {
          node.setTruth(target);
          node.markNeedUpdate();
        }
      });
    }

    const data: any = datas.length ? Object.create(datas[datas.length - 1]) : {};
    root.dfsTruth(data);
    data.key = mask;
    datas.push(data);
  }

  return {
    columns,
    data: datas,
  };
}
