
const router = require('express').Router();
const passport = require('passport');
const Articles = require('../../models/Articles');

router.post('/', (req, res, next) => {
    const { body } = req;

    if (!body.title) {
        return res.status(422).json({
            errors: {
                title: 'is required',
            },
        });
    }

    if (!body.author) {
        return res.status(422).json({
            errors: {
                author: 'is required',
            },
        });
    }

    if (!body.body) {
        return res.status(422).json({
            errors: {
                body: 'is required',
            },
        });
    }

    const finalArticle = new Articles(body);
    return finalArticle.save()
        .then(() => res.json({ article: finalArticle.toJSON() }))
        .catch(next);
});

router.get('/', async (req, res, next) => {
    const response = await Articles.find();
    console.log(response)
    return res.json(response)
});

router.get('/:id', (req, res, next) => {

    return res.json({
        article: req.article.toJSON()
    });
});

router.patch('/:id', (req, res, next) => {
    const { body } = req;

    if (typeof body.title !== 'undefined') {
        req.article.title = body.title;
    }

    if (typeof body.author !== 'undefined') {
        req.article.author = body.author;
    }

    if (typeof body.body !== 'undefined') {
        req.article.body = body.body;
    }

    return req.article.save()
        .then(() => res.json({ article: req.article.toJSON() }))
        .catch(next);
});

router.delete('/:id', async (req, res) => {
    try {
      const post = await Articles.findById(req.params.id);
      
      await post.remove();
      res.json({ msg: 'Post removed' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });


  // CHRIS GOOGLE ROUTE
  router.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    }),
  );
  
  const clientUrl = process.env.NODE_ENV === 'production' ? process.env.CLIENT_URL_PROD : process.env.CLIENT_URL_DEV;
  
  router.get(
    '/auth/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/',
      session: false,
    }),
    (req, res) => {
      const token = req.user.generateJWT();
      res.cookie('x-auth-cookie', token);
      res.redirect(clientUrl);
    },
  );


  // CHRIS FACEBOOK ROUTE
  router.get(
    '/auth/facebook',
    passport.authenticate('facebook', {
      scope: ['public_profile', 'email'],
    }),
  );
  
  const facebookClientUrl = process.env.NODE_ENV === 'production' ? process.env.CLIENT_URL_PROD : process.env.CLIENT_URL_DEV;
  
  router.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook', {
      failureRedirect: '/',
      session: false,
    }),
    (req, res) => {
      // console.log(req.user);
      const token = req.user.generateJWT();
      res.cookie('x-auth-cookie', token);
      res.redirect(facebookClientUrl);
    },
  );





module.exports = router;