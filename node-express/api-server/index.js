const express = require('express');
const { findMax, calculateAverage, customSort, countOccurrences, getMinNumber } = require('./utils/utils.js');
const app = express();
const port = 3000;

app.get('/number/max', (req, res) =>{
    const numbers = req.query.numbers;
    if(!numbers){
        res.status(400).json({error: 'Missing parameters: numbers is required'});
        return;
    }   

    const numbersArray = numbers.split(',').map(num => parseFloat(num));
  
    const result = findMax(numbersArray);
    res.json({max: result});
})

app.get('/number/avg', (req, res) =>{
    
    const numbers = req.query.numbers;
    if(!numbers){
        res.status(400).json({error: 'Missing parameters: numbers is required'});
        return;
    }   
    
    const numbersArray = numbers.split(',').map(num => parseFloat(num));

    if(numbersArray.some(isNaN)){
        res.status(400).json({error: 'Invalid parameters: numbers must be a comma-separated list of numbers'});
        return;
    }
    const result = calculateAverage(numbersArray);
    res.json({average: result});
});

app.get('/number/sort', (req, res) =>{
   const numbers = req.query.numbers;
   const type = req.query.type;

    if(!numbers || !type){
         res.status(400).json({error: 'Missing parameters: numbers and type are required'});
         return;
    }

    const numbersArray = numbers.split(',').map(num => parseFloat(num));
    if(numbersArray.some(isNaN)){
        res.status(400).json({error: 'Invalid parameters: numbers must be a comma-separated list of numbers'});
        return;
    }

    if(type !== 'asc' && type !== 'desc'){
        res.status(400).json({error: 'Invalid type: type must be asc or desc'});
        return;
    }
    const result = customSort(numbersArray, type);
    res.json({sortedNumbers: result});
});

app.get('/number/count', (req, res) =>{
    const numbers = req.query.numbers;
    const search = req.query.search;
    if(!numbers || !search){
        res.status(400).json({error: 'Missing parameters: numbers is required'});
        return;
    }

    const numbersArray = numbers.split(',');
    const result = countOccurrences(numbersArray, search);
    res.json({count: result});
});

app.get('/number/min', (req, res) =>{
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    if(!req.query.num1 || !req.query.num2){
        res.status(400).json({error: 'Missing parameters: num1 and num2 are required'});
        return;
    }
    if(isNaN(num1) || isNaN(num2)){
        res.status(400).json({error: 'Invalid parameters: num1 and num2 must be numbers'});
        return;
    }
    const result = getMinNumber(num1, num2);
    res.json({min: result});
})  

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
})