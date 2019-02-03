use gfo;

INSERT INTO goal
VALUES (1, 'Gain Muscle');
INSERT INTO goal
VALUES (2, 'Strength');
INSERT INTO goal
VALUES (3, 'Loose Weight');



INSERT INTO exercise
VALUES	(1 ,'Bench Press',40),
		(2,'Squat',80),
		(3,'DeadLift',90),
		(4,'Pull ups',50),
        (5,'Barbel Curl',15),
        (6,'Trishep Pushdown',15),
        (7,'Peck Deck',25),
        (8,'Overhead Barbel Press',50),
        (9,'Incline Barbel Press',50),
        (10,'Dips',30),
        (11,'t-bar row',30),
        (12,'Pendlay row',30),
        (13,'Front-Squat',100);
                


INSERT INTO client
VALUES 	('GDanos','1111','Giwrgos','Ntanos','gdanos@mail.com','6981011012',65.5,1.70,'Ntaksei kalo gumnasthriaki',1),
		('MDanos','1111','Marios','Ntanos','mdanos@mail.com','6981011013',120,1.84,'Oloi me koitazoun ekei mesa',2),
		('MPouti','1111','Magia','Pouti','Mpouti@mail.com','6981011014',56,1.72,'Wraio paidi o Marios h Giwrgos',2);
	
INSERT INTO measure
VALUES 	("2017-04-01 08:00:00",60,19,'GDanos'),
		("2017-04-01 08:00:00",120,3,'MDanos'),
		("2017-03-13 08:00:00",110,5,'MDanos'),
		("2013-03-01 08:00:00",130,6,'MDanos'),
		("2016-05-22 08:00:00",130,6,'MDanos'),
		("2017-01-01 08:00:00",130,6,'MDanos'),
		("2017-04-01 08:00:00",50,28,'MPouti');
    
INSERT INTO visit
VALUES 	("2017-04-02 08:00:00",'GDanos'),
		("2017-04-02 08:10:00",'GDanos'),
		("2017-04-02 08:30:00",'GDanos'),
		("2017-04-02 08:40:00",'GDanos'),
		("2017-04-02 09:00:00",'GDanos'),
		("2017-04-01 08:00:00",'GDanos'),
		("2017-04-01 08:00:00",'MDanos'),
		    
		("2017-05-26 16:00:00",'GDanos'),
		("2017-05-26 16:10:00",'GDanos'),
		("2017-05-26 14:00:00",'GDanos'),
		("2017-05-26 16:30:00",'MDanos'),
		("2017-05-22 14:00:00",'GDanos'),
		("2017-05-23 16:30:00",'MDanos'),
        ("2017-05-22 13:00:00",'GDanos'),
		("2017-05-21 16:30:00",'MDanos');

INSERT INTO product
VALUES	(1,'TREN',34.99,'Klen'),
		(2,'WHEY PROTEIN',69.99,'Aplh prwteinoula 2kg'),
        (3,'Klebuterol',50,'Ti ennoeis den exeis asthma?');

INSERT INTO purchase
VALUES	(1,"2017-04-01 08:00:00",'MDanos'),
		(2,"2017-04-01 08:00:00",'MDanos');
        
INSERT INTO purchase_product
VALUES	(1,1,2),
		(2,2,5);
INSERT INTO rate
VALUES	('MDanos',1,5,'Elpizw na mhn faei ta nefra mou'),
		('MDanos',2,5,'Polu kalh prwteinh.Paramenw fusikos');

INSERT INTO employee
VALUES 	('Xrhstos12','1111','xrhstos12@mail.com','Xrhstos','Xristidhs','6981011022',"16:00:01","00:00:00"),
		('Nikh24','1111','nikh23@mail.com','Nikh','Gianna','6981012022',"08:00:00","16:00:00");
		
INSERT INTO plan
VALUES	(1,'30-DAY STRENGTH','Xrhstos12',2),
		(2,'14-week Hypethrophy','Xrhstos12',1),
		(3,'Abs for summer','Nikh24',3),
        (4,'Loose the buns','Nikh24',3);


       
INSERT INTO part
VALUES	(1,'push day',1,2),
		(2,'pull day',1,2),
        (3,'leg day(you can skip it)',1,2),
        
		(4,'chest day',2,1),
        (5,'back day',2,1),
        (6,'shoulders day',2,1),
        (7,'lower body arm day',2,1),
        (8,'arm day',2,1),
        
        (9,'Everyday abs',3,1),
        
        (10,'abs day',4,1),
        (11,'Full body exhaustion',4,1),
        (12,'Cardio',4,1);
        
 INSERT INTO client_exercise
VALUES ('MDanos',1,4,10,40,NULL,"2017-04-01 08:00:00"),
  ('MDanos',1,4,10,80,NULL,"2017-05-01 08:00:00"),
  ('MDanos',1,4,10,120,NULL,"2017-05-21 08:00:00"),
        ('MDanos',1,4,10,150,NULL,"2017-06-01 08:00:00"),
        ('MDanos',1,4,10,150,NULL,"2017-07-21 08:00:00"),
        ('MDanos',1,4,10,150,NULL,"2017-08-21 08:00:00"),
        ('MDanos',1,4,10,90,NULL,"2017-10-21 08:00:00"),
		('MDanos',2,4,10,90,NULL,"2017-10-01 08:00:00"),
        ('MDanos',2,4,10,90,NULL,"2017-10-11 08:00:00");
INSERT INTO exercise_part
VALUES	(1,1,3,5,5,62.5,1),
		(9,1,3,5,5,62.5,1),
        (8,1,3,5,5,62.5,1),
        (10,1,3,5,5,62.5,1),
        (6,1,3,5,5,62.5,1),
        
        (4,2,3,5,5,62.5,1),
		(11,2,3,5,5,62.5,1),
        (12,2,3,5,5,62.5,1),
        (5,2,3,5,5,62.5,1),
        
		(2,3,3,5,5,62.5,1),
		(13,3,3,5,5,62.5,1),
        (3,3,3,10,5,62.5,1);