const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const mysql_pool = mysql.createPool({
  connectionLimit : 100,
  user: "new_user",
  host: "%",
  password: "initial0",
  database: "bus_db",
});

app.get("/buses", (req, res) => {
    console.log('API CALL: /buses');
	var retvalSettingValue = "?";
	mysql_pool.getConnection(function(err, connection) {
		if (err) {
			connection.release();
	  		console.log(' Error getting mysql_pool connection: ' + err);
	  		throw err;
	  	}

  console.log(req.body);
  const travelfrom = req.body.travelfrom;
  const travelto = req.body.travelto;
  const traveldate = req.body.traveldate;

  connection.query("SELECT * FROM bus where travelfrom = ? and travelto = ? and traveldate = ?",
  [travelfrom, travelto, traveldate],
  (err2, result) => {
    if (err2) {
      console.log(err2);
    } else {
      res.send(result);
    }
    console.log(' mysql_pool.release()');
    connection.release();
  });
});
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const wage = req.body.wage;
  db.query(
    "UPDATE bus SET price = ? WHERE id = ?",
    [wage, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM bus WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log('Yey, your server is running on port ', PORT);
});