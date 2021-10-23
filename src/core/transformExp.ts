export default function transformExp(exp: string): string {
  return exp
    .replace(/\\(land|wedge)\b/g, '&')
    .replace(/∧|&&|\bAND\b/gi, '&')
    .replace(/\\(nand|uparrow)\b/g, '↑')
    .replace(/⊼|\bNAND\b/gi, '↑')
    .replace(/\\xor\b/g, '^')
    .replace(/⊻|⊕|!=|……|\bXOR\b/gi, '^')
    .replace(/\\(nor|downarrow)\b/g, '↓')
    .replace(/⊽|\bNOR\b/gi, '↓')
    .replace(/\\(lor|vee)\b/g, '|')
    .replace(/∨|｜|\|\||\bOR\b/gi, '|')
    .replace(/\\leftrightarrow\b/g, '=')
    .replace(/⟷|↔|==|<->|<>|\bEQ\b/gi, '=')
    .replace(/\\(to|rightarrow)\b/g, '>')
    .replace(/→|》|->|\bIMPLIES\b/gi, '>')
    .replace(/\\(gets|leftarrow)\b/g, '<')
    .replace(/←|《|<-|\bIMPLIEDBY\b/gi, '<')
    .replace(/\\(neg|lnot)\b/g, '!')
    .replace(/¬|~|！|～|\bNOT\b/gi, '!')
    .replace(/（|\[|【|\{|｛/g, '(')
    .replace(/）|\]|】|\}|｝/g, ')')
    .replace(/\s/g, '');
}
