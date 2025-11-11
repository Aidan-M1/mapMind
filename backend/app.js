const express = require('express');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const cors = require('cors');

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
    saveUninitialized: true
}));

const temp = bcrypt.hashSync('secret', 10);
const users = [{ username: 'alan', password: temp }];

app.post('/api/register', async (req, res) => {
    const { username, password, confirmPassword } = req.body;
    if (!username || !password || !confirmPassword) {
        return res.status(400).json({
          error: 'username & password required'
        });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        error: 'password must match confirmPassword'
      });
    }
    if (users.find(u => u.username === username)) {
        return res.status(400).json({
          error: 'username already in use'
        });
    }
    const hashed = await bcrypt.hash(password, 10);
    users.push({ username, password: hashed });

    req.session.user = {
      username: username
    }
    return res.json({ message: 'Registration successful' });
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(400).json({
      error: 'Invalid credentials'
    });
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).json({
      error: 'Invalid credentials'
    });
  }

  req.session.user = {
    username: user.username
  }
  res.json({ message: 'Login successful' });
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

app.listen(port, () => {
  console.log(`Server on http://localhost:${port}`);
});