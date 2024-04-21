import { Transaction } from '../../entities/transaction.entity'
import { TransactionModel } from '../schemas/transaction.schema'

export class TransactionsRepository {
  constructor(private model: typeof TransactionModel) {}

  async create({
    amount,
    category,
    date,
    title,
    type,
  }: Transaction): Promise<Transaction> {
    const createdTransaction = await this.model.create({
      amount,
      category,
      date,
      title,
      type,
    })

    return createdTransaction.toObject<Transaction>()
  }
}
