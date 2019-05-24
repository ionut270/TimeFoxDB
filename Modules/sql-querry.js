var oracledb = require("oracledb");
var config = require("./dbconfig");
const template = require("./template.js");
const readline = require("readline").createInterface({
	input: process.stdin,
	output: process.stdout,
});

oracledb.autoCommit = true;

String.prototype.replaceAt = function(index, replacement) {
	return this.substr(0, index) + replacement + this.substr(index + 1, this.length + replacement.length);
};

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}
function getRandomIntPos(max) {
	return Math.floor(Math.random() * Math.floor(max)) + 1;
}
function genYear() {
	return getRandomInt(20) + 1980;
}

function outer_querry(input, err, connection, index) {
	connection
		.execute(input)
		.then(response => {
			console.log(index, "=", response);
		})
		.catch(reject => {
			loading = false;
			input = input.replaceAt(reject.offset, "\x1b[31m" + input[reject.offset] + "\x1b[0m");
			console.log("\n", input, "\n", reject);
		});
}

function input_sql_querry(connection, err) {
	var input;
	readline.question(`SQL > `, input => {
		connection
			.execute(input)
			.then(response => {
				console.log(response);
				input_sql_querry(connection, err);
			})
			.catch(reject => {
				loading = false;
				console.log("ERROR! ", reject);
				input_sql_querry(connection, err);
			});
	});
}

function sql_querry(connection, err, input) {
	if (input === "exit") {
		process.stdout.write("\033c");
	} else {
		return connection
			.execute(input)
			.then(response => {
				console.log(response , input);
				return response;
			})
			.catch(reject => {
				// for(i=0;i<reject.offset;i++){
				// 	console.log("i="+i+'='+input[i]+'\n');
				// }
				input = input.replaceAt(reject.offset, "\x1b[31m" + input[reject.offset] + "\x1b[0m");
				//input[reject.offset] = "\x1b[31m" + input[reject.offset] + "\x1b[0m";
				console.log("ERROR AT " + reject.offset + "! \n", input, "\n", reject);
				return reject;
			});
	}
}

