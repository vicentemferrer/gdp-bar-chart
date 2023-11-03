async function getData(url) {
  const data = await fetch(url)
  return await data.json()
}

function filterData({ data, from_date, to_date }) {
  return { data, from_date, to_date }
}

function parseDate(date) {
  const DATE = new Date(date)
  const year = DATE.getUTCFullYear()
  const month = DATE.getUTCMonth()

  let quarter = 'Q'

  switch (month) {
    case 0:
      quarter += '1'
      break
    case 3:
      quarter += '2'
      break
    case 6:
      quarter += '3'
      break
    case 9:
      quarter += '4'
      break
  }

  return `${year} ${quarter}`
}

function parseGDP(gdp) {
  const REGEXP = /(\d)(?=(\d{3})+\.)/g
  return gdp.toFixed(1).toString().replace(REGEXP, '$1,')
}

export { getData, filterData, parseDate, parseGDP }