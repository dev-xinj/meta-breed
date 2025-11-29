/* eslint-disable @typescript-eslint/no-explicit-any */
import ExcelJS from "exceljs";
export default async function readExcel(file: File) {
  const arrayBuffer = Buffer.from(await file.arrayBuffer());
  const uint8 = new Uint8Array(arrayBuffer);
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(uint8.buffer);
  const sheet = workbook.getWorksheet(1);
  if (sheet != undefined) {
    const headerRow = sheet.getRow(1);
    const headerValues = headerRow.values.slice(1) as Array<any>;
    const result = sheet
      .getSheetValues()
      .slice(2) // bỏ header
      .map((row) => {
        const values = row as any[];
        return Object.fromEntries(
          headerValues.map((key, i) => [key, values[i + 1]])
        );
      });
    return result;
  }
  return null;
}
