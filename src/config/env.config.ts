import { Logger } from '@nestjs/common'
import * as joi from 'joi'

interface Envs {
    PORT: number
    AUTH_SERVICE: string
    NODE_ENV: string
}
const logger = new Logger('Config')
const envsSchema = joi.object({
    PORT: joi.number().integer().max(9999).required().default(3001),
    AUTH_SERVICE: joi.string().required(),
    NODE_ENV: joi.string().required()
}).unknown(true)
const { error, value } = envsSchema.validate(process.env)
if (error) {
    logger.error(`Config validation error: ${error.message}`)
    // throw new Error(`Config validation error`);
}
export const envs: Envs = {
    PORT: value.PORT,
    AUTH_SERVICE: value.AUTH_SERVICE,
    NODE_ENV: value.NODE_ENV
};
logger.log(`Envs ok: ${envs.NODE_ENV}`)
