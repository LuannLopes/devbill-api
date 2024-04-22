import { TransactionsRepository } from '../database/repositories/transactions.repository';
import { TransactionModel } from '../database/schemas/transaction.schema';
import { TransactionsService } from '../services/transactions.service';
// import { CategoriesFactory } from './categories.factory';
import { CategoriesRepository } from './../database/repositories/categories.repository';
import { CategoryModel } from '../database/schemas/category.schema';

export class TransactionsFactory {
  private static transactionsService: TransactionsService;

  static getServiceInstance() {
    if (this.transactionsService) {
      return this.transactionsService;
    }

    
    const repository = new TransactionsRepository(TransactionModel);
    const categoriesRepository = new CategoriesRepository(CategoryModel);
    const service = new TransactionsService(repository, categoriesRepository);

    this.transactionsService = service;

    return service;
  }
}