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
    const result = transformExp('NotAndNandXorOrNorImpliesImpliedbyEq');
    expect(result).toBe(result);
  });

  it('should remove spaces', () => {
    const result = transformExp(' \n\t\rAND\r\t\n\v   ');
    expect(result).toBe('&');
  });

  it('should keep capital letters', () => {
    const result = transformExp('Q W E R T Y U I O P A S D F G H J K L Z X C V B N M');
    expect(result).toBe('QWERTYUIOPASDFGHJKLZXCVBNM');
  });
});
