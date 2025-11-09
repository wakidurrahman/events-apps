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

```sql
CREATE USER 'wakidurRoot'@'localhost' IDENTIFIED BY '713470Wa';
GRANT ALL PRIVILEGES ON _._ TO 'wakidurRoot'@'localhost' WITH GRANT OPTION;
```

#### user + host

```sql
CREATE USER 'bill'@'saturn.3sn.net' IDENTIFIED BY 'secret!23X';
CREATE USER 'bill'@'%.3sn.net' IDENTIFIED BY 'secret!23X';
```

```sql
SHOW DATABASES;
-- test installed databases

USE world;
SHOW tables;

USE scratch;
SHOW tables;

USE album;
SHOW tables;

USE album;
SELECT * FROM album;
```

```sql
-- 02-create-table.sql
-- create table with engine
USE scratch;

DROP TABLE IF EXISTS test;
CREATE TABLE IF NOT EXISTS test (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cname VARCHAR(128),
    localname VARCHAR(128)
) ENGINE = InnoDB;

INSERT INTO test (cname, localname) SELECT name, localname FROM world.country;
SELECT COUNT(*) FROM test;
SELECT * FROM test;

SELECT table_name, engine FROM information_schema.tables WHERE table_schema = 'scratch';

DROP TABLE IF EXISTS test;
```

---

## MySQL Essential Training

1. Introduction
2. Overview Of SQL
3. Data Type
4. Operators and Functions
5. String Function
6. Math Functions
7. Differences from standard SQL

### 2. Overview of SQL

#### - 2.1. A brief overview of SQL

- SQL Statement
  - Example: `SELECT * FROM users;`
- SQL Sensitivity
  - Example: `SELECT` and `select` are treated the same (case-insensitive), but table/column names may be case-sensitive depending on the system `SELECT * FROM TABLE; or SELECT * FROM  tAble;`
- SQL Comments
  - Example: `-- This is a single-line comment` or `/* This is a multi-line comment */`
- SQL Clauses
  - Example: `SELECT name FROM users WHERE age > 18 ORDER BY name;`
- SQL Function
  - Example: `SELECT COUNT(*) FROM orders;` or `SELECT COUNT(*name*) FROM Album WHERE Label = 'Columbia;` or `SELECT UPPER(name) FROM users;`
- SQL Expression
  - Example: `SELECT price * quantity AS total FROM order_items;`

#### Selecting Rows

```sql
USE world;

SELECT 'Hello , World';

SELECT 1 + 2;

SELECT * FROM Country;

SELECT  * FROM Country ORDER BY Name;

SELECT Name , Continent FROM Country ORDER BY Name;

SELECT Name, LifeExpectancy FROM Country ORDER BY Name;

SELECT Name, LifeExpectancy AS 'Life Exp' FROM Country ORDER BY Name;

SELECT COUNT(*) FROM Country;

SELECT * FROM Country ORDER BY Name LIMIT 5;

SELECT * FROM Country ORDER BY Name LIMIT 10, 5;

```

#### Selecting Columns

```sql
USE world;

SELECT \* FROM Country ORDER BY Name;

SELECT Name, Code, Region, Population FROM Country ORDER BY Code;

SELECT Name AS Country, Code AS ISO, Region, Population AS Pop FROM Country ORDER BY Code;
```

#### Counting Rows

```sql
SELECT COUNT(*) FROM Country;
SELECT COUNT(*) FROM Country WHERE Population > 1000000 ;
SELECT COUNT(*) FROM Country WHERE Population > 100000000 AND Continent = 'Europe';
```

#### Inserting Data

```sql
-- Inserting data
USE scratch;

SELECT * FROM customer;

INSERT INTO customer (name, address, city, state, zip) VALUES ('Fred', '123 Cobblestons', 'Bedrock', 'CA', '91234');

INSERT INTO customer (name, address, city, zip) VALUES ('Jimi', 'Well steed', 'Renton', '92365');
```

#### Updating Data

```sql
-- Updating data
USE scratch;

SELECT * FROM customer;

SELECT * FROM  customer WHERE name LIKE 'jimi%';

UPDATE customer SET address = '123 Music Avenue', state = 'CA' WHERE name LIKE 'jimi%';

UPDATE customer SET address = NULL, state = NULL WHERE name LIKE 'jimi%';
```

#### Deleting Data

```sql
-- Deleting date

USE scratch;

CREATE TABLE test (a INT, b VARCHAR(16), c VARCHAR(16) );
INSERT INTO test VALUES(1, 'this', 'right here!');
INSERT INTO test VALUES(2, 'that', 'over!');
INSERT INTO test VALUES(3, 'another', 'right here!');

SELECT * FROM test;

SELECT * FROM test WHERE a = 1;

DELETE FROM test WHERE a = 1;

DELETE FROM test;

DROP TABLE test;

DROP TABLE IF EXISTS test;

SELECT * FROM customer;

SELECT * FROM customer WHERE name LIKE 'Jimi%' OR name LIKE 'Fred%';

DELETE FROM customer WHERE name LIKE 'Jimi%' OR name LIKE 'Fred%';
```

#### Joining Queries across table Data

```sql
-- Joining queries

USE album;

SELECT * FROM album;

SELECT * FROM track;

SELECT a.artist AS Artist, a.title AS Album, t.track_number AS 'Track Num', t.title AS Track, t.duration AS Seconds
  FROM album AS a
  JOIN track AS t ON a.id = t.album_id
  ORDER BY a.artist, a.title, t.track_number;
```

#### Finding databases, tables and columns

```sql
-- Finding databases, tables, and columns

USE scratch;
SHOW databases;
SHOW tables;
DESCRIBE item;

```
