import { Onedoc } from "@onedoc/client";
// import { compile } from "@onedoc/react-print";
// import { readFileSync, writeFileSync } from "fs";
// import { join } from "path";

const onedoc = new Onedoc(process.env.ONEDOC_API_KEY +"");

export async function POST(request){
  const requestData = await request.json();
  const { html } = requestData;
  const { file, error } = await onedoc.render({
    html: html,
    // test: false,
    // assets: [
    //   {
    //     path: "./util/util.css",
    //     content: readFileSync(join(process.cwd(), "./util/util.css")).toString(),
    //   },
    // ],
  });

  if (error) {
    throw error;
  }

  const pdfBuffer = Buffer.from(file);

  // Return the PDF
  return new Response(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
    },
  });
}
