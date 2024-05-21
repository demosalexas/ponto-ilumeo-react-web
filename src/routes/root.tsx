import { Button } from '../components/button'

import { Input } from '../components/input'

export default function Root() {
  return (
    <div className="flex flex-col lg:w-[365px] mt-[214.5px] lg:mt-[314.5px] mx-auto p-5 lg:p-0">
      <h1 className="font-normal text-[21.52px] text-[#CFCFCF] mb-[46px]">
        Ponto <span className="font-extrabold text-[21.52px]">Ilumeo</span>
      </h1>
      <Input type="text" label="Código do usuário" className="mb-[24px]" />
      <Button>Confirmar</Button>
    </div>
  )
}
