const url = 'data.json'
const charts = document.querySelector('.charts')
let highest
let currentDay = new Date().toLocaleDateString('en-us', { weekday: 'short' }).toLowerCase()
console.log(currentDay)

fetch(url)
	.then((res) => {
		return res.json()
	})
	.then((data) => {
		highest = data.reduce((acc, curr) => {
			return acc > curr.amount ? acc : curr.amount
		}, 0)
		data.forEach((chart) => {
			charts.appendChild(createChart(chart))
		})
		document.querySelectorAll('.fadeIn').forEach((element, arr) => {
			// setTimeout(() => {
			// 	element.classList.add('fadeIn-active')
			// }, (arr + 1) * 100)
			setTimeout(() => {
				element.style.opacity = 1
				element.style.transform = 'translateY(0)'
			}, (arr + 1) * 100 + 100)
		})
		document.querySelectorAll('.chart-bar').forEach((chartBar, arr) => {
			setTimeout(() => {
				const value = chartBar.getAttribute('data-value')
				const percent = (value / highest) * 100
				chartBar.style.height = `${percent}%`
				chartBar.style.opacity = 1
				chartBar.style.transition = `height ${(percent * 0.3) / 100}s ease-out, opacity ${(percent * 0.3) / 100}s ease-out `
			}, (arr + 1) * 100)
		})
	})
	.catch((err) => {
		console.errror(error)
	})

function createChart(chart) {
	const div = document.createElement('div')
	div.classList.add('chart')
	if (chart.day == currentDay) {
		div.classList.add('current')
	}
	div.innerHTML = `
            <div class="chart-bar" data-value="${chart.amount}" ></div>
            <div class="chart-day mini-caption medium-brown">${chart.day}</div>
        `
	return div
}
