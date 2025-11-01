exports.getAllUsers = {
    href:"/api/users",
    title:"Obtener todos los usuarios",
    method:"GET"
};

exports.getUserById = {
    herf:"/api/usuers/:id",
    title:"Obtener un usuario por ID",
    method:"GET"
};

exports.createUser = {
    href:"/api/usuarios",
    title:"Crear un nuevo usuario",
    method:"POST"
};

exports.updateUser = {
    href:"/api/users/:id",
    title:"Actualizar un usuario existente",
    method:"PUT"
};

exports.deleteUser = {
    href:"/api/users/:id",
    title:"Eliminar un usuario",
    method:"DELETE"
};

//AUTOS

exports.getAllAutos = {
    href:"/api/autos",
    title:"Obtener todos los autos",
    method:"GET"
};

exports.getAutoById = {
    href:"/api/autos/:id",
    title:"Obtener auto por ID",
    method:"GET"
};

exports.createAuto = {
    href:"/api/autos",
    title:"Registrar un nuevo auto",
    method:"POST"
};

exports.updateAuto = {
    href:"/api/autos/:id",
    title:"Actualizar informacion de un auto",
    method:"PUT"
};

exports.deleteAuto = {
    href:"/api/autos/:id",
    title:"Eliminar un auto",
    method:"DELETE"
};

//RELACION ENTRE ENTIDADES
exports.getAutosByUser = {
    href:"/api/users/:usuarioId/autos",
    title:"Obtener todos los autos comprados por un usuario",
    method:"GET"
};

exports.getAutoByUser = {
    href:"/api/users/:usuarioId/autos/:autoId",
    title:"Obtener un auto especifico de un usuario",
    method:"GET"
};

exports.comprarAuto = {
    href:"/api/users/:usuarioId/compra/:autoId",
    title:"Registrar la compra de un auto por parte de un usuario",
    method:"POST"
};