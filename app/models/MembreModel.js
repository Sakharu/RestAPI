let mongoose=require('mongoose');
mongoose.Promise=global.Promise;
let Schema = mongoose.Schema;
let membreSchema = new Schema({
	id: {
		type:Number,
		required:true,
		unique:true
	},
	annee: {
		type:Number,
		required:true
	},
	prenom: {
		type:String,
		required:true,
		uppercase:true
	},
	categorie: {
		type:String,
		enum:["junior","senior"]
	},
	sexe: {
		type:String,
		enum:["Hommes","Femmes"]
	},
	cnu : {type:String},
	discipline:{type:String},
	corps:{type:String},
	academie:{
		code_academie:{type:Number,required:true},
		nom:{type:String, required:true}
	},
	region:{
		code_region:{type:Number},
		nom:{type:String}
	},	
	etablissement:{type:String}
});



var MembreModel = mongoose.model("membre", membreSchema);

module.exports=MembreModel;