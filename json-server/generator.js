const fs = require('fs');
const { faker } = require('@faker-js/faker');

const products = Array.from({ length: 100000 }, (_, i) => ({
  id: i + 1,
  title: faker.commerce.productName(),
  category: faker.commerce.department(),
  price: faker.commerce.price(),
  description: faker.commerce.productDescription()
}));

fs.writeFileSync('db.json', JSON.stringify({ products }));