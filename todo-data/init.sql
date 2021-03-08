SET TIME ZONE 'America/Sao_Paulo';
CREATE TABLE todo_user(
  id VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  PRIMARY KEY(id)
);
CREATE TYPE list_name AS ENUM ('NEW','TODO','DOING','DONE');
CREATE TABLE todo_task(
  id VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  list list_name NOT NULL DEFAULT 'NEW',
  owner_id VARCHAR(255) NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY (owner_id) REFERENCES todo_user(id)
);