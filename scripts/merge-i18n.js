import { readdir, readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';

async function readLanguageDirectoryAndFiles(langCode){
  const basedLocaleUrl = `./i18n/locales/${langCode}`;
  try {
    const files = await readdir(basedLocaleUrl);
    let mergedLocale = {};
    for (const file of files) {
      const filePath = resolve(`${basedLocaleUrl}/${file}`);
      const fileName = file.replace('.json', '');
      const fileContent = await readFile(filePath, 'utf-8');
      const jsonContent = JSON.parse(fileContent);
      mergedLocale[fileName] = jsonContent;
    }
    return JSON.stringify(mergedLocale, null, 2);
  } catch (error) {
    console.error(`[langCode: ${langCode}] Error reading language directory. Error: ${error}`);
    return [];
  } 
}

async function writeMergedLocale(mergedLocale, langCode){
  const mergedLocaleUrl = `./i18n/generated/${langCode}.json`;
  await writeFile(mergedLocaleUrl, mergedLocale, (error) => {
    if (error) {
      console.error(`[langCode: ${langCode}] Error writing merged locale. Error: ${error}`);
      throw error;
    }
  });
}

async function mergeI18n() {
  const locales = ['en', 'id'];
  for (const locale of locales) {
    const mergedLocale = await readLanguageDirectoryAndFiles(locale);
    await writeMergedLocale(mergedLocale, locale);
  }
}

mergeI18n();
