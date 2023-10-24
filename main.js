import * as d3 from 'd3'
import { getData, filterData } from './helpers.js'
import './style.css'

const w = 900
const h = 464
const p = 30

const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json'

const svg = d3.select('svg').attr('width', w).attr('height', h)

const { data, from_date, to_date } = filterData(await getData(url))

const xScale = d3.scaleLinear().domain([new Date(from_date), new Date(to_date)]).range([p, w - p])
const hScale = d3.scaleLinear().domain([d3.min(data, d => d[1]), d3.max(data, d => d[1])]).range([h - p, p])

svg.selectAll('rect').data(data).enter().append('rect').attr('x', d => xScale(new Date(d[0])))
  .attr('y', d => hScale(d[1])).attr('width', 2).attr('height', d => h - hScale(d[1]))
