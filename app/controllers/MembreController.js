var MembreModel = require('../models/MembreModel');

var MembreController =
{
    liste:function(req,res)
    {
        MembreModel.find(function(err,membres)
        {
            if (err)
            {
                console.log(err);
                res.json({status:false, message:err.message} );
            }
            else
            {
                res.json({status:true,membres:membres});
            }
        });
    },

    get:function(req,res)
    {
        MembreModel.find({id:req.params.id},function(err,membre)
        {
            if (err)
            {
                console.log(err);
                res.json({status:false, message:"membre inexistant"} );
            }
            else
            {
                res.json({status:true,membre:membre});
            }
        });
    },

    ajout:function(req,res)
    {
        console.log(req.body)
        var membre = new MembreModel(req.body.membre);
        membre.validate()
            .then(() =>
            {
                return membre.save()
            })
            .then(()=>res.json({status:true, message:"membre ajouté"}))
            .catch((err) => res.json({status:false, message:"membre validation failed "+err.message}))
    },

    modification:function(req,res)
    {
        console.log(req.body)
        const id=req.body.membre.id;
        MembreModel.findOneAndUpdate({id:id},req.body.membre,function(err,membre)
        {
            if (err)
            {
                console.log(err);
                res.json({status:false, message:"membre non modifié"} );
            }
            else
            {
                res.json({status:true,membre:"membre modifié"});
            }
        });
    },


    suppression:function(req,res)
    {
        MembreModel.deleteOne({id:req.body.membre.id})
        .then(()=>res.json({status:true,membre:"membre supprimé"}))
        .catch((err)=>res.json({status:true,membre:"membre inexistant"}))
    }
   
}

module.exports=MembreController;
    
