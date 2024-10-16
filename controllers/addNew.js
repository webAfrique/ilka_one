'use strict'

const inputForm = document.querySelector('#new-flower')
const submitButton = document.querySelector('#add-flower-btn')
const statusMessage = document.querySelector('#status-msg')

function addFlower() {
    //event.preventDefault()
    const formData = new FormData(inputForm)
    const newFlower = Object.fromEntries(formData)
    fetch('http://localhost:5000/flowers/new', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newFlower),
        mode: 'no-cors'
    })
    .then(response => statusMessage.textContent = response.text())
    .catch(error => alert(error))
}

//inputForm.addEventListener('submit', addFlower)
submitButton.addEventListener('submit', addFlower)