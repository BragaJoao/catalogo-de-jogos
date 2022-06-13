const routes = require("express").Router();
const CatalogoController = require("../controllers/CatalogoControllers");

routes.get("/", CatalogoController.getAll);
routes.get("/jogo/:id", CatalogoController.getById);
routes.get("/signup", CatalogoController.signup);
routes.post("/create", CatalogoController.create);
routes.get("/edit/:id", CatalogoController.editar1);
routes.post("/edit/:id", CatalogoController.editar);
routes.get("/delete/:id", CatalogoController.deletar);
routes.post("/delete/:id", CatalogoController.deletar1);

module.exports = routes;