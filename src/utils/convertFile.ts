import * as xlsx from "xlsx";
import { ethers } from "ethers";

export const etherToWei = (ether: string) => {
  return ethers.parseEther(ether).toString();
};

export const convertFile = async (file: File) => {
  const fileBuffer = await file.arrayBuffer();
  const workbook = xlsx.read(fileBuffer);

  // workbook must have data sheet and types sheet
  if (
    !workbook.SheetNames.includes("data") ||
    !workbook.SheetNames.includes("types")
  ) {
    throw new Error(
      "Workbook must have data and types sheet. Please follow the example."
    );
  }

  const data: Record<string, any>[] = xlsx.utils.sheet_to_json(
    workbook.Sheets["data"]
  );
  const types: Record<string, any>[] = xlsx.utils.sheet_to_json(
    workbook.Sheets["types"]
  );

  if (data.length === 0 || types.length === 0) {
    throw new Error(
      "Workbook must have data and types sheet. Both must have at least one row"
    );
  }
  // throw error if types doesn't have attribute and type columns
  if (!types.some((type) => type.attribute && type.type)) {
    throw new Error(
      "Types sheet must have attribute and type columns. Please follow the example."
    );
  }
  Object.keys(data[0]).forEach((key) => {
    if (!types.map((t) => t.attribute).includes(key)) {
      throw new Error(
        `Attribute ${key}'s type not found! Please specify type of ${key} in types sheet.`
      );
    }
  });
  return { data, types };
};

export const exportToJson = (objectData: any, fileName = "export") => {
  let filename = `${fileName || "export"}.json`;
  let contentType = "application/json;charset=utf-8;";

  const a = document.createElement("a");
  a.download = filename;
  a.href =
    "data:" +
    contentType +
    "," +
    encodeURIComponent(JSON.stringify(objectData));
  a.target = "_blank";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
