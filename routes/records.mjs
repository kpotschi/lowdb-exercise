import express from 'express';
import { join, dirname } from 'path';
import { Low, JSONFile } from 'lowdb';
import { fileURLToPath } from 'url';
// import { recordsController } from '../controllers/recordsController.mjs';
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const file = join(__dirname, '../data/db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);
const router = express.Router();

db.data ||= [];

router.get('/getRecords', (req, res, next) => {
	res.send(db.data);
});

router.post('/addRecord', (req, res) => {
	req.query.id = new Date();
	db.data.push(req.query);
	db.write();
	res.send(`${req.query.title} was added`);
});

export default router;
