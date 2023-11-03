import { getData, filterData, parseDate, parseGDP } from './helpers.js'
import { chart, timeScale, gdpScale, yScale, xAxis, yAxis, max, easeLinear } from './d3-components.js'
import './style.css'

const dateFilter = d => d[0]
const gdpFilter = d => d[1]
const indexFilter = (d, i) => i

const width = 900
const height = 464
const barWidth = 800 / 275
const padding = 45

const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json'

const { data, from_date, to_date } = filterData(await getData(url))

const tooltip = chart.append('div').attr('id', 'tooltip').style('opacity', 0)
const svg = chart.append('svg').attr('width', width).attr('height', height)

svg
  .append('text')
  .attr('transform', 'rotate(-90)')
  .attr('x', -170)
  .attr('y', padding * 1.35)
  .text('Gross Domestic Product')
  .attr('class', 'info')

svg
  .append('text')
  .attr('x', width * 6 / 10)
  .attr('y', height - padding * .0625)
  .text('More Information: http://www.bea.gov/national/pdf/nipaguid.pdf')
  .attr('class', 'info')

const xMax = new Date(to_date)
const xMin = new Date(from_date)
xMax.setMonth(xMax.getMonth() + 3)

const timeDomain = [xMin, xMax]

const gdpMax = max(data, gdpFilter)
const gdpDomain = [0, gdpMax]

timeScale.domain(timeDomain).range([padding, width - padding * .25])
gdpScale.domain(gdpDomain).range([height - padding, padding])
yScale.domain(gdpDomain).range([padding, height - padding])

xAxis.scale(timeScale)
yAxis.scale(gdpScale)

const xPositionScale = d => timeScale(new Date(d[0]))
const heightBarScale = d => (height - padding) - gdpScale(d[1])
const yPositionScale = d => height - yScale(d[1])

svg.append('g')
  .attr('transform', `translate(0, ${height - padding})`)
  .call(xAxis)
  .attr('id', 'x-axis')

svg.append('g')
  .attr('transform', `translate(${padding}, 0)`)
  .call(yAxis)
  .attr('id', 'y-axis')

const dataBars = svg.selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr('width', barWidth)
  .attr('x', xPositionScale)
  .attr('y', yPositionScale)
  .attr('height', heightBarScale)
  .attr('class', 'bar')
  .attr('data-date', dateFilter)
  .attr('data-gdp', gdpFilter)
  .attr('data-index', indexFilter)

dataBars.on('mouseover', (event, [date, gdp]) => {
  const parsedDate = parseDate(date)
  const parsedGDP = parseGDP(gdp)

  const i = event.target.dataset.index

  tooltip
    .transition()
    .duration(50)
    .style('opacity', 0.9)

  tooltip
    .attr('data-date', date)
    .html(`<p>${parsedDate}<br>$${parsedGDP} Billions</p>`)
    .style('left', i * barWidth + 300 + 'px')
    .style('top', height - 50 + 'px')
    .style('transform', 'translateX(60px)')
})

dataBars.on('mouseout', () => {
  tooltip
    .transition()
    .duration(50)
    .style('opacity', 0)
})
