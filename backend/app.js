const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
const port = 8080;
const app = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

const hashed = bcrypt.hashSync('secret', 10);
const users = [{ username: 'alan', password: hashed }];

app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({
          error: 'username & password required'
        });
    }
    if (users.find(u => u.username === username)) {
        return res.status(400).json({
          error: 'username already in use'
        });
    }
    const hashed = await bcrypt.hash(password, 10);
    users.push({ username, password: hashed });
    return res.json({ message: 'registered' });
});

// login route 
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(400).json({
      error: 'invalid credentials'
    });
  }

  const ok = await bcrypt.compare(password, user.password);

  if (!ok) {
    return res.status(400).json({
      error: 'invalid credentials'
    });
  }

  const token = jwt.sign(
    { username }, JWT_SECRET, { expiresIn: '1h' }
  );
  return res.json({ token });
});

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) {
    return res.status(401).json({
      error: 'no auth'
    });
  }
  const token = auth.split(' ')[1];
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (e) {
    return res.status(401).json({
      error: 'invalid token'
    });
  }
};

app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ hello: req.user.username });
});

app.listen(port, () => {
  console.log(`Server on ${port}`);
  // console.log(`http://localhost:${port}`);
});