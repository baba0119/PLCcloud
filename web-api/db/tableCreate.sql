DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS projects;

CREATE TABLE users (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  userid VARCHAR(32) UNIQUE,
  passwords VARCHAR(140),
  token VARCHAR(40),
  INDEX users_index(id)
);

CREATE TABLE projects (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  userid VARCHAR(32),
  projectid VARCHAR(40) UNIQUE,
  projectname VARCHAR(54),
  ldprogram JSON,
  plcid VARCHAR(40) UNIQUE,
  INDEX projects_index(id)
);

show columns from users;
show columns from projects;
