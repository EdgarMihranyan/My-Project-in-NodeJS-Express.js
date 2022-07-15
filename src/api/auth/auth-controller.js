import { verify } from '../../utils/JWT.js';
import {
     signInS, signUpS, verifyEmailS, forgotPasswordS, changeByEmailPasswordS,
} from './auth-server.js';

export const signInC = async (req, res, next) => {
     try {
          const signIn = await signInS(req.body);
          res.status(200).json(signIn);
     } catch (err) {
          next(err);
     }
};
export const signUpC = async (req, res, next) => {
     try {
          const { body } = req;
          const signup = await signUpS(body);
          res.status(201).json(signup);
     } catch (err) {
          next(err);
     }
};

export const verifyEmailC = async (req, res, next) => {
     try {
          const { token } = req.body;
          const verified = await verifyEmailS(token);
          res.status(201).json(verified);
     } catch (err) {
          next(err);
     }
};
export const forgotPasswordC = async (req, res, next) => {
     try {
          const { email } = req.body;
          const forgot = await forgotPasswordS(email);
          res.status(201).json(forgot);
     } catch (err) {
          next(err);
     }
};
export const changeByEmailPasswordC = async (req, res, next) => {
     try {
          const { token, password } = req.body;
          const gotToken = verify(token);
          const recovered = await changeByEmailPasswordS(gotToken.id, password);
          res.status(201).json(recovered);
     } catch (err) {
          next(err);
     }
};
