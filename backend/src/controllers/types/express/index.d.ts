//Tengo que crear esto para poder agregar una propiedad a una request, tambien hay que crear una interfaz que extienda de Request y agregar ahi la propiedad, luego al middleware
//o controller en vez de definirle el tipo Request le defino la interfaz que cree.
//Ademas hay que agregar esto a la config de ts
//"compilerOptions": {
//    "typeRoots": ["./types"]
//}

declare namespace Express {
    interface Request {
        admin_username: string,
        username: string
    }
}