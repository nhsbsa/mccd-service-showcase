import * as fs from 'fs';
import * as path from 'path';
import csvToJson from 'csvtojson';
import { camelCase, kebabCase } from 'lodash';

async function csvFileToJson(inputFilePath: string): Promise<any[]> {
  const jsonArray = await csvToJson().fromFile(inputFilePath);
  return jsonArray;
}

export async function processDataDirectory(inputDir: string, outputDir: string): Promise<void> {
  const files = fs.readdirSync(inputDir);

  // eslint-disable-next-line no-restricted-syntax
  for (const file of files) {
    const filePath = path.join(inputDir, file);
    const { name } = path.parse(file);
    const outputFileName = kebabCase(name);
    const outputFilePath = path.join(outputDir, `${outputFileName}.json`);

    if (fs.statSync(filePath).isDirectory()) {
      const nestedOutputDir = path.join(outputDir, outputFileName);
      fs.mkdirSync(nestedOutputDir, { recursive: true });
      // eslint-disable-next-line no-await-in-loop
      await processDataDirectory(filePath, nestedOutputDir);
    } else if (filePath.endsWith('.csv')) {
      // eslint-disable-next-line no-await-in-loop
      const jsonData = await csvFileToJson(filePath);

      const jsonDataCamelCase = jsonData.map((item) => {
        const newItem: Record<string, any> = {};
        // eslint-disable-next-line no-restricted-syntax
        for (const key in item) {
          if (Object.prototype.hasOwnProperty.call(item, key)) {
            newItem[camelCase(key)] = item[key];
          }
        }
        return newItem;
      });

      const jsonFileDir = path.dirname(outputFilePath);
      if (!fs.existsSync(jsonFileDir)) {
        fs.mkdirSync(jsonFileDir, { recursive: true });
      }

      fs.writeFileSync(outputFilePath, JSON.stringify(jsonDataCamelCase, null, 2));
    }
  }
}
export default processDataDirectory;
