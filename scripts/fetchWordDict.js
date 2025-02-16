import fs from 'fs';
import https from 'https';
import { createReadStream } from 'fs';
import pkg from 'fast-xml-parser';
const { XMLParser } = pkg;
import bz2 from 'unbzip2-stream';
import { pipeline } from 'stream';
import { promisify } from 'util';
import { convertToYomi } from '../src/domain/util.js';

const pipelineAsync = promisify(pipeline);

const url = 'https://dumps.wikimedia.org/jawiktionary/latest/jawiktionary-latest-pages-articles.xml.bz2';
const xmlFilePath = './jawiktionary-latest-pages-articles.xml';
const outputFilePath = './wordDict.json';

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest);
      reject(err.message);
    });
  });
}

async function decompressBz2(input, output) {
  const bzip2 = bz2();
  const source = fs.createReadStream(input);
  const destination = fs.createWriteStream(output);
  await pipelineAsync(source, bzip2, destination);
}

async function parseXML(filePath) {
  const stream = createReadStream(filePath, { encoding: 'utf8' });
  const parser = new XMLParser();
  let xmlData = '';

  for await (const chunk of stream) {
    xmlData += chunk;
  }

  return parser.parse(xmlData);
}

async function extractWords(parsedData) {
  const pages = parsedData.mediawiki.page;
  const words = [];

  for (const page of pages) {
    const word = page.title;
    const yomi = await convertToYomi(word);
    if (yomi.startsWith("アイ") && yomi.length <= 5 && /^[\u30A0-\u30FF]+$/.test(yomi)) {
      console.log(word, yomi);
      words.push({ word, yomi });
    }
  }
  return words;
}

async function main() {
  try {
    const bz2FilePath = './jawiktionary-latest-pages-articles.xml.bz2';
    if (!fs.existsSync(xmlFilePath)) {
      console.log('Downloading bz2 file...');
      await downloadFile(url, bz2FilePath);
      console.log('Decompressing bz2 file...');
      await decompressBz2(bz2FilePath, xmlFilePath);
    } else {
      console.log('XML file already exists. Skipping download and decompression.');
    }
    console.log('Parsing XML file...');
    const parsedData = await parseXML(xmlFilePath);
    console.log('Extracting words...');
    const words = await extractWords(parsedData);
    console.log('Writing to JSON file...');
    fs.writeFileSync(outputFilePath, JSON.stringify(words, null, 2));
    console.log('Done!');
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
