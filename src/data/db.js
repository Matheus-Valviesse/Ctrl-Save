import fs from "fs";
import path from "path";

const dbPath = path.join(__dirname, "db.json");

// Ler o JSON
export function readDB() {
  if (!fs.existsSync(dbPath)) return { copies: [] };
  const raw = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(raw);
}

// Escrever no JSON
export function writeDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

// Funções CRUD
export function getCopies() {
  const db = readDB();
  return db.copies;
}

export function addCopy(item) {
  const db = readDB();
  const newItem = { id: Date.now(), ...item };
  db.copies.push(newItem);
  writeDB(db);
  return newItem;
}

export function editCopy(id, updatedItem) {
  const db = readDB();
  db.copies = db.copies.map(c => c.id === id ? { ...c, ...updatedItem } : c);
  writeDB(db);
  return db.copies.find(c => c.id === id);
}

export function deleteCopy(id) {
  const db = readDB();
  db.copies = db.copies.filter(c => c.id !== id);
  writeDB(db);
  return { success: true };
}
