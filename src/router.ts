import { Router } from 'express'
import { body, param } from 'express-validator'
import { createProduct, getProductById, getProducts, updateAvailability, updateProduct } from './handlers/product'
import { handleInputErrors } from './middleware'

const router = Router()

//Routing

router.get('/', getProducts)
router.get('/:id', 
    
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    getProductById)

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

router.put('/:id', 
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

router.patch('/:id', updateAvailability)

router.delete('/', (req, res) => {

    res.json('desde delete')
})

export default router