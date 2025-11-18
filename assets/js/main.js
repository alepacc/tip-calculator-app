const grid = document.querySelector('.grid')
const tips = document.querySelectorAll('.tip')

const billInput = document.getElementById('bill')
const peopleInput = document.getElementById('num_people')




tips.forEach(tip => {
    tip.addEventListener('click', e => {
        e.preventDefault()

        tips.forEach(t => t.classList.remove('selected'))

        tip.classList.add('selected')

        const billValue = billInput.value
        const peopleValue = peopleInput.value
        const customTip = document.querySelector('.tip--custom input')

        if(peopleValue === '0'){
            document.querySelector('#error').style.display = "block"
            document.getElementById("num_people").style.border = "1px solid orange"
        } else if (billValue != '' && peopleValue != ''){
            if (customTip.value != ''){

            }else {
                const tipRes = document.querySelector('.result-tip')
                const totalRes = document.querySelector('.result-total')

                let numb = tip.innerText // read % of the tip selected
                let percent = numb.replace('%', '')
                percent = parseInt(percent)/100 

                let tipAmount = +(billValue*percent/peopleValue).toFixed(2)
                let tot = +(tipAmount+billValue/peopleValue).toFixed(2)
                tipRes.innerText = `$${tipAmount}`
                totalRes.innerText = `$${tot}`
            }
        } 

    })
})


  
// button reset
const resetBtn = document.querySelector('button[type="reset"]')
resetBtn.addEventListener('click', e => {
    e.preventDefault()

    billInput.value = ''
    peopleInput.value = ''

    document.querySelector('.result-tip').innerText = '$0.00'
    document.querySelector('.result-total').innerText = '$0.00'

    tips.forEach(t => t.classList.remove('selected'))

    document.querySelector('#error').style.display = "none"
    document.getElementById("num_people").style.border = ''

    document.querySelector('.tip--custom input').value = ''

})