export const verify = (req, res) => {
  res.json({ authenticated: true, user: req.user });
}
