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
    req.session.user = req.user; 
    res.redirect('/api-docs');
  }
);

// Logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    req.session.destroy(); 
    res.redirect('/');
  });
});

module.exports = router;