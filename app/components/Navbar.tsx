'use client'
import Link from 'next/link'
import SignInButton from './SignInButton'
import { useEffect, useState } from 'react'
import axios from "axios";
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const ProjectCard: React.FC<any> = ({ title, id }) => {
  return (
    <Link href={`/projects/${id}`}>
      <div className='w-full flex items-center justify-center rounded-md shadow-md py-4 cursor-pointer hover:bg-[rgba(0,0,0,.1)] border border-black-1-800 mb-5'>
        <span className='text-black'>{title}</span>
      </div>
    </Link>

  )
}
const Header = () => {
  const [projects, setProjects] = useState<Array<any>>([])


  const { data: session } = useSession()

  useEffect(() => {

    axios.get('http://localhost:3000/api/project', {})
      .then((resp) => {
        setProjects(resp.data)
      })
  }, [])

  return (

    <>

      <div className='w-[300px] h-screen  p-[20px] flex flex-col gap-[1rem] bg-white rounded-lg mr-[1rem]'>
        <div className='flex gap-4'>
          <SignInButton />
        </div>

        <div className={`${session?.user?.email ? 'visible' : 'hidden'} flex flex-col gap-3`}>
          <div className='w-full  border-b-2 border-gray-500  '>
            <span className='text-xl font-bold'>Projects</span>
          </div>
          <Link href={"/projects/create"}>
            <button className='w-full bg-gray-300 rounded-md py-4 font-bold bg-gradient-to-tr from-blue-600 to-blue-400 text-white hover:shadow-lg hover:shadow-blue-500/40 hover:opacity-75 cursor-pointer '>
              + Create new project
            </button>
          </Link>
          <div className='overflow-y-auto'>
            {
              projects.reverse().map((el) => {
                return <ProjectCard title={el.name} key={el.id} id={el.id} />
              })
            }
          </div>
        </div>

      </div>

    </>
  )
}

export default Header
