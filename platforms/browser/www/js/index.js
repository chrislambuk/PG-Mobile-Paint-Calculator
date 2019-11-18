document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
	// EVENT LISTENER FOR CALC

	document.getElementById('submitBtn').addEventListener('click', getResults);

	let units = document.querySelector('input[name="xFactor"]:checked').value;

	document.getElementById('imperial').addEventListener('click', function(e) {
		document.getElementById('covId').innerHTML = `ft<sup>2</sup>/gallon`;
		let dimension = document.querySelectorAll('.dimension');
		let dimArr = Array.from(dimension);
		dimArr.forEach(function(dim) {
			dim.innerText = 'ft';
		});
	});

	document.getElementById('metric').addEventListener('click', function(e) {
		document.getElementById('covId').innerHTML = `m<sup>2</sup>/litre`;
		let dimension = document.querySelectorAll('.dimension');
		let dimArr = Array.from(dimension);
		dimArr.forEach(function(dim) {
			dim.innerText = 'm';
		});
	});

	// document.querySelector('input[name="coats"]:checked').value
	// FUNCTIONS

	// 1. get results
	function getResults() {
		let units = document.querySelector('input[name="xFactor"]:checked').value;
		const resultFooter = document.getElementById('footer');
		const height = document.querySelectorAll('.height').value;
		const pCover = document.getElementById('pCover').value;

		if (height !== '' && pCover !== '') {
			// get the totals for the wall heights
			let hValue = document.querySelectorAll('.height');
			let hValArr = Array.from(hValue);

			// get the totals for the wall widths
			let wValue = document.querySelectorAll('.width');
			let wValArr = Array.from(wValue);

			// WALL TOTALS
			let wallTotals = inputSum(hValArr) * inputSum(wValArr);

			// get the total for windows and doors height
			let hWinValue = document.querySelectorAll('.win-height');
			let hWinValArr = Array.from(hWinValue);

			// get the total for windows and doors widths
			let wWinValue = document.querySelectorAll('.win-width');
			let wWinValArr = Array.from(wWinValue);

			// WINDOW TOTALS

			let windowTotals = inputSum(hWinValArr) * inputSum(wWinValArr);
			let pCoverInt = parseInt(pCover);
			// let pCoats = parseInt(document.getElementById('pCoats').value);
			let pCoats = document.querySelector('input[name="coats"]:checked').value;
			let pCoverage = pCoverInt / pCoats;
			let finalTotal = Math.ceil((wallTotals - windowTotals) / pCoverage);

			document.getElementById('resMod').innerHTML = `<h1>${finalTotal}</h1>`;

			// (finalTotal == 1 && units == 1
			// 	? (resultFooter.innerText = 'LITRE')
			// 	: (resultFooter.innerText = 'LITRES'))
			// (finalTotal == 1 && units == 2
			// 		? (resultFooter.innerText = 'GALLON')
			// 		: (resultFooter.innerText = 'GALLONS')
			// );
			let units = document.querySelector('input[name="xFactor"]:checked').value;
			if (finalTotal == 1 && units == 1) {
				resultFooter.innerText = 'LITRE';
			} else if (finalTotal !== 1 && units == 1){
				resultFooter.innerText = 'LITRES';
			} else if (finalTotal == 1 && units == 2){
				resultFooter.innerText = 'GALLON';
			}else{
				resultFooter.innerText = 'GALLONS';
			}
		} else {
			document.getElementById('resMod').innerHTML = `	
			<h1>0</h1>
			`;

			pCover == '' && height == ''
				? (resultFooter.innerText = 'NO DATA!')
				: (resultFooter.innerText = 'NO COVERAGE DATA!');

			// if (
			// 	document.getElementById('pCover') == '' &&
			// 	document.querySelectorAll('.height').value == ''
			// ) {
			// 	resultFooter.innerText = 'NO DATA!';
			// } else {
			// 	resultFooter.innerText = 'NO COVERAGE DATA!';
			// }
		}
	}

	// add up all the areas
	function inputSum(valArr) {
		let sum = 0;
		valArr.forEach(function(arr) {
			sum += Number(arr.value);
		});
		return sum;
	}

	// clear button
	let clearBtn = document.getElementById('clearBtn');
	clearBtn.addEventListener('click', function() {
		document.getElementById('myForm').reset();
		document.getElementById('myForm2').reset();
		document.getElementById('myForm3').reset();
	});
}
