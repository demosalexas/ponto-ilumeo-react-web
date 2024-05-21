import useSWR from 'swr'

import fetcher from '@/lib/fetcher'
import { PONTO_ILUMEO_API } from '@/consts/ponto-ilumeo-api'

const useAttendance = (userCode: string) => {
  const { data, error, isLoading } = useSWR(
    `${PONTO_ILUMEO_API}/attendances/${userCode}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

  return {
    data,
    error,
    isLoading,
  }
}

export default useAttendance
