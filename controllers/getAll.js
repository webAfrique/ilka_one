'use strict'

const flowersTable = document.querySelector('tbody')
async function getAll() {
    const response = await fetch('http://localhost:5000/data/flowers')
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

getAll()