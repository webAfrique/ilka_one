'use strict'

const { resolve } = require('path')
const flowers = require('./data/Nyode_Emmanuel_flowers.json')
const fs = require('node:fs/promises');

function getAll() {
    return flowers
}

function getOneById(id) {
    const flower = flowers.filter(flower => flower.flowerId == id )
    return new Promise((resolve, reject) => {
        if(flower.length == 0){
            reject('The requested resource is unavailable')
        }
        else{
            resolve(flower)
        }
    })
}
function getByKeyName( { key, value } ) {
    const flower = flowers.filter(flower => flower[key] == value )
    return new Promise((resolve, reject) => {
        if(flower.length == 0){
            reject('The requested resource is unavailable')
        }
        else{
            //console.log(flower)
            resolve(flower)
        }
    })
}

async function insertOne(newFlower) {
    flowers.push(newFlower);
    try {
      await fs.writeFile('./data/Nyode_Emmanuel_flowers.json', JSON.stringify(flowers),);
      return 'The flower has been added successfully';
    } catch (err) {
        console.log(err);
        return 'An error occurred while trying to add the flower';
    }
}


async function updateOne(details) {
    const targetIndex = flowers.findIndex(flower => flowerId == details.flowerId)
    
    try {
        if(targetIndex == -1){
            throw new Error(`The flower ${details.name} was not found`)
        }
        const targetFlower = flowers[targetIndex]
        /* for(const key in details){
            if(key === '') continue
            targetFlower[key] = details[key]
        } */
        const updatedFlower = {...targetFlower, ...details}
        flowers.splice(targetIndex, 1, updatedFlower)
        await fs.writeFile('./data/Nyode_Emmanuel_flowers.json', JSON.stringify(flowers))
        return `The flower ${targetFlower.name} was updated successfully`
    } catch (error) {
        return error.message
    }
}

function deleteOne(id) {
   return new Promise((resolve, reject) => {
    const target = flowers.findIndex(flower => flower.flowerId == id)
    flowers.splice(target, 1)
    resolve('deleted')
   })
}

module.exports = { getAll, getOneById, insertOne, getByKeyName, updateOne, deleteOne  }