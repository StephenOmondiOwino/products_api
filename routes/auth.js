const router = require('express').Router();
const passport = require('passport');

// Login with GitHub
router.get('/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

// Callback
router.get('/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/'
  }),
  (req, res) => {
    res.redirect('/api-docs');
  }
);

// Logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

module.exports = router;