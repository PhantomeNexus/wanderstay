import fs from 'node:fs';
import path from 'node:path';

const MESSAGES_DIR = 'messages';
const SOURCE_LOCALE = 'en';

const files = fs.readdirSync(MESSAGES_DIR).filter((f) => f.endsWith('.json'));

const catalogs = {};
for (const file of files) {
  const locale = file.replace(/\.json$/, '');
  const raw = fs.readFileSync(path.join(MESSAGES_DIR, file), 'utf8');
  try {
    catalogs[locale] = JSON.parse(raw);
  } catch (err) {
    console.error(`[i18n] ${locale}: invalid JSON — ${err.message}`);
    process.exit(1);
  }
}

function flatKeys(obj, prefix = '') {
  const out = new Set();
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      for (const nested of flatKeys(v, key)) out.add(nested);
    } else {
      out.add(key);
    }
  }
  return out;
}

const source = catalogs[SOURCE_LOCALE];
if (!source) {
  console.error(`[i18n] source locale ${SOURCE_LOCALE} missing — cannot validate`);
  process.exit(1);
}
const sourceKeys = flatKeys(source);

// Missing keys in a target locale are the normal state between a source string
// landing and its translation arriving, so they are reported but do not fail.
// Stale keys are real drift — a key removed from source but left behind in a
// target — and do fail, as does malformed JSON.
let hadIssue = false;
for (const [locale, cat] of Object.entries(catalogs)) {
  if (locale === SOURCE_LOCALE) continue;
  const localeKeys = flatKeys(cat);
  const missing = [...sourceKeys].filter((k) => !localeKeys.has(k));
  const stale = [...localeKeys].filter((k) => !sourceKeys.has(k));
  if (missing.length) {
    const pct = Math.round(((sourceKeys.size - missing.length) / sourceKeys.size) * 100);
    console.warn(`[i18n] ${locale}: ${missing.length} untranslated key(s) — ${pct}% translated`);
  }
  if (stale.length) {
    console.error(`[i18n] ${locale} stale ${stale.length} key(s): ${stale.slice(0, 10).join(', ')}${stale.length > 10 ? '…' : ''}`);
    hadIssue = true;
  }
}
process.exit(hadIssue ? 1 : 0);
