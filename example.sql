create database code7;

create table debts (
    id int not null auto_increment,
    customers int not null,
    description varchar(255),
    createdAt TIMESTAMP not null DEFAULT CURRENT_TIMESTAMP,
    value DECIMAL(10,2) not null DEFAULT 0,
    primary key (id)
)