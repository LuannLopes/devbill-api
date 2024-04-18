import { Router } from 'express'
import { CategoriesController } from '../controllers/categories.controller'
import { ParamsTypes, validate } from '../middlewares/validator.middleware'
import { createCategorySchema } from '../dtos/categories.dto'

export const categoriesRoutes = Router()

const controller = new CategoriesController()

categoriesRoutes.post(
  '/',
  validate({
    schema: createCategorySchema,
    type: ParamsTypes.BODY,
  }),
  controller.create,
)
