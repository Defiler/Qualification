import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../prisma/client";
export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user) {
            return new Response('Unauthorized', { status: 401 })
        }

        const body = await req.json()
        const task = await db.task.create({
            data: {
                title: body.title,
                description: body.description,
                label: body.label,
                project: {
                    connect: {
                        id: +body.projectId
                    }
                },
                status: 0
            }
        })
        // conse

        if (task) {
            return NextResponse.json(task, { status: 200 })
        } else {
            return NextResponse.json('', { status: 500 })
        }




    } catch (e) {
        console.log(e)
    }
}

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user) {
            return new Response('Unauthorized', { status: 401 })
        }

        const { searchParams } = new URL(req.url)
        const projectId = searchParams.get('projectId')


        const tasks = await db.task.findMany({
            where: {
                projectId: +projectId!,
                status: {
                    in: [0, 1, 2],
                }
            }
        })
        return NextResponse.json(tasks, { status: 200 })
    } catch (e) {
        console.log(e)
    }
}

export async function DELETE(req: NextRequest, res: NextResponse) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user) {
            return new Response('Unauthorized', { status: 401 })
        }

        const queryParam = req.nextUrl.searchParams.get("taskId");

        const updatedTask = await db.task.update({
            where: {
                id: +queryParam!
            },
            data: {
                status: 3
            }
        })

        return NextResponse.json(updatedTask, { status: 200 })
    } catch (e) {
        console.log(e)
    }
}