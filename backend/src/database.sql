CREATE DATABSE datatodo 

CREATE TABLE todo (
    todo_id SERIAL PRIMARY KEY,
    description TEXT(255)
);

SELECT * FROM todo;

INSERT INTO todo(description) VALUES('HELLO')