/* eslint-disable no-mixed-operators */
import express from 'express';
import { body, param } from 'express-validator';
import {
     createProductC, getProductC, getProductsC, deleteProductC,
} from './products-controller.js';
import expressValidation from '../../utils/express-utils.js';
import isLicenseKey from './validator-product.js';

const router = express.Router();

router.get('/', getProductsC);

router.get(
     '/:index',
     param('index').toInt(),
     expressValidation,
     getProductC,
);

router.delete(
     '/:index',
     param('index').toInt(),
     expressValidation,
     deleteProductC,
);

router.post(
     '/',
     body('videoGameName').notEmpty().withMessage('Game names cannot be empty').isLength({ min: 2, max: 30 })
          .withMessage('must be from 2 to 30 length')
          .isAlphanumeric('en-US', { ignore: ' _-' })
          .withMessage('must contains only letters and numbers'),
     body('platform').notEmpty().withMessage('Platform cannot be empty').isIn(['ps4', 'PS4', 'ps3', 'PS3', 'xbox', 'XBOX', 'windows', 'WINDOWS'])
          .withMessage('this platform is not supported'),
     body('developers').notEmpty().withMessage('Developer names cannot be empty').isAlphanumeric('en-US', { ignore: ' -' })
          .withMessage('must contains only letters and numbers'),
     body('releaseDate').notEmpty().withMessage('Data cannot be empty').isInt({ min: 2000, max: 2022 })
          .withMessage('Wrong release year'),
     body('productPriceInUSD').notEmpty().withMessage('Price cannot be empty').isInt({ min: 10 })
          .withMessage('Enter the correct amount ( "The amount must be at least $10" )'),
     isLicenseKey,
     expressValidation,
     createProductC,
);

export default router;
