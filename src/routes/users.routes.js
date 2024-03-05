const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upolad");
const UsersController = require("../controllers/UsersController");
const UserAvatarController = require("../controllers/UserAvatarController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const userRoutes = Router();
const upload = multer(uploadConfig.MULTER);

// function middleware(request, response, next) {
//   console.log(`Voce passou pelo midleware`);

//   if (!request.body.isAdmin) {
//     return response.json({ message: "user unanthorized" });
//   }

//   next();
// }

const userController = new UsersController();
const userAvatarController = new UserAvatarController();
// id eh interpretado como parametro, pois ele vem apos o caractere ':'
// query params sao opcionais, mas os route params sao obrigatorios
// app.get("/message/:id/:user/:ip", (request, response) => {
//   const { id, user, ip } = request.params;

//   response.send(`Response working.
//   Message id: ${id}
//   User: ${user}
//   Client IP: ${ip}`);
// });

// O metodo POST envia as informacoes por meio do corpo da requisicao. Alem disso, o metodo POST eh muito utilizado principalmente quando se deve cadastrar informacoes
userRoutes.post("/", userController.create);
userRoutes.put("/", ensureAuthenticated, userController.update);
userRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  userAvatarController.update
);

module.exports = userRoutes;
