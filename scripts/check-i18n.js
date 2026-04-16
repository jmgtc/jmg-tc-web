const fs = require('fs');
const path = require('path');

const ES_PATH = path.join(__dirname, '../src/dictionaries/es.json');
const EN_PATH = path.join(__dirname, '../src/dictionaries/en.json');

function getKeys(obj, prefix = '') {
  let keys = [];
  for (const key in obj) {
    if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      keys = keys.concat(getKeys(obj[key], `${prefix}${key}.`));
    } else {
      keys.push(`${prefix}${key}`);
    }
  }
  return keys;
}

function checkI18n() {
  console.log('--- AGENTE DE VERIFICACIÓN I18N ---');
  
  if (!fs.existsSync(ES_PATH) || !fs.existsSync(EN_PATH)) {
    console.error('Error: No se encuentran los archivos de diccionarios.');
    process.exit(1);
  }

  const es = JSON.parse(fs.readFileSync(ES_PATH, 'utf8'));
  const en = JSON.parse(fs.readFileSync(EN_PATH, 'utf8'));

  const esKeys = getKeys(es);
  const enKeys = getKeys(en);

  const missingInEn = esKeys.filter(key => !enKeys.includes(key));
  const missingInEs = enKeys.filter(key => !esKeys.includes(key));

  if (missingInEn.length === 0 && missingInEs.length === 0) {
    console.log('\x1b[32m%s\x1b[0m', '✅ ÉXITO: Los diccionarios están perfectamente sincronizados.');
  } else {
    if (missingInEn.length > 0) {
      console.log('\x1b[31m%s\x1b[0m', `❌ Claves faltantes en EN (Inglés):`);
      missingInEn.forEach(key => console.log(`  - ${key}`));
    }
    if (missingInEs.length > 0) {
      console.log('\x1b[31m%s\x1b[0m', `❌ Claves faltantes en ES (Español):`);
      missingInEs.forEach(key => console.log(`  - ${key}`));
    }
    console.log('\x1b[33m%s\x1b[0m', '\nSugerencia: Usa el Agente de Traducción para generar estas claves faltantes.');
  }
}

checkI18n();
