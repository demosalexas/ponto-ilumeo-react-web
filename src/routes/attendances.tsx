import { useState, useRef, useEffect } from 'react'
import { format } from 'date-fns'
import { useNavigate, useParams } from 'react-router-dom'

import { Button } from '@/components/button'
import { List, ListItem } from '@/components/list'
import useAttendance from '@/hooks/useAttendance'
import { PONTO_ILUMEO_API } from '@/consts/ponto-ilumeo-api'

export default function Attendances() {
  const params = useParams()
  const { userCode } = params as { userCode: string }

  const navigate = useNavigate()

  const { data, isLoading, error } = useAttendance(userCode)

  if (error) {
    navigate('/')
  }

  const [currentAttendance, setCurrentAttendance] = useState<
    | {
        id: string
        startDate: string
        endDate: string
        hoursWorked: string
      }
    | undefined
  >(undefined)

  const [hoursWorked, setHoursWorked] = useState<string>('0h 00m')
  const [running, setRunning] = useState<boolean>(false)
  const [seconds, setSeconds] = useState<number>(0)
  const timerRef = useRef<number | null>(null)

  const [attendances, setAttendances] = useState<
    { startDate?: string; hoursWorked: string; endDate?: string }[]
  >([])

  useEffect(() => {
    if (!isLoading) {
      setAttendances(data.attendancesByUserCode.attendances)
    }
  }, [data, isLoading])

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

  const handleStart = async (): Promise<void> => {
    setRunning(true)
    const response = await fetch(`${PONTO_ILUMEO_API}/attendances`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userCode,
        startDate: new Date().toISOString(),
      }),
    })

    const data = await response.json()

    if (data) {
      setCurrentAttendance(data.attendance)
    }
  }

  const handleStop = async (): Promise<void> => {
    setRunning(false)
    setHoursWorked('0h 00m')
    setSeconds(0)

    const response = await fetch(
      `${PONTO_ILUMEO_API}/attendances/${currentAttendance?.id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          endDate: new Date().toISOString(),
        }),
      }
    )

    const data = await response.json()

    if (data) {
      const attendance = {
        endDate: data.attendance.endDate,
        hoursWorked: data.attendance.hoursWorked,
      }
      console.log(data, attendance)
      setAttendances([attendance, ...attendances])
    }
  }

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
            key={attendance.startDate}
            dateWorked={format(
              new Date(
                attendance.startDate
                  ? (attendance.startDate as string)
                  : (attendance.endDate as string)
              ),
              'dd/MM/yy'
            )}
            hoursWorked={attendance.hoursWorked}
          />
        ))}
      </List>
    </div>
  )
}
