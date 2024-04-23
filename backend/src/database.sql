CREATE DATABSE datatodo 

CREATE TABLE todo (
    todo_id SERIAL PRIMARY KEY,
    description TEXT(255)
);

ALTER TABLE todo
ADD COLUMN isComplete BOOLEAN DEFAULT FALSE;

SELECT * FROM todo;

INSERT INTO todo(description) VALUES('HELLO')

UPDATE todo SET description = $1, iscomplete = $2 WHERE todo_id = $3