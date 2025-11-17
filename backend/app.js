const express = require('express');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const cors = require('cors');
const sqlite3 = require('sqlite3')
const { promisify } = require('util')

const port = 8080;
const originPort = 5173;
const app = express();

app.use(express.json());
app.use(cors({ 
  origin: `http://localhost:${originPort}`,
  credentials: true
}));

app.use(session({
    secret: 'gfg-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    },
    rolling: true,
}));

let db = new sqlite3.Database("./database.db" , (err) => {
    if(err)
    {
        console.log("Error opening database:" + err.message);
    }
    else
    {
        console.log("DataBase Connected");
    }
});

const dbGet = promisify(db.get).bind(db);
const dbRun = promisify(db.run).bind(db);

db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT,
  password TEXT
)`);

app.post('/api/register', async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  if (!username || !password || !confirmPassword) {
      return res.status(400).json({
        error: 'Username & password required'
      });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({
      error: 'Password must match confirmPassword'
    });
  }

  try {
    const row = await dbGet(
      "SELECT * FROM users WHERE username = ?",
      [username],
    );
    if (row) {
      return res.status(400).json({ 
        error: 'Username already in use'
      });
    }
    const hashed = await bcrypt.hash(password, 10)
    await dbRun(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, hashed],
    );
    req.session.user = { username: username }
    res.status(201).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Database error' });
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password ) {
    return res.status(400).json({
      error: 'username & password required'
    });
  } 

  try {
    const row = await dbGet(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );

    if (!row) {
      return res.status(400).json({
        error: 'Invalid Credentials'
      });
    }

    const ok = await bcrypt.compare(password, row.password);
    if (!ok) {
      return res.status(400).json({
        error: 'Invalid Credentials'
      });
    }

    req.session.user = { username: row.username }
    res.json({ message: 'Login successful' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

function authMiddleware(req, res, next) {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Not logged in' });
  }
  next();
};

app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ hello: req.session.user.username });
});

app.get('/api/check-session', (req, res) => {
  if (req.session.user) {
    return res.json({ loggedIn: true, user: req.session.user });
  }
  res.json({ loggedIn: false })
});

app.post('/api/logout', (req, res) => {
  req.session.destroy(err=>{
    if (err) {
      return res.status(500).send("Could not log out.");
    }
    res.clearCookie('connect.sid');
    return res.json({ success: true });
  })
});

app.listen(port, () => {
  console.log(`Server on http://localhost:${port}`);
});