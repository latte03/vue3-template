export function isWebURL(url: string) {
  // eslint-disable-next-line regexp/no-unused-capturing-group
  const regex = /^(((ht|f)tps?):\/{2})?([^\s!#$%&*.?@^-]([^\s!#$%&*.?@^]{1,64})?\.)+[a-z]{2,6}\/?/
  return regex.test(url)
}

export function judge(
  value: number,
  interval: Array<[number, number]>
): [number, number] | undefined {
  return interval.find(item => {
    if (value > item[0] && value <= item[1]) {
      return true
    }
    return false
  })
}
