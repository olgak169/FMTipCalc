let helper = document.getElementById('helper')
window.addEventListener('resize', () => {
    helper.innerText= window.innerWidth
})
const pplInput = document.getElementById('num-people')
const billInput = document.getElementById('bill-amount')
const customInput = document.getElementById('tip-custom')
const tipInputs = document.querySelectorAll('.tip input[type = "radio"]')

const tipAmountOutput = document.getElementById('tip-person')
const totalOutput = document.getElementById('tip-total')
const reset = document.getElementById('btn-reset')

let pplNum = ''
let billTotal =''
let tipSelected = ''
reset.disabled = true

reset.addEventListener('click', resetAll)
pplInput.addEventListener('input', () => {
    getInputs(pplInput)
})
billInput.addEventListener('input', () => {
    getInputs(billInput)
})
customInput.addEventListener('input', () => {
    radioInactive()
    getInputs(customInput)
})

tipInputs.forEach(inp => {
    inp.addEventListener('click' , () => {
        radioInactive()
        getInputs(inp)
    })
    
})
function getInputs(el) {
    if (el.validity.valid) {
        if(el.id === 'bill-amount'){
            billTotal = el.value
        } else if (el.id === 'num-people') {
            pplNum = el.value 
        } else if (el.id === 'tip-custom') {
            tipSelected = customInput.value
        } else if(el.name === 'tip'){
            el.parentElement.classList.add('active')
            customInput.value = ''
            tipSelected = el.value
        }
        output()
        resetReady()
    }
}
function radioInactive() {
    tipInputs.forEach(inp => {
        inp.parentElement.classList.remove('active')
    })
}
function output() {
    if (pplNum != 0 && billTotal != 0 && tipSelected != '') {
        let tipPercent = (billTotal / 100) * tipSelected
        let tipPerPerson = tipPercent / pplNum
        let totalPerPerson = (billTotal / pplNum ) + tipPerPerson

        totalOutput.innerHTML = '$' + totalPerPerson.toFixed(2)
        tipAmountOutput.innerHTML = tipPerPerson < 50 ? animateValue(tipAmountOutput, tipPerPerson) : '$' + tipPerPerson.toFixed(2)
        reset.classList.add('ready')
    }
}
function resetReady() {
    reset.disabled =false
    reset.classList.add('ready')
}
function animateValue(elem, val) {
    let start = 0;
    let increment = 0.2
    let timer = setInterval(() => {
        if (start >= val) {
            elem.innerHTML = '$' + val.toFixed(2);
            clearInterval(timer);
        } else {
            start += increment;
            elem.innerHTML = '$' + start.toFixed(2);
        }
    }, 1);
}
function resetAll() {
    pplNum = ''
    billTotal =''
    tipSelected = ''
    radioInactive()
    pplInput.value = pplNum
    billInput.value = billTotal
    customInput.value = tipSelected
    totalOutput.innerHTML = '$0.00'
    tipAmountOutput.innerHTML = '$0.00'
    reset.classList.remove('ready')
    reset.disabled = true
}
resetAll()