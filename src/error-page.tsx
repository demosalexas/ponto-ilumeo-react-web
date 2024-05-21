import { useRouteError } from 'react-router-dom'

export default function ErrorPage() {
  const error = useRouteError()
  console.error(error)

  return (
    <div>
      <h1 className="text-white font-bold text-[26px]">Oops!</h1>
      <p className="text-white font-bold text-[16px]">
        Desculpe, ocorreu um erro inesperado.
      </p>
    </div>
  )
}
