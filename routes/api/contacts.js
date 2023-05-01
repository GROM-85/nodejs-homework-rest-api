const express = require('express')

const router = express.Router();

const ctrl = require('../../controllers/contacts');

const {validateBody,authenticate} = require("../../middlewares");

const {schemas} = require("../../models/contacts");

const {ctrlWrapper} = require("../../helpers");

router.get('/', authenticate, ctrlWrapper(ctrl.getAll));

router.get('/:id', authenticate,ctrlWrapper(ctrl.getById));

router.post('/', authenticate,validateBody(schemas.addSchema),ctrlWrapper(ctrl.addContact));

router.put('/:id',authenticate,validateBody(schemas.addSchema),ctrlWrapper(ctrl.updateById));

router.patch('/:id',authenticate,validateBody(schemas.updateFavoriteSchema),ctrlWrapper(ctrl.updateFavorite));

router.delete('/:id',authenticate, ctrlWrapper(ctrl.removeById));

module.exports = router;
