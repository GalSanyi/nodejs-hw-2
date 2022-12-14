const express = require('express')
const contacts = require('../../models/contacts');
const {createError} = require('../../helpers');
const router = express.Router()
const Joi = require('joi');
const contactSchema = Joi.object({
  name:Joi.string().required(),
  email:Joi.string().required(),
  phone:Joi.string().required(),
})

router.get('/', async (req, res, next) => {
 try {
  const result = await contacts.listContacts();
  res.json(result);
 } catch (error) {
next(error);
 }
})

router.get('/:contactId', async (req, res, next) => {
  try {
   const {id} = req.params;
   const result = await contacts.getContactById(id);
   if(!result){
  
  throw createError(404)
   }
    res.json(result);
  } catch (error) {
  next(error);
  }
})



router.post('/', async (req, res, next) => {
  try {
    const {error} = contactSchema.validate(req.body);
    if(error){
      throw createError(400, error.message);
    }
 const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
})


router.put('/:contactId', async (req, res, next) => {
 try {
  const {error} = contactSchema.validate(req.body);
  if(error){
    throw createError(400, error.message);
  }
  const {id} = req.params;
  const result = await contacts.updateContact(id, req.body);
  if(!result){
    throw createError(404);
  }
  res.json(result);
 } catch (error) {
  next(error);
 }
})

router.delete('/:contactId', async (req, res, next) => {
 try {
  const {id} = req.params;
  const result = await contacts.removeContact(id);
  if(!result){
    throw createError(404);
  }
  res.json({ message: 'Contact deleted' })
 } catch (error) {
  next(error);
 }
})


module.exports = router
