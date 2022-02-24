const { faker } = require("@faker-js/faker");
const _ = require("lodash");

for (const idx of _.range(10)) {
  console.log({
    name: faker.name.findName(),
    age: 30,
  });
}
