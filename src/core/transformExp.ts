export default function transformExp(exp: string): string {
  return exp
    .replace(/∧|&&|\bAND\b/gi, '&')
    .replace(/⊼|\bNAND\b/gi, '↑')
    .replace(/⊻|⊕|!=|……|\bXOR\b/gi, '^')
    .replace(/⊽|\bNOR\b/gi, '↓')
    .replace(/∨|v|｜|\|\||\bOR\b/gi, '|')
    .replace(/⟷|↔|==|<->|<>|\bEQ\b/gi, '=')
    .replace(/→|》|->|\bIMPLIES\b/gi, '>')
    .replace(/←|《|<-|\bIMPLIEDBY\b/gi, '<')
    .replace(/¬|~|！|～|\bNOT\b/gi, '!')
    .replace(/（|\[|【|\{|｛/g, '(')
    .replace(/）|\]|】|\}|｝/g, ')')
    .replace(/\s/g, '');
}
