import { Router } from 'express'

import { TransactionsController } from '../controllers/transactions.controller'
import { createTransactionSchema } from '../dtos/transactions.dto'
import { ParamsTypes, validate } from '../middlewares/validator.middleware'
import { TransactionsFactory } from '../factories/transactions.factory'

export const transactionsRoutes = Router()

const controller = new TransactionsController(
  TransactionsFactory.getServiceInstance(),
)

transactionsRoutes.post(
  '/',
  validate({ schema: createTransactionSchema, type: ParamsTypes.BODY }),
  controller.create,
)

transactionsRoutes.get('/', controller.index)
