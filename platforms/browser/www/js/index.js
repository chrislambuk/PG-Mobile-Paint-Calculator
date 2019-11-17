document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
	// EVENT LISTENER FOR CALC

	document.getElementById('submitBtn').addEventListener('click', getResults);
	
// document.querySelector('input[name="coats"]:checked').value
	// FUNCTIONS

	// 1. get results
	function getResults() {
		if (
			document.querySelectorAll('.height').value !== '' &&
			document.getElementById('pCover').value !== ''
		) {
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
			let pCover = parseInt(document.getElementById('pCover').value);
			// let pCoats = parseInt(document.getElementById('pCoats').value);
			let pCoats = document.querySelector('input[name="coats"]:checked').value
			let pCoverage = pCover / pCoats;
			let finalTotal = Math.ceil((wallTotals - windowTotals) / pCoverage);

			document.getElementById('resMod').innerHTML = `<h1>${finalTotal}</h1>`;

			if (finalTotal == 1) {
				document.getElementById('footer').innerText = 'LITRE';
			} else {
				document.getElementById('footer').innerText = 'LITRES';
			}
		} else {
			document.getElementById('resMod').innerHTML = `	
			<h1>0</h1>
			`;
			if (document.getElementById('pCover') == ''&& document.querySelectorAll('.height').value == '') {
				document.getElementById('footer').innerText = 'NO DATA!';
			} else {
				document.getElementById('footer').innerText = 'NO COVERAGE DATA!';
			}
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
