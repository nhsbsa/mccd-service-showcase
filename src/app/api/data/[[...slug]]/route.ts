import * as path from 'path';
import * as fs from 'fs';
import { promises as fsPromises } from 'fs';
import { NextResponse } from 'next/server';

interface RequestParams {
    slug: string[];
}

// eslint-disable-next-line import/prefer-default-export
export async function GET(request: Request, { params }: { params: RequestParams }) {
  const slug = params.slug.join('/');
  const dataDirectory = path.resolve(path.join(process.cwd(), `public/data/${slug}.json`));
  let data: never[] = [];

  if (fs.existsSync(dataDirectory)) {
    const fileData = await fsPromises.readFile(dataDirectory, 'utf8');
    data = JSON.parse(fileData);
  }

  return NextResponse.json(data);
}
