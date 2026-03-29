import { put } from "@vercel/blob"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    console.log("[v0] Uploading file to Blob:", file.name)

    // Upload to Vercel Blob
    const blob = await put(`machines/${Date.now()}-${file.name}`, file, {
      access: "public",
    })

    console.log("[v0] Blob uploaded successfully:", blob.url)

    return NextResponse.json({
      url: blob.url,
    })
  } catch (error) {
    console.error("[v0] Error uploading to Blob:", error)
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    )
  }
}
