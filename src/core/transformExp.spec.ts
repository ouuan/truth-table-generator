import transformExp from './transformExp';

describe('transformExp', () => {
  it('should transform brackets', () => {
    const result = transformExp('(（[【{｛)）]】}｝（）【】｝｛[])({}');
    expect(result).toBe('(((((())))))()())(())(()');
  });

  it('should transform NOT', () => {
    const result = transformExp('!!¬！NoT~~~～¬nOt～～');
    expect(result).toBe('!!!!!!!!!!!!!');
  });

  it('should transform AND', () => {
    const result = transformExp('∧∧AnD&∧&&∧&&&&aND&');
    expect(result).toBe('&&&&&&&&&&&');
  });

  it('should transform NAND', () => {
    const result = transformExp('⊼↑NAND↑⊼⊼');
    expect(result).toBe('↑↑↑↑↑↑');
  });

  it('should distinguish NAND with AND', () => {
    const result = transformExp('AND nAND NAnD aND NANDAND ANDNAND');
    expect(result).toBe('&↑↑&NANDANDANDNAND');
  });

  it('should transform XOR', () => {
    const result = transformExp('⊕!=!=^⊻XoR…………!=^……⊻xOR');
    expect(result).toBe('^^^^^^^^^^^^^');
  });

  it('should transform OR', () => {
    const result = transformExp('oR∨||||｜|oROr||OR');
    expect(result).toBe('||||||oROr||');
  });

  it('should transform NOR', () => {
    const result = transformExp('↓NOr⊽↓⊽↓nor↓');
    expect(result).toBe('↓↓↓↓↓↓↓↓');
  });

  it('should distinguish OR, XOR and NOR', () => {
    const result = transformExp('or nor xor XNOR NXOR x oRn OR');
    expect(result).toBe('|↓^XNORNXORxoRn|');
  });

  it('should transform IMPLIES', () => {
    const result = transformExp('》>->→→-->implIes》IMPliES');
    expect(result).toBe('>>>>>->>>>');
  });

  it('should transform IMPLIEDBY', () => {
    const result = transformExp('《<<-←←<--implIedby《IMPlieDBY');
    expect(result).toBe('<<<<<<-<<<');
  });

  it('should transform EQ', () => {
    const result = transformExp('⟷<>=<->eq==⟷<->====↔Eq');
    expect(result).toBe('============');
  });

  it('should distinguish <> <- ->', () => {
    const result = transformExp('<< <-> >> <> --> <<--');
    expect(result).toBe('<<=>>=-><<-');
  });

  it('should have \\b', () => {
    const origin = 'NotAndNandXorOrNorImpliesImpliedbyEq';
    const result = transformExp(origin);
    expect(result).toBe(origin);
  });

  it('should remove spaces', () => {
    const result = transformExp(' \n\t\rAND\r\t\n\v   ');
    expect(result).toBe('&');
  });

  it('should keep capital letters', () => {
    const result = transformExp('Q W E R T Y U I O P A S D F G H J K L Z X C V B N M');
    expect(result).toBe('QWERTYUIOPASDFGHJKLZXCVBNM');
  });

  it('should transform LaTeX', () => {
    const result = transformExp('\\uparrow\\downarrow\\land\\lor\\xor\\nand\\neg\\lor\\leftrightarrow\\lnot\\vee\\wedge\\gets\\to\\land\\nand\\nor\\rightarrow\\leftarrow\\land\\lor\\xor\\nand\\neg\\lor\\leftrightarrow\\gets\\to\\land\\nand\\nor\\rightarrow\\leftarrow');
    expect(result).toBe('↑↓&|^↑!|=!|&<>&↑↓><&|^↑!|=<>&↑↓><');
  });

  it('should have \\b for LaTeX', () => {
    const origin = '\\uparrowx\\downarrowx\\landx\\lorx\\xorx\\nandx\\negx\\lorx\\leftrightarrowx\\lnotx\\veex\\wedgex\\getsx\\tox\\landx\\nandd\\norr\\rightarroww\\leftarroww';
    const result = transformExp(origin);
    expect(result).toBe(origin);
  });

  it('should require "\\" for LaTeX', () => {
    const result = transformExp('uparrow downarrow land lor xor nand neg lor leftrightarrow lnot vee wedge gets to land nand nor rightarrow leftarrow');
    expect(result).toBe('uparrowdownarrowlandlor^↑neglorleftrightarrowlnotveewedgegetstoland↑↓rightarrowleftarrow');
  });

  it('should require lowercase for LaTeX', () => {
    const result = transformExp('\\Uparrow\\Downarrow\\Land\\Lor\\Xor\\Nand\\Neg\\Lor\\Leftrightarrow\\Lnot\\Vee\\Wedge\\Gets\\To\\Land\\Nand\\Nor\\Rightarrow\\Leftarrow');
    expect(result).toBe('\\Uparrow\\Downarrow\\Land\\Lor\\^\\↑\\Neg\\Lor\\Leftrightarrow\\Lnot\\Vee\\Wedge\\Gets\\To\\Land\\↑\\↓\\Rightarrow\\Leftarrow');
  });
});
