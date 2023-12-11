export function isWebURL(url: string) {
  const regex = new RegExp(
    /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/
  )
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
