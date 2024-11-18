const router = require("express").Router();
const { prisma } = require("../db");

// movie list page
router.get("/movies/list", async (req, res) => {
  const offset = parseInt(req.query.offset);
  const count = await prisma.movie.count(); // utilizing prisma to hold the amount of data 
  const movies = await prisma.movie.findMany({   // implementing pagination using prisma
    take: 12,
    skip: offset,
  });

  return res.json({ movies, count });
});

router.get("/movie/:id", async (req, res) => {
  const id = req.params.id;
  
  const movie = await prisma.movie.findUnique({  // using prisma to find movie by id
    where: {
      id: parseInt(id),
    },
  });
  return res.send(movie);
});

module.exports = router;
