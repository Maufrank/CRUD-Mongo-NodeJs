const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/pr5c');



// const Unicornio = mongoose.model("mongoch", mongochSchema);
// const Unicornio = mongoose.model("mongoch", mongochLessSchema);

const unicornio = {
    Name: 'Profe 3',
    FechaNacimiento: Date.now(),
    Peso: 50,
    Genero: 'F',
    ComidaFavorita: ["Chilaquiles"],
    Vampiros: 100,
};
let unicornioEsquema;
if(Object.hasOwn(unicornio, "Vampiros")){
    unicornioEsquema = mongochSchema();
}else{
    unicornioEsquema = mongochLessSchema();
};

    const Unicornio = mongoose.model("mongoch", unicornioEsquema);
    crearUnicornio(Unicornio, unicornio);
    

    // Actualizar(Unicornio, "63ee3a33902ec56c9d073fef",{
    //     Name: "Arduino",
    //     Genero: "M",
    // });

    // buscar(Unicornio, 50, "Chilaquiles");

    // Eliminar(Unicornio, "63ee3a33902ec56c9d073fef");


}

const crearUnicornio = async(Unicornio, object) => {
    const kim = new Unicornio(object);
    await kim.save();
};



const mongochLessSchema = () => {
    return new mongoose.Schema({
    Name: String,
    FechaNacimiento: Date,
    Peso: Number,
    ComidaFavorita: Array,
    Genero: String,
});
};

const mongochSchema = () => {
    return new mongoose.Schema({
    Name: String,
    FechaNacimiento: Date,
    Peso: Number,
    Genero: String,
    ComidaFavorita: Array,
    Vampiros: Number,
});
};

const buscar = (Modelo, peso, comida) => {
    const query = Modelo.find();
    query.setOptions({lean:true});
    query.collection(Modelo.collection);
    query
    .find({"Comida favorita":comida})
    .where("Peso").gte(peso)
    .exec((error, res) => {
        res.forEach((element) => {
            console.log(element);
        });
    })
}


const Actualizar = async(Modelo, id, object) => {
    const res = await Modelo.findById(id);

    res.Name = object.Name ? object.Name : res.Name;
    res.fechaNaciemiento = object.fechaNaciemiento
        ? object.fechaNaciemiento : res.fechaNaciemiento;
    res.comidaFavorita = object.comidaFavorita
        ? object.comidaFavorita : res.comidaFavorita;
    res.Genero = object.Genero ? object.Genero : res.Genero;
    res.peso = object.peso ? object.peso : res.peso;

    res.Vampiros = object.Vampiros ? object.Vampiros : res.Vampiros;

    res.save();
};

// const Eliminar = async(Modelo, id) => {
//     const res = await Modelo.findById(id);
//     res.delete();
// }