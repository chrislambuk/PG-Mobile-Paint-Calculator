// EVENT LISTENER FOR CALC
let calcBtn = document.getElementById('submitBtn').addEventListener('click', getResults);

// FUNCTIONS

// 1. get results
function getResults() {
  if (document.querySelector('.height').value !== '' && document.getElementById('pCover').value !== '') {
    // get the totals for the wall heights
    let hValue = document.querySelectorAll('.height');
    let hValArr = Array.from(hValue);

    // get the totals for the wall widths
    let wValue = document.querySelectorAll('.width');
    let wValArr = Array.from(wValue);

    // WALL TOTALS
    let wallTotals = inputSum(hValArr) * inputSum(wValArr)

    // get the total for windows and doors height
    let hWInValue = document.querySelectorAll('.win-height');
    let hWinValArr = Array.from(hWInValue);

    // get the total for windows and doors widths
    let wWInValue = document.querySelectorAll('.win-width');
    let wWinValArr = Array.from(wWInValue);

    // WINDOW TOTALS

    let windowTotals = inputSum(hWinValArr) * inputSum(wWinValArr);

    let pCover = parseInt(document.getElementById('pCover').value);
    let pCoats = parseInt(document.getElementById('pCoats').value);

    let pCoverage = pCover / pCoats;

    let finalTotal = Math.ceil((wallTotals - windowTotals) / pCoverage);
    document.getElementById('resultArea').style.display = 'block';
    document.getElementById('endResult').innerText = finalTotal
    if(finalTotal == 1){
      document.getElementById('footer').innerHTML = "Litre"
    }else{
      document.getElementById('footer').innerHTML = "Litres"
    }
  } else {
    const div = document.createElement('div');
    div.className = 'alert alert-danger';
    div.id = 'alert';
    div.style.width = '80%';
    div.style.padding = '3px'
    div.style.margin = '5px auto';
    div.appendChild(document.createTextNode('Check inputs!'));
    const container = document.getElementById('form-body');
    const form = document.getElementById('myForm');
    container.insertBefore(div, form);

    // document.getElementById('alarm').style.display = 'block';
    setTimeout(() => {
      document.getElementById('alert').remove();
    }, 3000);
  }
}


// 2. add up all the areas
function inputSum(valArr) {
  let sum = 0;
  valArr.forEach(function (arr) {
    sum += (Number(arr.value))
  });
  return sum;
};

document.getElementById('closeBtn').addEventListener('click', closeResult);
window.addEventListener('click', outsideClick);

function closeResult(){
  document.getElementById('resultArea').style.display = 'none';
}
// Close If Outside Click
function outsideClick(e) {
  if (e.target == resultArea) {
    resultArea.style.display = 'none';
  }
}
// clear button

let clearBtn = document.getElementById('clearBtn');
clearBtn.addEventListener('click', function () {
  window.location.reload(true);
  document.getElementById('endResult').innerText = '0';
});