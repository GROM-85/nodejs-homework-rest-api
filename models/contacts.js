const {Schema, model} = require('mongoose');
const Joi = require('joi');

const mongoosePaginate = require('mongoose-paginate-v2');

const {handleSaveErrors} = require('../helpers');

const emailRegExp = /^[A-Za-z0-9_!#$%&'*+=?`{|}~^.-]+@[A-Za-z0-9.-]+$/

const contactSchema = new Schema({
  name:{
    type:String,
    required: true,
  },
  email:{
    type:String,
    match:emailRegExp,
    unique:true,
    required: true,
  },
  phone:{
    type:String,
    required: true,
  },
  favorite:{
    type:Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
}

},{versionKey:false,timestamps:true});

contactSchema.post('save',handleSaveErrors);
contactSchema.plugin(mongoosePaginate);

const addSchema = Joi.object({
  name:Joi.string().required(),
  email:Joi.string().pattern(emailRegExp).required(),
  phone:Joi.string().required(),
  favorite:Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};

const Contact = model('contact',contactSchema);

module.exports = {
  Contact,
  schemas,
}