function create_tables(connection, err) {
	console.log("Creatin tables!");
	var que = new Promise((res, rej) => {
		res(
			sql_querry(
				connection,
				err,
				"CREATE TABLE USERS(ID INTEGER NOT NULL,SESSION_ID VARCHAR2(50),NAME VARCHAR2(50) NOT NULL,SURNAME VARCHAR2(50) NOT NULL,DATA_NASTERE VARCHAR2(10),EMAIL VARCHAR2(50) NOT NULL,USER_PASSWORD VARCHAR2(50) NOT NULL,USER_TYPE VARCHAR2(10),PRIMARY KEY(ID))",
			),
		);
	})

		.then(resp => {
			sql_querry(
				connection,
				err,
				"CREATE TABLE STUDENTI(NR_MATRICOL INTEGER NOT NULL,NUME VARCHAR2(50), PRENUME VARCHAR2(50), PRIMARY KEY (NR_MATRICOL) )",
			);
			/**Studenti:
			Nr_matricol
			Nume
			Prenume */
		})
		.then(resp => {
			sql_querry(
				connection,
				err,
				"CREATE TABLE GRUPA(ID_GRUPA INTEGER NOT NULL, NUME_GRUPA VARCHAR2(50) ,PRIMARY KEY(ID_GRUPA))",
			);
			/**
			 * Grupa:
				Id_grupa
				Nume_grupa
			 */
		})

		.then(resp => {
			sql_querry(
				connection,
				err,
				"CREATE TABLE PROGRAM( ID_ORA INTEGER NOT NULL , ZIUA VARCHAR2(10) , INCEPE_LA INTEGER , SE_TERMINA_LA INTEGER ,PRIMARY KEY(ID_ORA))",
			);
			/**Program:
			Id_ora
			Ziua
			Incepe_la
			Se_termina_la */
		})

		.then(resp => {
			sql_querry(
				connection,
				err,
				"CREATE TABLE SALI(ID_SALA INTEGER NOT NULL,NR_LOCURI INTEGER, LOCATIA VARCHAR2(20),PRIMARY KEY(ID_SALA))",
			);
			/**Sali:
				Id_sala
				Nr_locuri
				Locatia */
		})
		.then(resp => {
			sql_querry(
				connection,
				err,
				"CREATE TABLE MATERIE(ID_MATERIE INTEGER NOT NULL, TYPE VARCHAR2(50) , TITLE VARCHAR2(50),PRIMARY KEY(ID_MATERIE))",
			);
			/**Materie:
			d_materie
			Type
			Titlu*/
		})
		.then(resp => {
			sql_querry(
				connection,
				err,
				"CREATE TABLE PROF(ID_PROF INTEGER NOT NULL,NUME VARCHAR2(50), PRENUME VARCHAR(50) ,PRIMARY KEY(ID_PROF))",
			);
			/**Prof:
			Id_prof
			Nume
			Prenume*/
		})

		.then(resp => {
			sql_querry(
				connection,
				err,
				"CREATE TABLE RESTANTIERI(NR_MATRICOL INTEGER, ID_MATERIE INTEGER, FOREIGN KEY (NR_MATRICOL) REFERENCES STUDENTI (NR_MATRICOL), FOREIGN KEY (ID_MATERIE) REFERENCES MATERIE (ID_MATERIE) )",
			);
			/**Restantieri:
			Nr_matricol
			Id_materie*/
		})
		.then(resp => {
			sql_querry(
				connection,
				err,
				"CREATE TABLE STUDENTI_GRUPA(NR_MATRICOL INTEGER, ID_GRUPA INTEGER, FOREIGN KEY (NR_MATRICOL) REFERENCES STUDENTI (NR_MATRICOL), FOREIGN KEY (ID_GRUPA) REFERENCES GRUPA (ID_GRUPA) )",
			);
			/**Studenti_grupa:
			Id_grupa
			Nr_matricol*/
		})
		.then(resp => {
			sql_querry(
				connection,
				err,
				"CREATE TABLE MATERIE_PROF(ID_PROF INTEGER, ID_MATERIE INTEGER, FOREIGN KEY (ID_PROF) REFERENCES PROF(ID_PROF), FOREIGN KEY (ID_MATERIE) REFERENCES MATERIE (ID_MATERIE) )",
			);
			/**Materie_Prof
			Id_materie
			Id_prof*/
		})

		.then(resp => {
			sql_querry(
				connection,
				err,
				"CREATE TABLE ORAR(ID_UNIC_ORAR INTEGER, ID_GRUPA INTEGER, ID_MATERIE INTEGER, ID_ORA INTEGER, ID_SALA INTEGER, ID_PROF INTEGER,FOREIGN KEY (ID_GRUPA) REFERENCES GRUPA (ID_GRUPA),FOREIGN KEY (ID_MATERIE) REFERENCES MATERIE (ID_MATERIE),FOREIGN KEY (ID_ORA) REFERENCES PROGRAM (ID_ORA),FOREIGN KEY (ID_SALA) REFERENCES SALI (ID_SALA),FOREIGN KEY (ID_PROF) REFERENCES PROF (ID_PROF), PRIMARY KEY (ID_UNIC_ORAR) )",
			);
			/**Orar:
			Id_unic_orar
			Id_grupa
			Id_materie
			Id_ora
			Id_sala
			Id_prof*/
		})

		.then(resp => {
			sql_querry(
				connection,
				err,
				"CREATE TABLE ORAR_P(ID_UNIC_ORAR_P INTEGER, NR_MATRICOL INTEGER, ID_UNIC_ORAR INTEGER, FOREIGN KEY (NR_MATRICOL) REFERENCES STUDENTI (NR_MATRICOL), FOREIGN KEY (ID_UNIC_ORAR) REFERENCES ORAR (ID_UNIC_ORAR) )",
			);
			/**Orar_p:
			Id_unic_orar_p
			Nr_matricol
			Id_unic_orar*/
		});
}

function start(obj) {
	console.log("SQL MODULE LAUNCHED!");
	oracledb.getConnection(config, function(err, connection) {
		console.log("Connected!");
		if (obj.use_cmd_input) {
			console.log("Input enabled!");
			input_sql_querry(connection, err);
		} else {
			console.log("Input disabled!");
			create_tables(connection, err);
		}
	});
}

function sleep(ms) {
	return new Promise(resolve => {
		setTimeout(resolve, ms);
	});
}

function populate(size) {
	oracledb.getConnection(config, async function(err, connection) {
		//cream materiile prima data ...
		for (let j = 0; j < template.courses.length; j++) {
			question = "INSERT INTO MATERIE VALUES(";
			question += j;
			question += ",'Seminar'";
			question += ",'" + template.courses[j];
			question += "')";
			//console.log(question);
			sql_querry(connection, err, question).then(res => {
				if (j === template.courses.length - 1) {
					var index = 0;
					for (m = 0; m < 7; m++) {
						for (n = 0; n < 12; n += 2) {
							var incepe_la = 8 + n;
							var se_termina_la = incepe_la + 2;
							question = "INSERT INTO PROGRAM VALUES(";
							question += index;
							question += ",'" + template.day[m];
							question += "'," + incepe_la;
							question += "," + se_termina_la + ")";
							//console.log(question);
							sql_querry(connection, err, question);
							index++;
						}
					}
					populate_phase_2(size, err, connection);
				}
			});
		}
	});
}

