const Login = () => import('@/app/Login/Login')

export default [
  {
    path: '/login',
    outside: true,
    meta: {
      title: 'Acesso Restrito',
      authorization: false
    },
    component: Login
  }
]
