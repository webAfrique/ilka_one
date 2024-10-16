'use strict'

const searchForm = document.querySelector('input[type="text"]')
const searchBy = document.querySelector('select')
const searchBtn = document.querySelector('#search-btn')
const searchResult = document.querySelector('.search-result')


/* function searchFlower() {
    const key = searchBy.value
    const value = searchForm.value
    fetch(`http://localhost:5000/data/search?key=${key}&value=${value}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
    .catch(error => alert(error))
} */

function createTable() {
    let table = document.createElement('table')
    table.innerHTML = 
    `
        <thead>
            <td>flowerId</td>
            <td>name</td>
            <td>stock</td>
            <td>unitPrice</td>
            <td>site</td>
        </thead>
        <tbody>
        </tbody>
    `
    return table
}
        

function searchFlower() {
    searchResult.innerHTML = ''
    const key = searchBy.value
    const value = searchForm.value
    const response = fetch(`http://localhost:5000/data/search?key=${key}&value=${value}`)
    response.then(data => {
        if(data.status == 404){
            data.json().then(error => searchResult.innerHTML = `<p>${error.message}</p>`)
        }
        return data.json()
    })
    .then(data => {
        let resultsTable = createTable()
        data.forEach(element => {
            //const tableRow = document.createElement('tr')
            const flower = `
            <tr>
            <td>${element.flowerId}</td>
            <td>${element.name}</td>
            <td>${element.stock}</td>
            <td>${element.unitPrice}</td>
            <td>${element.site}</td>
            </tr>
            `
            //tableRow.innerHTML += flower
            //resultsTable.appendChild(tableRow)
            resultsTable.querySelector('tbody').innerHTML += flower
        });
        searchResult.appendChild(resultsTable)
    })
    .catch(error => searchResult.innerHTML = `<p>${error.message}</p>`)
}


searchBtn.addEventListener('click', searchFlower)

