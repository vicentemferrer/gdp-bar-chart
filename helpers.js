export async function getData(url) {
  const data = await fetch(url)
  return await data.json()
}

export function filterData({ data, from_date, to_date }) {
  return { data, from_date, to_date }
}
