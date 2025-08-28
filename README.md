# Proyecto Aquitectura Web 
  Rossini Juan Francisco 
  
  Universidad de Palermo

## Cotenido proyecto
- Mi idea consiste en una pagina web para gestionar venta de vehiculos
    - La pagina contendrá todo el CRUD para las entidades Usuario y Auto
    - Se expondran los endpoints para dar de alta, baja y modificar los usuarios, asi como tambien, habrá un endpoint "Venta" o "Compra" para que el usuario compre vehiculos
    - Tambien pienso en exponer 2 endpoints en relación a los autos:
      - Uno para que los usuarios busquen todos los autos que compraron
        - `GET /usuarios/{usuarioId}/autos` -> Para obtener todos los autos de un usuario  
      - Otro para que los usuarios puedan buscar un auto en especifico por ID
        - `GET /usuarios/{usuarioId}/{autoId}` -> Para obtener un auto en especifico de un usuario
       
