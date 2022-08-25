CREATE DATABASE perntodo;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);

/l == shows all the databases
\c (name of databse) == connect to one databse
\dt == shows details of database