const { client } = require("./common");

const seed = async () => {
  try {
    await client.connect();
    let SQL = `
    DROP TABLE IF EXISTS employees;
    DROP TABLE IF EXISTS departments;
    CREATE TABLE departments(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
    );
    CREATE TABLE employees(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name varchar(100),
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),
    department_id INTEGER REFERENCES departments(id) NOT NULL
    );
    INSERT INTO departments(name) VALUES('Management');
    INSERT INTO departments(name) VALUES('IT');
    INSERT INTO departments(name) VALUES('Sales');
    INSERT INTO employees(name, department_id) VALUES('Jack Shepherd', (SELECT id FROM departments WHERE name='Management'));
    INSERT INTO employees(name, department_id) VALUES('John Locke', (SELECT id FROM departments WHERE name='Sales'));
    INSERT INTO employees(name, department_id) VALUES('Desmond Hume', (SELECT id FROM departments WHERE name='IT'));
       `;
    await client.query(SQL);
    await client.end();
    console.log("We have data");
  } catch (error) {
    console.log(error);
  }
};

seed();
