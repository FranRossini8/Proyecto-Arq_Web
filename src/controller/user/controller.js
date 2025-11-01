const Users = require('../../data/userdb.json');
const Autos = require('../../data/autosdb.json');
const links = require('../../links');
const { json } = require('express');

exports.getAll = async(req,res) =>{
    try{
        const resUsers={
            Users,
            "Links":{
                "self":links.Users,
                "create":links.CrearUsuario
            }
        };
        res.json(resUsers);
    }catch(error){
        console.log('Error al obtener los usuarios: ',error);
        res.status(500).json({mensaje:'Error interno del servidor'});
    }
};

exports.getOne = async(req,res) => {
    try{
        const userId=parseInt(req.params.id);
        const user=Users.find(u => u.id === userId);
        if(user){
            res.json({
                user,
                "Links":{
                    "comprarAuto":links.comprarAuto
                }
            });
        }else{
            res.status(404).json({error:'Usuario no encontrado'});
        }
    }catch(error){
        res.status(500).json({mensaje:'Error interno del servidor'});
    }
};

exports.create = async(req,res) => {
    try{
        const newUser=req.body;
        const highestId=Users.reduce((maxId,user)=> Math.max(maxId,user.id),0);
        const newId=highestId+1;

        const userToAdd={
            id:newId,
            user:newUser.user,
            pass:newUser.pass
        };

        Users.push(userToAdd);
        const resCreate={
            mensaje:"Usuario creado",
            usuario:userToAdd,
            "Links":{
                "login":links.login
            }
        };
        res.status(201).json(resCreate);
    }catch(error){
        res.status(500).json({error:'Error interno del servidor'});
    }
};

exports.update=async(req,res) =>{
    try{
        const userId=parseInt(req.params.id);
        const index=Users.findIndex(u=>u.id === userId);
        
        if(index !== -1){
            Users[index]={...Users[index], ...req.body};
            res.json({
                mensaje:"Usuario actualizado",
                usuario:Users[index]
            });
        }else{
            res.status(404).json({error:'Usuario no enxontrado'});
        }
    }catch(error){
        res.status(500).json({mensaje:'Error interno del servidor'});
    }
};

exports.delete=async(req,res) => {
    try{
        const userId=parseInt(req.params.id); 
        const index=Users.findIndex(u=>u.id === userId);

        if(index !== -1){
            const eliminado = Users.splice(index,1);
            res.json({mensaje:'Usuario eliminado',eliminado});
        }else{
            res.status(404).json({error:'Usuario no encontrado'});
        }
    }catch(error){
        res.status(500).json({mensaje:'Error interno del servidor'});
    }
};

exports.comprarAuto = async(req,res) => {
    try{
        const {userId,autoId}=req.body;

        const user=Users.find(u=> u.id === userId);
        const auto=Autos.find(a=> a.id === autoId);
        
        if(!user) return res.status(404).json({error:'Usuario no encontrado'});
        if(!auto) return res.status(404).json({error:'Auto no encontrado'});
        if(auto.vendido) return res.status(400).json({error:'El auto ya esta vendido'});
        
        auto.vendido=true;
        auto.comprador=user.user;

        res.json({
            mensaje:`El usuario ${user.user} compro el auto ${auto.marca} ${auto.modelo}`,
            auto,
            "Links":{
                "autos":links.Autos,
                "usuarios":links.Users
            }
        });
    }catch(error){
        res.status(500).json({mensaje:'Error interno del servidor'});
    }
};