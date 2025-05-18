import mongoose from 'mongoose';

const formularioSchema = new mongoose.Schema({
    index: {type: Number, unique: true},
    nomeCompleto: {type: String,required: true},
    email: {type: String,required: true},
    telefone: {type: String,required: true},
    mensagem:{type: String,required: true}
})

const contadorSchema = new mongoose.Schema({
    nome: {type: String, default: 'contador_index'},
    seq: {type: Number, default: -1}
})

formularioSchema.pre('save', function(next){
    const formulario = this;

    if(formulario.index !== undefined){ 
        return next(); // já tem index definido
    }

    Contador.findOneAndUpdate(
        { nome: 'contador_index' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true } // cria se não existir
    ).then((cont) => {
        formulario.index = cont.seq; // define o novo index
        next();
    }).catch((error) => {
        console.log('Error: ' + error);
        next(error);
    });
});

export default mongoose.model('Formulario', formularioSchema);
export const Contador = mongoose.model('Contador', contadorSchema);