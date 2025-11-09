# MySQL

MySQL is a popular relational database management system that allows you to store, manage, and retrieve data efficiently.

## Learning path

- The basic structure of databases
- What they are, how they work, and how to successfully navigate them;
- how to use SQL to retrieve and understand data no matter the scale of a database
- how to master the most important SQL query syntax, along with how and when to use it best.
- MySQL and MySQL Workbench on Mac

### Query

-- Create a new MySQL user with administrative privileges
-- This creates a user account 'wakidurRoot' that can only connect from localhost
-- The user is assigned a password and granted full privileges on all databases and tables
-- WITH GRANT OPTION allows this user to grant privileges to other users

CREATE USER 'wakidurRoot'@'localhost' IDENTIFIED BY '713470Wa';
GRANT ALL PRIVILEGES ON _._ TO 'wakidurRoot'@'localhost' WITH GRANT OPTION;

#### user + host

CREATE USER 'bill'@'saturn.3sn.net' IDENTIFIED BY 'secret!23X';
CREATE USER 'bill'@'%.3sn.net' IDENTIFIED BY 'secret!23X';

SHOW DATABASES;
-- test installed databases

USE world;
SHOW tables;

USE scratch;
SHOW tables;

USE album;
SHOW tables;

USE album;
SELECT \* FROM album;
