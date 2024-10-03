// groupBy polyfill in case an older browser does not have native groupBy implementation

function groupBy<K extends PropertyKey, T>(arr: T[], keySelector: (item: T, index: number) => K) {
  return arr.reduce<Record<K, T[]>>((acc, current, index) => {
    const key = keySelector(current, index);
    acc[key] ??= []
    acc[key].push(current);
    return acc;
  }, {} as any);
}

if (typeof Object.groupBy === typeof undefined) {
  Object.groupBy = groupBy;
}