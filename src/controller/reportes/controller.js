const Users=require('../../data/userdb.json');
const Autos=require('../../data/autosdb.json');

exports.getComprasPorUsuario=async(req,res) => {
    try{
        const reporte=Users.map(user => {
            const autosComprados=Autos.filter(auto => auto.usuarioId === user.id);
            return {
                usuarioId:user.id,
                nombre:user.nombre,
                email:user.email,
                cantidadAutosComprados:autosComprados.length
            };
        });
        res.json({
        reporte,
        "Links":{
            "usuarios":"/api/users",
            "autos":"/api/autos"
        }
    });
    }catch(error){
        console.error('Error en reporte de compras de usuarios: ',error);
        res.status(500).json({mensaje:"Error interno del servidor"});
    }
};