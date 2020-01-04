/*
2) write RESTful simple API with dummy data (also choose whatever way you see fit for this task,
it is up to your creativity and skills) and showcase how the front-end would be able to use
your solution

required packages:
npm install express
npm install joi
*/

const Joi = require ("joi");
const express = require ("express");
const app = express();
app.use(express.json());
app.use(express.static('html_files'));

const pets = [
  { id: 1, species: "cat", name: "fluffy"},
  { id: 2, species: "dog", name: "barky"},
  { id: 3, species: "cat", name: "kitty"}
];

app.get("/api/pets", (req, res) => {
  res.send(pets);
});

app.get("/api/pets/:id", (req, res) => {
  const pet = pets.find(c => c.id === parseInt(req.params.id));
  if (!pet) return res.status(404).send("invalid ID for a pet");
  res.send(pet);
});

app.post("/api/pets", (req, res) =>{

  const { error } = validatePet (req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const pet = {
    id: pets.length + 1,
    species: req.body.species,
    name: req.body.name
  };
  pets.push(pet);
  res.send(pet);
});

app.put("/api/pets/:id", (req, res) => {
  const pet = pets.find(c => c.id === parseInt(req.params.id));
  if (!pet) return res.status(404).send("Pet with this ID does not exist");

  const { error } = validatePet (req.body);
  if (error) return res.status(400).send(error.details[0].message);

  pet.species = req.body.species;
  pet.name = req.body.name;
  res.send(pet);

});

app.delete("/api/pets/:id", (req, res) => {
  const pet = pets.find(c => c.id === parseInt(req.params.id));
  if (!pet) return res.status(404).send("Pet with this ID does not exist");

  const index = pets.indexOf(pet);
  pets.splice (index, 1);

  res.send(pet);

});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening on port " + port));

function validatePet (pet) {
  const options = {
    name: Joi.string().min(3).required(),
    species: Joi.string().required()
  };
  return Joi.validate (pet, options);
}
