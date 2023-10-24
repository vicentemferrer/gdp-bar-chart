export async function getData(url) {
  return await fetch(url).then(res => res.json())
}

export function filterData({ data, from_date, to_date }) {
  return { data, from_date, to_date }
}
