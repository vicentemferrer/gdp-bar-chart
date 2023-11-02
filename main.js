import * as d3 from 'd3'
import { getData, filterData } from './helpers.js'
import './style.css'

const w = 900
const h = 464
const p = 45

const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json'

const { data, from_date, to_date } = filterData(await getData(url))

const svg = d3.select('svg').attr('width', w).attr('height', h)

const date = d => d[0]

const xMax = new Date(to_date)
const xMin = new Date(from_date)

xMax.setMonth(xMax.getMonth() + 3)

const xDomain = [xMin, xMax]

const gdp = d => d[1]

const gdpMax = d3.max(data, gdp)

const gdpDomain = [0, gdpMax]

const timeScale = d3.scaleUtc().domain(xDomain).range([p, w - p])
const gdpScale = d3.scaleLinear().domain(gdpDomain).range([h - p, p])
const yScale = d3.scaleLinear().domain(gdpDomain).range([p, h - p])

const xAxis = d3.axisBottom().scale(timeScale)
const yAxis = d3.axisLeft().scale(gdpScale)

svg.append('g')
  .attr('transform', `translate(0, ${h - p})`)
  .call(xAxis)
  .attr('id', 'x-axis')

svg.append('g')
  .attr('transform', `translate(${p}, 0)`)
  .call(yAxis)
  .attr('id', 'y-axis')

const timeScaled = d => timeScale(new Date(d[0]))
const heightScaled = d => (h - p) - gdpScale(d[1])
const yScaled = d => h - yScale(d[1])

svg.selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr('width', 2)
  .attr('x', timeScaled)
  .attr('y', yScaled)
  .attr('height', heightScaled)
  .attr('class', 'bar')
  .attr('data-date', date)
  .attr('data-gdp', gdp)
