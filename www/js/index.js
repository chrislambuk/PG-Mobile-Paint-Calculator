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
		dimArr.forEach(function(dim) {
			dim.innerText = 'ft';
		});
	});

	document.getElementById('metric').addEventListener('click', function(e) {
		covId.innerHTML = `m<sup>2</sup>/litre`;
		dimArr.forEach(function(dim) {
			dim.innerText = 'm';
		});
	});

	// document.querySelector('input[name="coats"]:checked').value
	// FUNCTIONS

	// 1. get results
	function getResults() {
		// let units = document.querySelector('input[name="xFactor"]:checked').value
		let resultFooter = document.getElementById('footer');
		let heightArray = document.querySelectorAll('.height');
		let widthArray = document.querySelectorAll('.width');
		let winheightArray = document.querySelectorAll('.winHeight');
		let winwidthArray = document.querySelectorAll('.winWidth');
		let pCover = document.getElementById('pCover').value;

		if (heightArray[0] !== '' && pCover !== '') {
			// calculate areas and sum
			let hSum = 0;
			let wSum = 0;
			let whSum = 0;
			let wwSum = 0;
			let wallSum = 0;
			let winSum = 0;

			// wall totals
			for (let i = 0; i < heightArray.length; i++) {
				wallSum =
					wallSum + Number(heightArray[i].value) * Number(widthArray[i].value);
			}
			// for (let i = 0; i < widthArray.length; i++) {
			// 	wSum = wSum + Number(widthArray[i].value);
			// }
			// window totals
			for (let i = 0; i < winheightArray.length; i++) {
				winSum =
					winSum +
					Number(winheightArray[i].value) * Number(winwidthArray[i].value);
			}
			// for (let i = 0; i < winwidthArray.length; i++) {
			// 	wwSum = wwSum + Number(winwidthArray[i].value);
			// }
			// let wallTotal = hSum * wSum
			// let winTotal = whSum * wwSum
			let sumTotal = wallSum - winSum;

			let pCoverInt = parseInt(pCover);
			// let pCoats = parseInt(document.getElementById('pCoats').value);

			let pCoats = parseInt(
				document.querySelector('input[name="coats"]:checked').value
			);
			let pCoverage = pCoverInt / pCoats;
			let finalTotal = Math.ceil(sumTotal / pCoverage);
			// draw result
			let square = document.getElementById('square').innerText;
			document.getElementById('area').innerHTML = `
			<div class="pl-5">
			<small>
			PAINT AREA: <strong>${sumTotal}${square}<sup>2</sup></strong><br>
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
			pCover == '' && heightArray[0] == ''
				? (resultFooter.innerText = 'NO DATA!')
				: (resultFooter.innerText = 'NO COVERAGE DATA!');
		}
	}

	// clear button
	let clearBtn = document.getElementById('clearBtn');
	clearBtn.addEventListener('click', function() {
		document.getElementById('myForm').reset();
		document.getElementById('myForm2').reset();
		document.getElementById('myForm3').reset();
		document.getElementById('myForm4').reset();
	});

	// Set AdMobAds options:
	admob.setOptions({
		publisherId: 'ca-app-pub-8816517022745547/1209512804', // Required
		// interstitialAdId:     "ca-app-pub-8816517022745547/1209512804",  // Optional
		tappxIdiOS: 'pub-50706-ios-8333', // Optional
		tappxShare: 0.5 // Optional
	});
	admob.createBannerView();
}
