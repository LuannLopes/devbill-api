import { StatusCodes } from 'http-status-codes'

import { CategoriesRepository } from '../database/repositories/categories.repository'
import { TransactionsRepository } from '../database/repositories/transactions.repository'
import {
  CreateTransactionDTO,
  IndexTransactionsDTO,
} from '../dtos/transactions.dto'
import { Transaction } from '../entities/transaction.entity'
import { AppError } from '../errors/app.error'

export class TransactionsService {
  constructor(
    private transactionsRepository: TransactionsRepository,
    private categoriesRepository: CategoriesRepository,
  ) {}

  async create({
    amount,
    categoryId,
    date,
    title,
    type,
  }: CreateTransactionDTO): Promise<Transaction> {
    const category = await this.categoriesRepository.findById(categoryId)

    if (!category) {
      throw new AppError('Categories not found', StatusCodes.NOT_FOUND)
    }

    const transaction = new Transaction({
      amount,
      category,
      date,
      title,
      type,
    })

    const createdTransaction =
      await this.transactionsRepository.create(transaction)

    return createdTransaction
  }

  async index(filters: IndexTransactionsDTO): Promise<Transaction[]> {
    const transactions = await this.transactionsRepository.index(filters)

    return transactions
  }
}
