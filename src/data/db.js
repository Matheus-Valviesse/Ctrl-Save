import fs from "fs";

const dbPath = "./db.json";

export async function readDB() {
  if (!fs.existsSync(dbPath)) {
    const initialData = { copies: [] };
    fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2));
    return initialData;
  }
  try {
    const raw = fs.readFileSync(dbPath, "utf-8");
    return JSON.parse(raw);
  } catch (error) {
    console.error("Erro ao ler o JSON:", error);
    return { copies: [] };
  }
}

export function writeDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

export async function getCopies() {
  const db = await readDB();
  return db.copies;
}

export async function addCopy(item) {
  const db = await readDB();  // <-- usar await aqui
  const newItem = { id: Date.now(), itemCopy: item, tag: '', shortcut: '' };
  db.copies.push(newItem);
  writeDB(db);
  return newItem;
}

export async function editCopy(id, updatedItem) {
  const db = await readDB();  // <-- usar await aqui
  db.copies = db.copies.map(c => c.id === id ? { ...c, ...updatedItem } : c);
  writeDB(db);
  return { success: true };
}

export async function deleteCopy(id) {
  const db = await readDB();  // <-- usar await aqui
  db.copies = db.copies.filter(c => c.id !== id);
  writeDB(db);
  return { success: true };
}
