import { Router } from 'express'
import { body, param } from 'express-validator'
import { createProduct, getProductById, getProducts, updateAvailability, updateProduct, deleteProduct } from './handlers/product'
import { handleInputErrors } from './middleware'

const router = Router()

/**
 * 
 * @swagger
 * components: 
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The Product ID
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: The Product name
 *                      example: Monitor Curvo de 49 pulgadas
 *                  price:
 *                      type: number
 *                      description: The Product price
 *                      example: 600
 *                  availability:
 *                      type: boolean
 *                      description: The Product Availability
 *                      example: true
 */


/**
 * 
 * @swagger
 * /api/products:
 *      get:
 *          sumary: Get a list of products
 *          tags:
 *              - Products
 *          description: Return a list of products
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 * 
 * 
 * 
 */

router.get('/', getProducts)

/**
 * 
 * @swagger
 * /api/products/{id}:
 *      get:
 *          sumary: Get a product by ID
 *          tags:
 *              - Products
 *          description: Return a product based on its unique ID
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              404:
 *                  description: Product Not Found
 *              400:
 *                  description: Bad Request - Invalid ID
 * 
 * 
 * 
 */
router.get('/:id', 
    
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    getProductById)



/**
 * 
 * @swagger
 * /api/products/:
 *      post:
 *          sumary: Creates a new Product
 *          tags:
 *              - Products
 *          description: Return a new record in the database
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Monitor curvo de 49 pulgadas"
 *                              price:
 *                                  type: number
 *                                  example: 300
 *          responses:
 *              201:
 *                  description: Product Created succesfully
 *              400:
 *                  description: Bad Request - Invalid input data
 * 
 * 
 * 
 */

router.post('/', 
    
    // Validación

    body('name')
        .notEmpty().withMessage('El nombre de producto no puede ir vacio'),
        
    body('price')
        .isNumeric().withMessage('Valor no valido')
        .notEmpty().withMessage('El precio de producto no puede ir vacio')
        .custom(value => value > 0).withMessage('Precio no válido'),

        handleInputErrors,

    createProduct
)

/**
 * 
 * @swagger
 * /api/products/{id}:
 *      put:
 *          sumary: Updates a product with user input
 *          tags:
 *              - Products
 *          description: Return the updated product
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Monitor curvo de 49 pulgadas"
 *                              price:
 *                                  type: number
 *                                  example: 300
 *                              availability:
 *                                  type: boolean
 *                                  example: true
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad Request - Invalid input data
 *              404:
 *                  description: Product Not Found
 * 
 * 
 * 
 */

router.put('/:id',
    param('id').isInt().withMessage('ID no valido'), 
    body('name')
        .notEmpty().withMessage('El nombre de producto no puede ir vacio'),
        
    body('price')
        .isNumeric().withMessage('Valor no valido')
        .notEmpty().withMessage('El precio de producto no puede ir vacio')
        .custom(value => value > 0).withMessage('Precio no válido'),
    
    body('availability')
        .isBoolean().withMessage('Valor para disponibilidad no valido'),

        handleInputErrors,

    updateProduct)


/**
 * 
 * @swagger
 * /api/products/{id}:
 *      patch:
 *          sumary: Updates product availability
 *          tags:
 *              - Products
 *          description: Returns the updated availability
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad Request - Invalid ID
 *              404:
 *                  description: Product Not Found
 * 
 * 
 * 
 */

router.patch('/:id', 
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    updateAvailability)

/**
 * 
 * @swagger
 * /api/products/{id}:
 *      delete:
 *          sumary: Delete the product with the id in request
 *          tags:
 *              - Products
 *          description: Returns a confirmation message
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to delete
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: string
 *                              value: 'Producto Eliminado'
 *              400:
 *                  description: Bad Request - Invalid ID
 *              404:
 *                  description: Product Not Found
 * 
 * 
 * 
 */

router.delete('/:id', 
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    deleteProduct
)

export default router