import { useContext, useEffect, useRef, useState } from 'react'
import { useQuery } from 'react-query'
import CommonContext from '../../../store/CommonContext'
import PostApi from '../services/PostApi'
import Post from './Post'

export default function () {
  const { user } = useContext(CommonContext)
  const ref = useRef()
  const query = useQuery({
    queryKey: ['posts'],
    queryFn: () => PostApi.get()
  })
  if (query.isError || query.isLoading) return <></>
  return <div className='flex flex-col gap-5 my-5'>
    {query.data.map(e => <div key={e._id}><Post id={e._id} /></div>)}
    <div ref={ref}>Loading more posts</div>
  </div>
}