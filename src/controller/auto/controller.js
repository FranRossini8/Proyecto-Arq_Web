const Autos = require('../../data/autosdb.json');
const Users = require('../../data/userdb.json');
const links = require('../../links');

exports.getAll = async(req,res) => {
    try{
        const resAutos={
            Autos,
            Links:{
                self:links.getAllAutos,
                create:links.createAuto
            }
        };
        res.json(resAutos);
    }catch(error){
        console.error('Error al obtenes los autos',error);
        res.status(500).json({mensaje:'Error interno del servidor'});
    }
};

exports.getOne=async(req,res) => {
    try{
        const autoId=parseInt(req.params.id);
        const auto = Autos.find(a => a.id === autoId);
        if(auto){
            res.json({
                auto,
                Links:{
                    self:links.getAutoById,
                    comprar:links.comprarAuto
                }
            });
        }else{
            res.status(404).json({error:'Auto no encontrado'});
        }
    }catch(error){
        console.error('Error en getOne autos: ',error);
        res.status(500).json({mensaje:'Error interno del servidor'});
    }
};

exports.create=async(req,res) => {
    try{
        const newAuto=req.body;
        const highestId=Autos.reduce((maxId,a) => Math.max(maxId,a.id),0);
        const newId=highestId+1;

        const autoToAdd = {
            id:newId,
            marca:newAuto.marca,
            modelo:newAuto.modelo,
            precio:newAuto.precio,
            usuarioId:newAuto.usuarioId !== undefined ? newAuto.usuarioId : null
        };
        Autos.push(autoToAdd);

        const resCreate ={
            mensaje:'Auto creado',
            auto:autoToAdd,
            Links: {
                self:links.getAutoById,
                all:links.getAllAutos
            }
        };
        res.status(201).json(resCreate);
    }catch(error){
        console.error('Error al crear auto: ',error);
        res.status(500).json({error:'Error interno del servidor'});
    }
};

exports.update=async(req,res) => {
    try{
        const autoId=parseInt(req.params.id);
        const index=Autos.findIndex(a=>a.id === autoId);
        if(index!==-1){
            Autos[index] = {...Autos[index], ...req.body, id:Autos[index].id};
            res.json({
                mensaje:'Auto actualizdo',
                auto: Autos[index],
                Links:{
                    self:links.getAutoById,
                    all:links.getAllAutos
                }
            });
        }else{
            res.status(404).json({error:'Auto no encontrado'});
        }
    }catch(error){
        console.error('Error al actualziar auto: ',error);
        res.status(500).json({mensaje:'Error interno del servidor'});
    }
};

exports.delete=async(req,res) => {
    try{
        const autoId=parseInt(req.params.id);
        const index = Autos.findIndex(a => a.id === autoId);

        if(index !== -1){
            const eliminado= Autos.splice(index,1);
            res.json({
                mensaje:"Auto eliminado",
                eliminado,
                Links:{
                    all:links.getAllAutos
                }
            });
        }else{
            res.status(404).json({error:'Auto no encontrado'});
        }
    }catch(error){
        console.error('Error al eliminar auto: ',error);
        res.status(500).json({mensaje:'Error interno del servidor'});
    }
};

exports.comprarAuto=async(req,res) => {
    try{
        const usuarioId = parseInt(req.params.usuarioId) || parseInt(req.body.userId) || null;
        const autoId = parseInt(req.params.autoId) || parseInt(req.body.autoId) || null;

        if(!usuarioId || !autoId){
            return res.status(400).json({error:'Falta usuarioId o autoId'});
        }

        const auto=Autos.find(a => a.id === autoId);
        if(!auto){
            return res.status(404).json({error:'Auto no encontrado'});
        }

        const user = Users.find(u => u.id === usuarioId);
        if(!user){
            return res.status(404).json({error:'Usuario no encontrado'});
        }

        if(auto.usuarioId !==null && auto.usuarioId !== undefined){
            return res.status(400).json({error:'El auto ya esta vendido/asignado'});
        }

        auto.usuarioId=usuarioId;

        res.json({
            mensaje:`Usuario ${user.nombre || user.user || user.email || usuarioId} compró el auto ${auto.marca} ${auto.modelo}`,
            auto,
            Links:{
                usuario:links.getUserById,
                autoUsuario:links.getAutoByUser,
                allAutos:links.getAllAutos
            }
        });
    }catch(error){
        console.error('Error en comprarAuto: ',error);
        res.status(500),json({mensaje:'Error interno del servidor'});
    }
};