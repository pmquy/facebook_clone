import { useContext, useEffect, useState } from "react"
import { IoIosNotifications } from "react-icons/io"
import { useQuery, useQueryClient } from 'react-query'
import CommonContext from '../store/CommonContext'
import { useNavigate } from "react-router-dom"
import api from '../services/notification'
export default function () {
  const [open, setOpen] = useState(false)
  const { user } = useContext(CommonContext)
  const query = useQuery({
    queryKey: ['notifications', user._id],
    queryFn: () => api.get().then(val => { return val})
  })
  const queryClient = useQueryClient()
  const navigate = useNavigate()  
  if (query.isError || query.isLoading) return <></>
  const handleClick = e => {
    if (e.key) queryClient.invalidateQueries(e.key)
    if (e.to) navigate(e.to)
    setOpen(false)
  }
  return <div className="relative">
    <div className={`max-sm:fixed max-sm:top-16 max-sm:left-0 max-sm:translate-y-0 max-sm:w-full absolute w-max max-w-[500px] flex flex-col overflow-y-auto -bottom-2 translate-y-full right-0 card transition-all duration-500 ${open ? 'max-h-[400px]' : 'max-h-0'}`}>
      {query.data.map(e => <div key={e._id} className=" hover:bg-white_1 p-2 rounded-lg px-5" onClick={() => handleClick(e)}>{e.content}</div>)}
    </div>
    <button onClick={() => setOpen(!open)} className={` p-2 rounded-full group ${open ? 'bg-white_0' : 'hover:bg-white_0 '}` }>
      <div className={` absolute w-max p-2 left-1/2 -translate-x-1/2 bottom-0 hidden  rounded-lg bg-red_0 text-white_0 translate-y-[150%] ${open ? '' : 'group-hover:block'}`}>Notification</div>
      <IoIosNotifications color={`${open ? 'red' : ''}`} className="w-8 h-8" />
    </button>
  </div>
}