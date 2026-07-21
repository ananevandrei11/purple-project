import { readFileSync } from 'node:fs';

const data = readFileSync('products.json', 'utf8');
const json = JSON.parse(data);
console.log(json.products);
