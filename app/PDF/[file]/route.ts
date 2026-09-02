import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";
import { safeContentDispositionFilename } from "@/lib/safe-url";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ file: string }> }
) {
  const { file } = await params;

  // Prevent path traversal and only allow direct .pdf filenames
  if (!file || file !== path.basename(file) || !file.toLowerCase().endsWith(".pdf")) {
    return new NextResponse("Not found", { status: 404 });
  }

  const filePath = path.join(process.cwd(), "PDF", file);

  try {
    const data = await fs.readFile(filePath);
    const safeFilename = safeContentDispositionFilename(file);
    return new NextResponse(data, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        // Open in browser by default
        "Content-Disposition": `inline; filename="${safeFilename}"`,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}

