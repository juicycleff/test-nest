import { Catch, ExceptionFilter, HttpStatus, HttpException } from '@nestjs/common';
import { MessageCodeError } from '../lib/error/message-code-error';

@Catch(MessageCodeError, HttpException, Error)
export class DispatchError implements ExceptionFilter {
    public catch(err, res) {
        if (err instanceof MessageCodeError) {
            /* MessageCodeError, Set all header variable to have a context for the client in case of MessageCodeError. */
            res.setHeader('x-message-code-error', err.messageCode);
            res.setHeader('x-message', err.message);
            res.setHeader('x-httpStatus-error', err.httpStatus);

            return res.status(err.httpStatus).send();
        } else {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
        }
    }
}