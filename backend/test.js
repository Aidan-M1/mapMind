app.post('/api/register', async (req, res) => {
    const { username, password, confirmPassword } = req.body;

    db.get(
      "SELECT * FROM users WHERE username = ?",
      [username],
      (err, row) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Database error' });
        }
        if (row) {
          return res.status(400).json({
            error: 'username already in use'
          });
        }
      }
    );
    const hashed = await bcrypt.hash(password, 10);
    db.run(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, hashed],
      function(err) {
        if (err) {
          console.error(err);
          return res.status(500).json({
            error: 'Datasbase failed to register'
          });
        }
      }
    );

    req.session.user = {
      username: username
    }
    return res.json({ message: 'Registration successful' });
});