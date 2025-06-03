import { Request, Response, NextFunction } from 'express';
import { checkSchema, validationResult } from 'express-validator';

class ChatMiddleware {
    async validateMessage(req: Request, res: Response, next: NextFunction) {
        await checkSchema({
            message: {
                isString: true,
                notEmpty: true,
                errorMessage: 'Message is required',
            },
        }).run(req);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                EM:
                    'Validation errors: ' +
                    errors
                        .array()
                        .map((error) => error.msg)
                        .join(', '),
                EC: 1,
                DT: errors.array(),
            });
            return;
        }
        next();
    }
}

export default new ChatMiddleware();