document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
	// EVENT LISTENER FOR CALC
	document.getElementById('submitBtn').addEventListener('click', getResults);
	let dimension = document.querySelectorAll('.dimension');
	let dimArr = Array.from(dimension);
	let covId = document.getElementById('covId');
	let coverage = document.getElementById('coverage');

	// let units = document.querySelector('input[name="xFactor"]:checked').value;
	document.getElementById('imperial').addEventListener('click', function(e) {
		covId.innerHTML = `ft<sup>2</sup>/gallon`;
		covId.style.background = '#CED4DA';
		coverage.style.background = '#CED4DA';
		dimArr.forEach(function(dim) {
			dim.innerText = 'ft';
		});
	});

	document.getElementById('metric').addEventListener('click', function(e) {
		covId.innerHTML = `m<sup>2</sup>/litre`;
		covId.style.background = '#E9ECEF';
		covId.style.color = '#495057';
		coverage.style.background = '#E9ECEF';
		coverage.style.color = '#495057';
		dimArr.forEach(function(dim) {
			dim.innerText = 'm';
		});
	});

	// document.querySelector('input[name="coats"]:checked').value
	// FUNCTIONS

	// 1. get results
	function getResults() {
		// let units = document.querySelector('input[name="xFactor"]:checked').value;
		const resultFooter = document.getElementById('footer');
		const height = document.querySelectorAll('.height').value;
		const pCover = document.getElementById('pCover').value;

		if (height !== '' && pCover !== '') {
			let h1 = document.getElementById('height1'),
				h2 = document.getElementById('height2'),
				h3 = document.getElementById('height3'),
				h4 = document.getElementById('height4'),
				h5 = document.getElementById('height5'),
				w1 = document.getElementById('width1'),
				w2 = document.getElementById('width2'),
				w3 = document.getElementById('width3'),
				w4 = document.getElementById('width4'),
				w5 = document.getElementById('width5');

			let winh1 = document.getElementById('winHeight1'),
				winh2 = document.getElementById('winHeight2'),
				winh3 = document.getElementById('winHeight3'),
				winh4 = document.getElementById('winHeight4'),
				winh5 = document.getElementById('winHeight5'),
				winw1 = document.getElementById('winWidth1'),
				winw2 = document.getElementById('winWidth2'),
				winw3 = document.getElementById('winWidth3'),
				winw4 = document.getElementById('winWidth4'),
				winw5 = document.getElementById('winWidth5');

			let wall1 = h1.value * w1.value,
				wall2 = h2.value * w2.value,
				wall3 = h3.value * w3.value,
				wall4 = h4.value * w4.value,
				wall5 = h5.value * w5.value;

			let win1 = winh1.value * winw1.value,
				win2 = winh2.value * winw2.value,
				win3 = winh3.value * winw3.value,
				win4 = winh4.value * winw4.value,
				win5 = winh5.value * winw5.value;

			let wallTotal = wall1 + wall2 + wall3 + wall4 + wall5;
			let winTotal = win1 + win2 + win3 + win4 + win5;
			// TOTAL
			let total = wallTotal - winTotal;

			let pCoverInt = parseInt(pCover);
			// let pCoats = parseInt(document.getElementById('pCoats').value);
			let pCoats = parseInt(
				document.querySelector('input[name="coats"]:checked').value
			);
			let pCoverage = pCoverInt / pCoats;
			let finalTotal = Math.ceil(total / pCoverage);
			let square = document.getElementById('square').innerText;
			document.getElementById('area').innerHTML = `
			<div class="pl-5">
			<small>
			PAINT AREA: <strong>${total} sq-${square}</strong><br>
			PAINT COATS: <strong>${pCoats}</strong>
			</small>
			</div>
			`;
			document.getElementById('resMod').innerHTML = `<h1>${finalTotal}</h1>`;

			let units = document.querySelector('input[name="xFactor"]:checked').value;
			if (finalTotal == 1 && units == 1) {
				resultFooter.innerText = 'LITRE';
			} else if (finalTotal !== 1 && units == 1) {
				resultFooter.innerText = 'LITRES';
			} else if (finalTotal == 1 && units == 2) {
				resultFooter.innerText = 'GALLON';
			} else {
				resultFooter.innerText = 'GALLONS';
			}
		} else {
			document.getElementById('resMod').innerHTML = `	
				<h1>0</h1>
				`;

			pCover == '' && height == ''
				? (resultFooter.innerText = 'NO DATA!')
				: (resultFooter.innerText = 'NO COVERAGE DATA!');
		}
	}

	// add up all the areas
	// function inputSum(valArr) {
	// 	let sum = 0;
	// 	valArr.forEach(function(arr) {
	// 		sum += Number(arr.value);
	// 	});
	// 	return sum;
	// }

	// clear button
	let clearBtn = document.getElementById('clearBtn');
	clearBtn.addEventListener('click', function() {
		document.getElementById('myForm').reset();
		document.getElementById('myForm2').reset();
		document.getElementById('myForm3').reset();
		document.getElementById('myForm4').reset();
	});
}
