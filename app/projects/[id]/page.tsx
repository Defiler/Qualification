'use client'
import { useSession } from 'next-auth/react'
import TrelloBoard from '../../components/Board'
import { NextPage } from 'next'
import { redirect, useRouter } from 'next/navigation'
import { NextRequest } from 'next/server'
import axios from 'axios'
import { useEffect, useState } from 'react'

const ClientProtectPage: NextPage = (req: any) => {

    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')

    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/')
        }
    })

    useEffect(() => {
        axios.get('http://localhost:3000/api/project', {
            params: {
                projectId: +req.params.id
            }
        }).then((resp) => {
            setTitle(resp.data.name)
            setDescription(resp.data.description)
        })
    }, [])


    return (
        <section className=''>
            <p>Project: <span className='font-bold'>{title}</span></p>
            <p className='mt-1 w-[1000px]'>Description: <span className='font-medium'>{description}</span></p>
            <TrelloBoard id={req.params.id} />
        </section>
    )
}

export default ClientProtectPage