function populate_phase_2(size, err, connection) {
	var students = 0;
	var profesori = 0; // if 20 000 genereaza numai studenti
	var index_grupa = 0; //max 769
	var populare_grupa = 0; // max 50
	var index_litera = 0; // max 26 incepand de la 1 deci 25
	var id_grupa = 0;
	// 5 cursuri si 6 seminarii
	//33 333 grupe :/
	//pai incep pe rand sa bag cate un student intro grupa
	for (var i = 2000000; i < size+2000000; i++) {
		var name = template.names[getRandomInt(template.names.length)];
		var surname = template.surnames[getRandomInt(template.surnames.length)];
		var email = surname.toLowerCase() + "." + name.toLowerCase() + i + "@info.uaic.ro";
		var year = genYear();
		//console.log(i);

		var question = "INSERT INTO USERS VALUES(";
		question += i;
		question += ",'session'";
		question += ",'" + name + "'";
		question += ",'" + surname + "'";
		question += ",'" + getRandomInt(30) + "." + getRandomInt(30) + "." + year + "'";
		question += ",'" + email + "'";
		question += ",'12345'";
		question += ",'" + "Student" + "')";
		sql_querry(connection, err, question).then(res => {
			var matricol = i + year + getRandomInt(30);
			question = "INSERT INTO STUDENTI VALUES(";
			question += matricol;
			question += ",'" + name + "'";
			question += ",'" + surname + "')";
			sql_querry(connection, err, question).then(res => {
				if (populare_grupa === 50 || i <= 10) {
					populare_grupa = 0;
					if (index_grupa === 769) {
						index_grupa = 0;
					}
					if (index_litera === 26) {
						index_litera = 0;
						index_grupa++;
					}
					id_grupa = i + getRandomInt(30);
					question = "INSERT INTO GRUPA VALUES(";
					question += id_grupa;
					question += ",'" + template.chars[index_litera] + index_grupa + "')";
					index_litera++;
					sql_querry(connection, err, question) // am creat o grupa
						.then(res => {
							let idSala = i + getRandomInt(10000);
							question = "INSERT INTO SALI VALUES(";
							question += idSala;
							question += "," + getRandomInt(200);
							question += ",'" + template.chars[getRandomInt(template.chars.length)] + getRandomInt(999);
							question += "')";
							sql_querry(connection, err, question).then(res => {
								var name2 = template.names[getRandomInt(template.names.length)];
								var surname2 = template.surnames[getRandomInt(template.surnames.length)];
								var email2 = surname.toLowerCase() + "." + name.toLowerCase() + i + "@info.uaic.ro";
								var userTypes2 = template.userType[getRandomInt(template.userType.length)];
								var yea2r = genYear();
								var question = "INSERT INTO USERS VALUES(";
								question += i + getRandomInt(10000) + idSala + id_grupa;
								question += ",'session'";
								question += ",'" + name2 + "'";
								question += ",'" + surname2 + "'";
								question += ",'" + getRandomInt(30) + "." + getRandomInt(30) + "." + yea2r + "'";
								question += ",'" + email2 + "'";
								question += ",'12345'";
								question += ",'" + "Profesor" + "')";
								sql_querry(connection, err, question).then(res => {
									var id_prof = i + year + getRandomInt(10000);
									question = "INSERT INTO PROF VALUES(";
									question += id_prof;
									question += ",'" + name2;
									question += "','" + surname2;
									question += "')";
									sql_querry(connection, err, question).then(res => {
										question = "INSERT INTO ORAR VALUES(";
										question += i + year + getRandomInt(100000);
										question += "," + id_grupa;
										question += "," + getRandomInt(template.courses.length);
										question += "," + getRandomInt(45);
										question += "," + idSala;
										question += "," + id_prof;
										question += ")";
										sql_querry(connection, err, question);
									});
								});
							});
						});
				} else {
					//inseram in grupa un student
					question = "INSERT INTO STUDENTI_GRUPA VALUES(";
					question += matricol + "," + id_grupa + ")";
					sql_querry(connection, err, question);
					populare_grupa++;
				}
			});
		});
	}
}

module.exports = {
	start: start,
	ask: outer_querry,
	populate: populate,
};
