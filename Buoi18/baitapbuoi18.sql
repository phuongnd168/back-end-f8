CREATE DATABASE database_01_phuong;
use database_01_phuong;
CREATE TABLE courses(
    id int NOT NULL,
    name varchar(50) NOT NULL,
    price float,
    detail text,
    teacher_id int NOT NULL,
    active int,
    created_at timestamp,
    updated_at timestamp
);

ALTER TABLE courses ADD COLUMN description text NULL AFTER price;

ALTER TABLE courses RENAME COLUMN detail to content;
ALTER TABLE courses MODIFY content text NOT NULL;

CREATE TABLE teacher(
    id int NOT NULL,
    name varchar(50) NOT NULL,
    bio text NULL,
    created_at timestamp,
    updated_at timestamp
);

INSERT INTO teacher(id, name, bio, created_at, updated_at)
VALUES (1, "Hoàng An", "teacher", NOW(), NOW());
INSERT INTO teacher(id, name, bio, created_at, updated_at)
VALUES (2, "Hoàng An2", "teacher2", NOW(), NOW());
INSERT INTO teacher(id, name, bio, created_at, updated_at)
VALUES (3, "Hoàng An3", "teacher3", NOW(), NOW());


INSERT INTO courses(id, name, price, description, content, teacher_id, active,created_at, updated_at)
VALUES (1, "ExpressJS", 100000, "Hoc ExpressJS", "Tim hieu ve ExpressJS", 1, 1, NOW(), NOW());
INSERT INTO courses(id, name, price, description, content, teacher_id, active,created_at, updated_at)
VALUES (2, "NodeJS", 500000, "Hoc NodeJS", "Tim hieu ve NodeJS", 1, 1, NOW(), NOW());
INSERT INTO courses(id, name, price, description, content, teacher_id, active,created_at, updated_at)
VALUES (3, "JS", 800000, "Hoc JS", "Tim hieu ve JS", 1, 1, NOW(), NOW());



INSERT INTO courses(id, name, price, description, content, teacher_id, active,created_at, updated_at)
VALUES (1, "ExpressJS", 100000, "Hoc ExpressJS", "Tim hieu ve ExpressJS", 2, 1, NOW(), NOW());
INSERT INTO courses(id, name, price, description, content, teacher_id, active,created_at, updated_at)
VALUES (2, "NodeJS", 500000, "Hoc NodeJS", "Tim hieu ve NodeJS", 2, 1, NOW(), NOW());
INSERT INTO courses(id, name, price, description, content, teacher_id, active,created_at, updated_at)
VALUES (3, "JS", 800000, "Hoc JS", "Tim hieu ve JS", 2, 1, NOW(), NOW());


INSERT INTO courses(id, name, price, description, content, teacher_id, active,created_at, updated_at)
VALUES (1, "ExpressJS", 100000, "Hoc ExpressJS", "Tim hieu ve ExpressJS", 3, 1, NOW(), NOW());
INSERT INTO courses(id, name, price, description, content, teacher_id, active,created_at, updated_at)
VALUES (2, "NodeJS", 500000, "Hoc NodeJS", "Tim hieu ve NodeJS", 3, 1, NOW(), NOW());
INSERT INTO courses(id, name, price, description, content, teacher_id, active,created_at, updated_at)
VALUES (3, "JS", 800000, "Hoc JS", "Tim hieu ve JS", 3, 1, NOW(), NOW());


UPDATE courses SET name="ExJS", price=200000, updated_at=NOW() WHERE id=1;
UPDATE courses SET name="NdJS", price=300000, updated_at=NOW() WHERE id=2;
UPDATE courses SET name="JS Pro", price=400000, updated_at=NOW() WHERE id=3;


UPDATE teacher SET bio="teacher JS", updated_at=NOW() WHERE id=1;
UPDATE teacher SET bio="teacher JS Pro", updated_at=NOW() WHERE id=2;
UPDATE teacher SET bio="teacher JS1", updated_at=NOW() WHERE id=3;

SELECT * FROM teacher;
SELECT * FROM courses;

