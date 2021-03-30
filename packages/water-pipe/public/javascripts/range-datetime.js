const SEPARATOR = /\s*,\s*/

window.checkRangeDatetime = checkRangeDatetime

function checkRangeDatetime(range, rangeLists) {
  let range1 = 0
  let range2 = 0
  let ranges = range.split(SEPARATOR)

  const startRange = new Date(ranges[0]).getTime()
  const endRange = new Date(ranges[1]).getTime()

  return rangeLists.some(function(item) {
    ranges = item.split(SEPARATOR)

    range1 = new Date(ranges[0]).getTime()
    range2 = new Date(ranges[1]).getTime()

    // return (range1 >= startRange && range1 <= endRange) || (range2 >= startRange && range2 <= endRange)
    return (startRange >= range1 && startRange <= range2) || (endRange >= range1 && endRange <= range2)
  })
}
