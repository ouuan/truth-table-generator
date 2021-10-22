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
});
