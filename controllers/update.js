'use strict'

const updateForm = document.querySelector('#update-flower')
const updateButton = document.querySelector('#update-flower-btn')
const statusMessage = document.querySelector('#status-msg')

function updateFlower() {
    console.log('updateFlower()')
    const formData = new FormData(updateForm)
    const newFlower = Object.fromEntries(formData)
    newFlower.dummy = 'dummy'
    if(newFlower.flowerId == ''){
        statusMessage.textContent = 'Please enter the flowerId'
        return
    }
    fetch('http://localhost:5000/data/update', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newFlower),
        mode: 'no-cors'
    })
    .then(response => statusMessage.textContent = response.text())
    .catch(error => alert(error))
}

updateButton.addEventListener('click', updateFlower)
//updateForm.addEventListener('submit', updateFlower)