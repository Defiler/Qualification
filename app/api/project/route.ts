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

        const project = await db.project.create({
            data: {
                name: body.title,
                description: body.description,
                start_date: new Date(),
                end_date: new Date(body.endDate),
                status: 0
            }
        })
        if (project) {
            return NextResponse.json(project, { status: 200 })
        } else {
            return NextResponse.json('', { status: 500 })
        }



    } catch (e) {

    }
}
export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user) {
            return new Response('Unauthorized', { status: 401 })
        }
        const { searchParams } = new URL(req.url)
        const projectId = searchParams.get('projectId')

        let projects;
        if (projectId) {
            projects = await db.project.findUnique({
                where: {
                    id: +projectId
                }
            })
        } else {
            projects = await db.project.findMany({})
        }

        return NextResponse.json(projects, { status: 200 })
    } catch (e) {

    }
}