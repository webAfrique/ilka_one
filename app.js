'use strict'

const output = document.querySelector('.output')



//getAll module 
const flowersTable = document.querySelector('tbody')
const showAllBtn = document.querySelector('#show-all-btn')

async function getAll() {
    const response = await fetch('http://localhost:5000/flowers')
    const data = await response.json()
    data.forEach(element => {
        const flower = `
        <tr>
        <td>${element.flowerId}</td>
        <td>${element.name}</td>
        <td>${element.stock}</td>
        <td>${element.unitPrice}</td>
        <td>${element.site}</td>
        </tr>
    `
        flowersTable.innerHTML += flower
    });
}
showAllBtn.addEventListener('click', getAll)

// add new flower module
const inputForm = document.querySelector('#input-form')

function addFlower(event) {
    event.preventDefault()
    const formData = new FormData(inputForm)
    const newFlower = Object.fromEntries(formData)
    fetch('http://localhost:5000/flowers', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newFlower),
        mode: 'no-cors'
    })
}

inputForm.addEventListener('submit', addFlower)

//search module
const searchForm = document.querySelector('.search-form')

function searchFlower(event) {
    event.preventDefault()
    const formData = new FormData(searchForm)
    const search = Object.fromEntries(formData)
    const response = fetch(`http://localhost:5000/flowers?key=${search.key}&value=${search.value}`) 
    response.then(data => data.json())
    .then(data => {
        return data.forEach(element => {
            const flower = `
            <tr>
            <td>${element.flowerId}</td>
            <td>${element.name}</td>
            <td>${element.stock}</td>
            <td>${element.unitPrice}</td>
            <td>${element.site}</td>
            </tr>
            `
            flowersTable.innerHTML += flower
        });
    })
    .catch(error => console.log(error))
}
/* async function searchFlower(event) {
    event.preventDefault()
    const formData = new FormData(searchForm)
    const search = Object.fromEntries(formData)
    try {
        const results = await fetch(`http://localhost:5000/flowers?key=${search.key}&value=${search.value}`) 
        const data = await results.json()
        data.forEach(element => {
        const flower = `
        <tr>
        <td>${element.flowerId}</td>
        <td>${element.name}</td>
        <td>${element.stock}</td>
        <td>${element.unitPrice}</td>
        <td>${element.site}</td>
        </tr>
        `
        flowersTable.innerHTML += flower
    });
    } catch (error) {
        /* console.log('from catch branch')
        console.log(error) 
        console.log(error) 
    }
    
} */
searchForm.addEventListener('submit', searchFlower)