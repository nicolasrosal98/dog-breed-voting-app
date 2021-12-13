DROP TABLE IF EXISTS dog;
DROP TABLE IF EXISTS breed;
DROP TABLE IF EXISTS subbreed;

CREATE TABLE breed (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE subbreed (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE dog (
    id SERIAL PRIMARY KEY,
    breed_id INT NOT NULL,
    subbreed_id INT DEFAULT NULL,
    score INT DEFAULT 0,
    FOREIGN KEY (breed_id) REFERENCES breed(id),
    FOREIGN KEY (subbreed_id) REFERENCES subbreed(id)
);