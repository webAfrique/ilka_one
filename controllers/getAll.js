'use strict'

const flowersTable = document.querySelector('tbody')
async function getAll() {
    const response = await fetch('http://localhost:5000/data/all')
    const data = await response.json()
    data.forEach(item => {
        const flower = `
        <tr>
        <td>${item.flowerId}</td>
        <td>${item.name}</td>
        <td>${item.stock}</td>
        <td>${item.unitPrice}</td>
        <td>${item.site}</td>
        </tr>
    `
        flowersTable.innerHTML += flower
    });
}

getAll()