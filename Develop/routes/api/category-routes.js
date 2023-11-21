const router = require('express').Router();
const { Category, Product, ProductTag, Tag } = require('../../models');

// The `/api/categories` endpoint
// GET all categories
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll(
      {
        include:[
          {
            model: Product
          }
        ]
      }
    );
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  // find all categories
  // be sure to include its associated Products
});

  // find one category by its `id` value
  router.get('/:id', async (req, res) => {
    // find a single category by its `id`
    try {
      const categoryData = await Category.findOne(
        { where:{
          id: req.params.id
        },
        include:  [{
          model: Product
        },]
        }
      );
      if (!categoryData) {
        return res.status(404).json({message: 'no Category found for this id'})
      }
      res.status(200).json(categoryData)
    } catch(err) {
      res.status(500).json(err);
    }
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body)
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy(
      {
        where: {
          id: req.params.id
        }
      }
    );
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
