const CrudForge = () => import('@/app/Arch/CrudForge')
const ProductList = () => import('@/app/Product/ProductList')
const ProductForm = () => import('@/app/Product/ProductForm')

export default [
  {
    path: '/products',
    outside: true,
    meta: {
      authorization: true
    },
    component: CrudForge,
    children: [
      {
        path: '/',
        component: ProductList,
        meta: {
          authorization: true
        }
      },
      {
        path: 'new',
        component: ProductForm,
        meta: {
          authorization: true
        }
      },
      {
        path: 'edit/:id',
        component: ProductForm,
        meta: {
          authorization: true
        }
      }
    ]
  }
]
