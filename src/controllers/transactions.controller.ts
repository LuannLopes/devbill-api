import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import {
  CreateTransactionDTO,
  GetDashboardDTO,
  IndexTransactionsDTO,
} from '../dtos/transactions.dto'
import { TransactionsService } from '../services/transactions.service'

export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  create = async (
    req: Request<unknown, unknown, CreateTransactionDTO>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { amount, categoryId, date, title, type } = req.body

      const transaction = await this.transactionsService.create({
        amount,
        categoryId,
        date,
        title,
        type,
      })

      res.status(StatusCodes.CREATED).json(transaction)
    } catch (err) {
      next(err)
    }
  }

  index = async (
    req: Request<unknown, unknown, unknown, IndexTransactionsDTO>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { title, categoryId, beginDate, endDate } = req.query
      const transactions = await this.transactionsService.index({
        title,
        categoryId,
        beginDate,
        endDate,
      })

      return res.status(StatusCodes.OK).json(transactions)
    } catch (err) {
      next(err)
    }
  }

  getDashboard = async (
    req: Request<unknown, unknown, unknown, GetDashboardDTO>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { beginDate, endDate } = req.query

      const result = await this.transactionsService.getDashboard({
        beginDate,
        endDate,
      })

      return res.status(StatusCodes.OK).json(result)
    } catch (err) {
      next(err)
    }
  }
}
