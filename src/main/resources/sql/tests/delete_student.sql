-- Add Department
INSERT INTO DEPARTMENT (NAME) VALUES ('DEPARTMENT');
-- Add Subjects
INSERT INTO SUBJECT(NAME) VALUES ('SUBJECT');
INSERT INTO SUBJECT(NAME) VALUES ('SUBJECT-2');
-- Link Subjects with Department
INSERT INTO SUBJECT_DEPARTMENT (SUB_ID, DEP_ID)
VALUES ((SELECT ID FROM SUBJECT WHERE NAME = 'SUBJECT'),
        (SELECT ID FROM DEPARTMENT WHERE NAME = 'DEPARTMENT'));
INSERT INTO SUBJECT_DEPARTMENT (SUB_ID, DEP_ID)
VALUES ((SELECT ID FROM SUBJECT WHERE NAME = 'SUBJECT-2'),
        (SELECT ID FROM DEPARTMENT WHERE NAME = 'DEPARTMENT'));
-- Add Student
INSERT INTO STUDENT (FIRST_NAME, LAST_NAME, PASSWORD, EMAIL, BIRTHDAY, ROLE, DEP_ID)
VALUES ('FIRST-NAME', 'LAST-NAME', 'PASSWORD', 'EMAIL', '2000-01-01', 'USER',
        (SELECT ID FROM DEPARTMENT WHERE NAME = 'DEPARTMENT'));
-- Link Subjects with Student
INSERT INTO SUBJECT_STUDENT (STUD_ID, SUB_ID)
VALUES ((SELECT ID FROM STUDENT WHERE FIRST_NAME = 'FIRST-NAME' AND LAST_NAME ='LAST-NAME'),
        (SELECT ID FROM SUBJECT WHERE NAME ='SUBJECT'));
INSERT INTO SUBJECT_STUDENT (STUD_ID, SUB_ID)
VALUES ((SELECT ID FROM STUDENT WHERE FIRST_NAME = 'FIRST-NAME' AND LAST_NAME ='LAST-NAME'),
        (SELECT ID FROM SUBJECT WHERE NAME ='SUBJECT-2'));
-- Add Marks
INSERT INTO MARK (VALUE, DATE, STUD_ID, SUBJ_ID)
VALUES (2, '2018-04-01', (SELECT ID FROM STUDENT WHERE FIRST_NAME = 'FIRST-NAME' AND LAST_NAME ='LAST-NAME'),
        (SELECT ID FROM SUBJECT WHERE NAME ='SUBJECT'));
INSERT INTO MARK (VALUE, DATE, STUD_ID, SUBJ_ID)
VALUES (3, '2018-04-14',
        (SELECT ID FROM STUDENT WHERE FIRST_NAME = 'FIRST-NAME' AND LAST_NAME ='LAST-NAME'),
        (SELECT ID FROM SUBJECT WHERE NAME ='SUBJECT'));
INSERT INTO MARK (VALUE, DATE, STUD_ID, SUBJ_ID)
VALUES (3, '2018-06-04',
        (SELECT ID FROM STUDENT WHERE FIRST_NAME = 'FIRST-NAME' AND LAST_NAME ='LAST-NAME'),
        (SELECT ID FROM SUBJECT WHERE NAME ='SUBJECT'));