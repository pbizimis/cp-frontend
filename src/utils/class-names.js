/**
 * Merge two CSS className strings together
 *
 * @export
 * @param {...string} classes
 * @return {string} 
 */
export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
