import { NextResponse } from "next/server"
import { createCard } from "~/server/db/queries"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = await createCard(body)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      )
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error in create card route:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 