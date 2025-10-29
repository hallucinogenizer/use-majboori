import { useEffect, DependencyList, EffectCallback } from 'react';

/**
 * useMajboori - A wrapper around useEffect that requires you to justify your usage
 * 
 * "Majboori" (مجبوری) means "helplessness" or "compulsion" in Urdu/Hindi.
 * Use this when you have no choice but to use useEffect - and explain why!
 * 
 * @param effect - The effect function to run
 * @param deps - The dependency array
 * @param reason - A required justification for why you need to use useEffect
 * 
 * @example
 * useMajboori(
 *   () => {
 *     document.title = `Count: ${count}`;
 *   },
 *   [count],
 *   "Need to update document title because browser API can only be accessed in effects"
 * );
 */
export function useMajboori(
  effect: EffectCallback,
  deps: DependencyList | undefined,
  reason: string
): void {
  if (process.env.NODE_ENV !== 'production') {
    if (!reason || reason.trim().length === 0) {
      console.warn(
        '⚠️ useMajboori: You must provide a valid reason for using this effect!'
      );
    } else if (reason.length < 10) {
      console.warn(
        `⚠️ useMajboori: Your reason seems too short ("${reason}"). Please provide a more detailed explanation.`
      );
    } else {
      console.log(
        `📝 useMajboori: Effect registered with reason: "${reason}"`
      );
    }
  }

  useEffect(effect, deps);
}

export default useMajboori;

