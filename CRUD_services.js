'use strict'

const { resolve } = require('path')
const flowers = require('./Nyode_Emmanuel_flowers.json')

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
            resolve(flower)
        }
    })
}

function insertOne(flower) {
    return new Promise((resolve, reject) => {
        flowers.push(flower)
        resolve('new flower created')
    })
}

function deleteOne(id) {
   return new Promise((resolve, reject) => {
    const target = flowers.findIndex(flower => flower.flowerId == id)
    flowers.splice(target, 1)
    resolve('deleted')
   })
}

module.exports = { getAll, getOneById, insertOne, getByKeyName, deleteOne  }