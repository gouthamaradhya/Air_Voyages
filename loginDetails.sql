-- Create a new database if it doesn't exist
CREATE DATABASE IF NOT EXISTS loginDetails;

-- Use the newly created database
USE loginDetails;

-- Create a table to store user registration data
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Optionally, you can create an index on the username column for faster lookups
CREATE INDEX idx_username ON users (username);
