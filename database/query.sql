CREATE TABLE users (
    username varchar(20) NOT NULL,
    password varchar(255) NOT NULL,
    fullName varchar(100),
    phoneNumber varchar(9),
    PRIMARY KEY (username)
);

CREATE TABLE contacts (
    id int NOT NULL AUTO_INCREMENT,
    username varchar(20) NOT NULL,
    firstName varchar(50) NOT NULL,
    lastName varchar(50) NOT NULL,
    phoneNumber varchar(9),
    address varchar (255),
    birthday date,
    date_at date DEFAULT CURDATE(),
    PRIMARY KEY (id),
    FOREIGN KEY (username) REFERENCES users(username)
);