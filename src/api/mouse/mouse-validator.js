/* eslint-disable no-prototype-builtins */
import { body, param } from 'express-validator';
import expressValidation from '../../utils/express-utils.js';

import {
     errorAlphanumeric, errorNotEmpty, errorUUID,
} from '../../constants/constant-errors.js';
import { ValidatorError } from '../../utils/custom-errors.js';

export const isCorrectPropertyPV = (prop) => {
     const typeSchema = {
          modelName: null,
          brand: null,
          color: null,
          productPriceInUSD: null,

     };
     Object.keys(prop).forEach((key) => {
          if (!typeSchema.hasOwnProperty(key)) throw new ValidatorError(404, key, 'Property not a found');
     });
};
export const isCorrectCategoryV = (req, res, next) => {
     const { body: reqBody } = req;
     const typeSchema = {
          modelName: null,
          brand: null,
          color: null,
          productPriceInUSD: null,

     };
     Object.keys(reqBody).forEach((key) => {
          if (!typeSchema.hasOwnProperty(key)) next(new ValidatorError(404, key, 'Property not a found'));
     });
     next();
};
export const validateCreateMouseV = [
     body('brand').notEmpty().withMessage(errorNotEmpty('brand')).isAlphanumeric('en-US', { ignore: ' _-' })
          .withMessage(errorAlphanumeric),
     body('modelName').notEmpty().withMessage(errorNotEmpty('modelName')).isAlphanumeric('en-US', { ignore: ' -_' })
          .withMessage(errorAlphanumeric),
     body('color').notEmpty().withMessage(errorNotEmpty('color')).isAlphanumeric('en-US')
          .withMessage(errorAlphanumeric),
     body('productPriceInUSD').notEmpty().withMessage(errorNotEmpty('productPriceInUSD')).isInt({ min: 10 })
          .withMessage('Enter the correct amount ( "The amount must be at least $10" )'),
     expressValidation,
];

export const validateUpdateMouseV = [
     param('id').isMongoId().withMessage(errorUUID),
     body('brand').notEmpty().withMessage(errorNotEmpty('brand')).isAlphanumeric('en-US', { ignore: ' _-' })
          .withMessage(errorAlphanumeric)
          .optional(),
     body('modelName').notEmpty().withMessage(errorNotEmpty('modelName')).isAlphanumeric('en-US', { ignore: ' -_' })
          .withMessage(errorAlphanumeric)
          .optional(),
     body('color').notEmpty().withMessage(errorNotEmpty('color')).isAlphanumeric('en-US')
          .withMessage(errorAlphanumeric)
          .optional(),
     body('productPriceInUSD').notEmpty().withMessage(errorNotEmpty('productPriceInUSD')).isInt({ min: 10 })
          .withMessage('Enter the correct amount ( "The amount must be at least $10" )')
          .optional(),
     expressValidation,
];
export const validateIdMouseV = [param('id').isMongoId().withMessage(errorUUID), expressValidation];
