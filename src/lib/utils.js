export function assert(exp, msg) {
  if (!exp) {
    throw new Error('[Assert Error] ' + (msg || ''));
  }
}
