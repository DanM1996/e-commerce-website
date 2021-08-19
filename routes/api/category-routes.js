const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      if (err) {
        console.log(err);
        res.status(500).json(err);
      }
    })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'A category with this id does not exist' });
        return;
      }
      res.json(dbCategoryData)
    })
    .catch(err => {
      if (err) {
        console.log(err);
        res.status(500)
      }
    })
});

router.post('/', (req, res) => {
  Category.create({
    id: req.body.id,
    category_name: req.body.category_name
  })
    .then(dbCategoryData => res.json(dbCategoryData))
});

router.put('/:id', (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'No categoy with this id exists' })
        return;
      }
      res.json(dbCategoryData)
    })
    .catch(err => {
      if (err) {
        console.log(err);
        res.status(500).json(err);
      }
    })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'No categoy with this id exists' })
        return;
      }
      res.json(dbCategoryData)
    })
    .catch(err => {
      if (err) {
        console.log(err);
        res.status(500).json(err)
      }
    })
});

module.exports = router;
