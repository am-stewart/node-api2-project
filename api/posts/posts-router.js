// implement your posts router here
const Post = require('./posts-model');

const router = require('express').Router();

///posts endpoints
router.get('/', (req, res) => {
  Post.find(req.query)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: 'The posts information could not be retrieved' });
    });
});

router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'The post with the specified ID does not exist' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: 'The post information could not be retrieved' });
    });
});

router.post('/', (req, res) => {
  const { title, contents } = req.body
  if(!title || !contents) {
    res.status(400).json({ message: 'Please provide title and contents for the post' })
  } else {
      Post.insert({ title, contents })
      .then(({ id }) => {
        return Post.findById(id)
      })
      .then(post => {
        res.status(201).json(post)
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ message: 'There was an error while saving the post to the database'})
      })
  }
})

module.exports = router;