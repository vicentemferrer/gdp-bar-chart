import * as d3 from 'd3'

const { max, select, scaleLinear, scaleUtc, axisBottom, axisLeft, easeLinear } = d3

const chart = select('#chart')

const timeScale = scaleUtc()
const gdpScale = scaleLinear()
const yScale = scaleLinear()

const xAxis = axisBottom()
const yAxis = axisLeft()

export { chart, timeScale, gdpScale, yScale, xAxis, yAxis, max, easeLinear }