import { useState, useRef, useEffect } from 'react'
import { format } from 'date-fns'
import { Button } from '@/components/button'
import { List, ListItem } from '@/components/list'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

export default function Attendances() {
  const params = useParams()
  const { userCode } = params as { userCode: string }
  console.log(params.userCode)

  const query = useQuery({
    queryKey: ['attendances', userCode],
    queryFn: async () => {
      const response = await fetch(`/api/attendances/${userCode}`)
      return response.json()
    },
  });

  const [hoursWorked, setHoursWorked] = useState<string>('0h 00m')
  const [running, setRunning] = useState<boolean>(false)
  const [seconds, setSeconds] = useState<number>(0)
  const timerRef = useRef<number | null>(null)

  const [attendances, setAttendances] = useState<
    { dateWorked: string; hoursWorked: string }[]
  >([])
  useEffect(() => {
    setAttendances([
      { dateWorked: '02/11/23', hoursWorked: '8h 30m' },
      { dateWorked: '01/11/23', hoursWorked: '7h 30m' },
      { dateWorked: '31/10/23', hoursWorked: '8h 30m' },
      { dateWorked: '30/10/23', hoursWorked: '7h 30m' },
      { dateWorked: '29/10/23', hoursWorked: '8h 30m' },
      { dateWorked: '28/10/23', hoursWorked: '7h 30m' },
      { dateWorked: '27/10/23', hoursWorked: '8h 30m' },
      { dateWorked: '26/10/23', hoursWorked: '7h 30m' },
      { dateWorked: '25/10/23', hoursWorked: '8h 30m' },
      { dateWorked: '24/10/23', hoursWorked: '7h 30m' },
    ])
  }, [])
  useEffect(() => {
    if (running) {
      timerRef.current = window.setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1)
      }, 1000)
    } else if (timerRef.current !== null) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }

    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current)
      }
    }
  }, [running])

  useEffect(() => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    setHoursWorked(`${hours}h ${minutes < 10 ? '0' : ''}${minutes}m`)
    console.log(seconds)
  }, [seconds])

  const handleStart = (): void => {
    setRunning(true)
  };

  const handleStop = (): void => {
    setRunning(false)
    setHoursWorked('0h 00m')
    setSeconds(0)

    const attendance = {
      dateWorked: format(new Date(), 'dd/MM/yy'),
      hoursWorked: hoursWorked,
    }

    setAttendances([attendance, ...attendances])
  };

  return (
    <div className="flex flex-col lg:w-[365px] mt-[85px] mx-auto">
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <div>
            <h3 className="text-white text-[11.6px] font-bold">
              Relógio de ponto
            </h3>
          </div>

          <div className="flex flex-col">
            <div className="text-[11.6px] text-white font-bold">#4SXXFMF</div>
            <div className="text-[#CFCFCFB0] text-[12px] font-light">
              Usuário
            </div>
          </div>
        </div>

        <div className="flex flex-col mb-[19px]">
          <div className="text-[23.2px] text-white font-bold">
            {hoursWorked}
          </div>

          <div className="text-[11.6px] font-bold text-white">
            Horas de hoje
          </div>
        </div>
      </div>

      {running ? (
        <Button onClick={handleStop} className="mb-[19px]">
          Hora de saída
        </Button>
      ) : (
        <Button onClick={handleStart} className="mb-[19px]">
          Hora de entrada
        </Button>
      )}

      <p className="text-[12px] font-bold text-white mb-[7px]">
        Dias anteriores
      </p>

      <List>
        {attendances.map((attendance) => (
          <ListItem
            key={attendance.dateWorked}
            dateWorked={attendance.dateWorked}
            hoursWorked={attendance.hoursWorked}
          />
        ))}
      </List>
    </div>
  )
}
