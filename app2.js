const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/pr5c');

    const iron = {
        Name: "salvados",
        FechaNacimiento: Date.now(),
        Peso: 600,
        Genero: "F",
        Poder: "Suerte",
        Misiones: 1,
        // Eliminados: 100
        Salvados: 20
    };

    let marEsquema;
    if(Object.hasOwn(iron, "Salvados")){
        marEsquema = marvelHeroeSchema();
    }else if(Object.hasOwn(iron, "Eliminados")){
        marEsquema = marvelVillanoSchema();
    }
    else{
        marEsquema = marvelSchema();
    };

    const Marvel = mongoose.model("marvel", marEsquema);
    
    // crearPersonaje(Marvel, iron);
    // buscar(Marvel, "Ironman", 60);
    // buscarPM(Marvel, "Ironman", 90);
    // buscarBando(Marvel);
    // buscarPoder(Marvel, "Suerte");

    // actualizar(Marvel, "63efa19a7f17f894b25223bc",{
    //     Name: 'Salvado 2',
    //     Genero: 'F',
    // });

    // Eliminar(Marvel, "63efa19a7f17f894b25223bc");

    // buscarVillano(Marvel, true);
    // buscarGenero(Marvel, 'M');

    buscarN(Marvel, 'Suerte');
}

const crearPersonaje = async(Marvel, object) => {
    const iron = new Marvel(object);
    await iron.save();
};

const marvelSchema = () => {
    return new mongoose.Schema({ 
    Name: String,
    FechaNacimiento: Date,
    Peso: Number,
    Genero: String,
    Poder: String,
    Misiones: Number,
});
};

const marvelHeroeSchema = () => {
    return new mongoose.Schema({
    Name: String,
    FechaNacimiento: Date,
    Peso: Number,
    Genero: String,
    Poder: String,
    Misiones: Number,
    Lado: String,
    Salvados: Number,
});
};

const marvelVillanoSchema = () => {
    return new mongoose.Schema({
    Name: String,
    FechaNacimiento: Date,
    Peso: Number,
    Genero: String,
    Poder: String,
    Misiones: Number,
    Lado: String,
    Eliminados: Number,
});
};

const buscarN = (Modelo, opcion1) => {
    const query = Modelo.find();
    query.setOptions({lean:true});
    query.collection(Modelo.collection);
    query
    .find({})
    .where("Poder").ne(opcion1)
    .exec((error, res) => {
        res.forEach((element) => {
            console.log(element);
        });
    })
}

const buscarPoder = (Modelo, poder) => {
    const query = Modelo.find();
    query.setOptions({lean:true});
    query.collection(Modelo.collection);
    query
    .find({Poder: poder})
    .exec((error, res) => {
        res.forEach((element) => {
            console.log(element);
        });
    })
}

const buscar = (Modelo, name, peso) => {
    const query = Modelo.find();
    query.setOptions({lean:true});
    query.collection(Modelo.collection);
    query
    .find({"Name":name})
    .where("Peso").gte(peso)
    .exec((error, res) => {
        res.forEach((element) => {
            console.log(element);
        });
    })
}

const buscarPM = (Modelo, name, peso) => {
    const query = Modelo.find();
    query.setOptions({lean:true});
    query.collection(Modelo.collection);
    query
    .find({"Name":name, "Peso":{$lt: peso}})
    .exec((error, res) => {
        res.forEach((element) => {
            console.log(element);
        });
    })
}

const buscarGenero = (Modelo, Genero) => {
    const query = Modelo.find();
    query.setOptions({lean:true});
    query.collection(Modelo.collection);
    query
    .find({Genero: Genero})
    .exec((error, res) => {
        res.forEach((element) => {
            console.log(element);
        });
    })
}

const buscarBando = (Modelo) => {
    const query = Modelo.find();
    query.setOptions({lean:true});
    query.collection(Modelo.collection);
    query
    .find({Eliminados: {$exists: false}})
    .exec((error, res) => {
        res.forEach((element) => {
            console.log(element);
        });
    })
}

// const buscarVillano = (Modelo, Eliminados) => {
//     const query = Modelo.find();
//     query.setOptions({lean:true});
//     query.collection(Modelo.collection);
//     query
//     .find()
//     .where("Eliminados").gt(Eliminados)
//     .exec((error, res) => {
//         res.forEach((element) => {
//             console.log(element);
//         });
//     })
// }




const actualizar = async(Modelo, id, object) =>{
    const res = await Modelo.findById(id);

    res.Name = object.Name ? object.Name : res.Name;
    res.FechaNacimiento = object.FechaNacimiento ? object.FechaNacimiento : res.FechaNacimiento;
    res.Peso = object.Peso ? object.Peso : res.Peso;
    res.Genero = object.Genero ? object.Genero : res.Genero;
    res.Poder = object.Poder ? object.Poder : res.Poder;
    res.Misiones = object.Misiones ? object.Misiones : res.Misiones;
    res.Lado = object.Lado ? object.Lado : res.Lado;
    res.Salvados = object.Salvados ? object.Salvados : res.Salvados;
    res.Eliminados = object.Eliminados ? object.Eliminados : res.Eliminados;

    res.save();
}

// const Eliminar = async(Modelo, id) => {
//     const res = await Modelo.findById(id);
//     res.delete();
// }