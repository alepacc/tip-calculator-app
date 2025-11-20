const billInput = document.getElementById("bill")
const peopleInput = document.getElementById("num_people")
const tips = document.querySelectorAll(".tip")
const customTip = document.querySelector(".tip--custom input")

const tipRes = document.querySelector('.result-tip')
const totalRes = document.querySelector('.result-total')
const errorMsg = document.querySelector("#error")

const resetBtn = document.querySelector('button[type="reset"]')

function validatePeople(){
    const peopleValue = peopleInput.value

    if (peopleValue === '0'){
        errorMsg.style.display = "block"
        peopleInput.style.border = "1px solid orange"
        tipRes.innerText = "$0.00"
        totalRes.innerText = "$0.00"
        return
    } else{
        errorMsg.style.display = "none"
        peopleInput.style.border = ""
    }
}

function calculate(percentage){
    const billValue = billInput.value
    const peopleValue = peopleInput.value

    validatePeople()

    if (!peopleValue) return

    if (!bill || !percentage || peopleValue === "0" || !peopleValue) {
        tipRes.innerText = "$0.00"
        totalRes.innerText = "$0.00"
        return
    }

    let percent = parseInt(percentage)/100 

    let tipAmount = +(billValue*percent/peopleValue).toFixed(2)
    let tot = +(tipAmount+billValue/peopleValue).toFixed(2)

    tipRes.innerText = `$${tipAmount}`
    totalRes.innerText = `$${tot}`

    resetBtn.disable = false
}

function rmSecetedTip(){
    tips.forEach(btn => btn.classList.remove('selected'))
}

function getPercentage(){
    const selected = document.querySelector('.selected')

    if (selected) 
        return parseInt(selected.innerText.replace("%", ""))

    if (customTip.value != "")
        return parseInt(customTip.value)

    return null
}

// ––––– EVENTS –––––––
tips.forEach(tip =>
    tip.addEventListener("click", () =>  {
        rmSecetedTip()
        tip.classList.add('selected')
        customTip.value = ''

        // validatePeople()

        let percent = getPercentage()
        calculate(percent)
    })
)

const inputs = document.querySelectorAll('input')
inputs.forEach(input => {
    input.addEventListener('change', e => {
        e.preventDefault()

        resetBtn.disabled = input.value.trim() === ""

        if(customTip.value !== ''){
            rmSecetedTip()
        }
            
        if(input.value != '' && peopleInput.value !== '0'){
            let percent = getPercentage()
            if (percent) calculate(percent)

        }else {
            validatePeople()
        }
    })
})

  
// button reset
resetBtn.addEventListener('click', e => {
    e.preventDefault()

    billInput.value = ''
    peopleInput.value = ''

    tipRes.innerText = '$0.00'
    totalRes.innerText = '$0.00'

    tips.forEach(t => t.classList.remove('selected'))

    errorMsg.style.display = "none"
    peopleInput.style.border = ""

    customTip.value = ''

})