/* eslint-disable no-param-reassign */
import { messageJWT, signJWT, verificationJWT } from '../../utils/JWT.js';
import { ServerError } from '../../utils/custom-errors.js';
import {
     getUserByEmailS, createUserS, updateUserS,
} from '../users/users-server.js';
import { errorSignIn, errorSignUp } from '../../constants/constant-errors.js';
import mailer from '../../utils/nodemailer.js';

export const verificationS = async (data) => {
     const { id } = await verificationJWT(data.token);
     updateUserS(id, { isMailVerification: true });
     return { message: 'Verification is completed' };
};

export const signInS = async (user) => {
     const { email, password } = user;
     const got = await getUserByEmailS(email);
     if (!got && password !== got.password) throw new ServerError(404, undefined, errorSignIn);
     console.log(email);
     const token = signJWT({ id: got.id }, '1h');
     if (!got.isMailVerification) {
          await mailer(messageJWT(email, 'Verification Email', token));

          return { message: `${email} address sent message, confirm to login` };
     }
     const nextStepToken = signJWT({ isAdmin: got.isAdmin }, '6h');
     return { message: `Your token key to next steps  \`  ${nextStepToken}` };
};
export const signUpS = async (data) => {
     try {
          const { email } = data;
          const got = await getUserByEmailS(email);
          if (got) {
               const token = signJWT({ id: got.id }, '5h');
               if (got.isMailVerification) throw new ServerError(404, undefined, errorSignUp);
               await mailer(messageJWT(email, 'Verification Email', token));
               return { message: `Your ${email} address has already been registered, we have sent a message, confirm to enter your account` };
          }
          const user = await createUserS(data);
          const token = signJWT({ id: user.id }, '5h');
          await mailer(messageJWT(email, 'Verification Email', token));
          return { message: `${email} address sent message, confirm to login` };
     } catch (err) {
          throw new ServerError(400, err.param, err.msg);
     }
};