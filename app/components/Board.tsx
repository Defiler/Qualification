// @ts-ignore
import Board from 'react-trello'
import { useEffect, useState } from 'react'
import axios from 'axios'

const TrelloBoard = ({ id }: { id: number }) => {

    const [taskList, setTaskList] = useState<Array<any>>([])


    const [data, setData] = useState({
        lanes: [
            {
                id: 'lane1',
                title: 'To Do',
                label: taskList.length.toString(),
                cards: []
            },
            {
                id: 'lane4',
                title: 'Fix & Upgrades',
                label: '',
                cards: []
            },
            {
                id: 'lane5',
                title: 'Testing',
                label: '',
                cards: []
            },
            {
                id: 'lane6',
                title: 'Done',
                label: '',
                cards: []
            }
        ]
    })

    useEffect(() => {
        setData({
            lanes: [
                {
                    id: 'lane1',
                    title: 'To Do',
                    label: taskList.length.toString(),
                    // @ts-ignore
                    cards: taskList
                },
                {
                    id: 'lane4',
                    title: 'Fix & Upgrades',
                    label: '',
                    cards: []
                },
                {
                    id: 'lane5',
                    title: 'Testing',
                    label: '',
                    cards: []
                },
                {
                    id: 'lane6',
                    title: 'Done',
                    label: '',
                    cards: []
                }
            ]
        })
    }, [taskList])
    useEffect(() => {
        axios.get('http://localhost:3000/api/tasks', {
            params: {
                projectId: id
            }
        }).then((resp) => {
            setTaskList(resp.data)
        })
    }, [])

    const handleAddTask = (card: any) => {
        axios.post('http://localhost:3000/api/tasks', {
            ...card,
            projectId: id
        })
            .then((resp) => { console.log(resp) })
            .catch((err) => { })
    }

    const handleDeleteTask = (taskId: number) => {
        axios.delete(`http://localhost:3000/api/tasks`, {
            params: {
                taskId
            }
        })
            .then((resp) => { console.log(resp) })
            .catch((err) => { })
    }
    return (
        <>
            <Board
                data={data}
                draggable={true}
                laneDraggable={false}
                editable={true}
                // @ts-ignore
                onCardClick={(cardId, metadata, laneId) => { console.log(cardId) }}
                // @ts-ignore
                onCardAdd={(card, laneId) => {
                    console.log('add')
                    handleAddTask(card)
                }}
                onCardDelete={
                    (cardId: any) => {
                        handleDeleteTask(cardId)
                    }
                }
                style={{
                    backgroundColor: 'transparent'
                }}
                laneStyle={{
                    backgroundColor: 'white'
                }}
                cardStyle={{
                    backgroundColor: '#eceff180'
                }}
            />
        </>
    )
}
export default TrelloBoard