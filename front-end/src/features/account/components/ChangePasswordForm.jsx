import { Input, Button } from '../../../components/ui'
import { useContext, useRef } from 'react'
import api from '../services/api'
import { toast } from 'react-toastify'
import CommonContext from '../../../store/CommonContext'

export default function () {
  const { user, setUser } = useContext(CommonContext)
  const oldPasswordRef = useRef(),
    passwordRef = useRef(),
    repeatPasswordRef = useRef()

  const handleUpdate = () => {
    if(passwordRef.current.value != repeatPasswordRef.current.value)
      return toast('Mật khẩu không khớp', {type : 'warning'})
    api.changePasswordById(user._id, {
      oldPassword: oldPasswordRef.current.value ? oldPasswordRef.current.value : undefined,
      password: passwordRef.current.value ? passwordRef.current.value : undefined,      
    })
      .then(user => setUser(user))
      .catch(err => toast(err.message, { type: 'error' }))
  }

  return <div className="flex flex-col gap-5 card dark:card-black p-5">
    <div className="flex gap-5 items-center justify-between">
      <div className='text-1'>Mật khẩu cũ</div>
      <Input className="bg-white dark:bg-black border-2 border-teal" ref={oldPasswordRef} />
    </div>
    <div className="flex gap-5 items-center justify-between">
      <div className='text-1'>Mật khẩu mới</div>
      <Input className="bg-white dark:bg-black border-2 border-teal" ref={passwordRef} />
    </div>
    <div className="flex gap-5 items-center justify-between">
      <div className='text-1'>Nhập lại mật khẩu</div>
      <Input className="bg-white dark:bg-black border-2 border-teal" ref={repeatPasswordRef}/>
    </div>    
    <Button onClick={handleUpdate} className={'m-auto btn-teal dark:btn-grey'}>Cập Nhật Mật Khẩu</Button>
  </div>
}