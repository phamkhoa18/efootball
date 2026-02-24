import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import path from "path";
import fs from "fs";

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), "public", "assets", "bxh.xlsx");
        const buffer = fs.readFileSync(filePath);
        const wb = XLSX.read(buffer, { type: "buffer" });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const raw = XLSX.utils.sheet_to_json<string[]>(ws, { header: 1 });

        // Skip header row, map to objects
        const data = raw.slice(1).filter((r) => r && r.length > 0 && r[0] !== undefined && r[0] !== null && r[0] !== "").map((r) => ({
            rank: r[0] ?? "",
            id: r[1] ?? "",
            name: r[2] ?? "",
            facebook: r[3] ?? "",
            team: r[4] ?? "",
            nickname: r[5] ?? "",
            points: r[6] ?? 0,
        }));

        return NextResponse.json({ data, total: data.length });
    } catch (error) {
        console.error("Error reading Excel:", error);
        return NextResponse.json({ data: [], total: 0, error: "Failed to read file" }, { status: 500 });
    }
}
