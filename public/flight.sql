-- Create a new database (if not already created)
CREATE DATABASE IF NOT EXISTS flight_reservation_system;

-- Use the newly created database
USE flight_reservation_system;

-- Create a table to store flight information
CREATE TABLE flights (
    flight_id INT AUTO_INCREMENT PRIMARY KEY,
    flight_name VARCHAR(255) NOT NULL,
    source VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    fare INT NOT NULL
);

-- Insert some sample flight data
INSERT INTO flights (flight_name, source, destination, fare)
VALUES
    ('Flight 1', 'Bangalore', 'New York', 200000),
    ('Flight 2', 'Bangalore', 'Dubai', 75000),
    ('Flight 3', 'Dubai', 'New York', 30000),
    ('Flight 4', 'Bangalore', 'New Delhi', 30000),
    ('Flight 5', 'New Delhi', 'New York', 40000);
