const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    const filesDir = path.join(__dirname, 'files');

    fs.readdir(filesDir, (err, filenames) => {
        if (err) {
            // directory missing or read error -> render empty list
            return res.render('index', { notes: [] });
        }

        if (!filenames || filenames.length === 0) {
            return res.render('index', { notes: [] });
        }

        // read files using callbacks (no promises)
        const notes = new Array(filenames.length);
        let finished = 0;

        filenames.forEach((name, idx) => {
            const full = path.join(filesDir, name);
            fs.readFile(full, 'utf8', (rerr, content) => {
                // build a simple note object; include filename so template can link to /file/:filename
                const title = path.parse(name).name;
                if (rerr) {
                    notes[idx] = { title, content: '', filename: name };
                } else {
                    notes[idx] = { title, content, filename: name };
                }

                finished += 1;
                if (finished === filenames.length) {
                    // all files processed -> render (preserve original order)
                    res.render('index', { notes });
                }
            });
        });
    });
});

// dynamic route to view a single file: /file/:filename
app.get('/file/:filename', (req, res) => {
    const raw = req.params.filename || '';
    // basic sanitization: no path traversal
    if (raw.includes('..') || path.basename(raw) !== raw) {
        return res.status(400).send('Invalid filename');
    }

    const filesDir = path.join(__dirname, 'files');
    const full = path.join(filesDir, raw);

    fs.readFile(full, 'utf8', (err, content) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(404).send('File not found');
        }

        const title = path.parse(raw).name;
        res.render('file', { note: { title, content, filename: raw } });
    });
});

app.post('/notes', (req, res) => {
    const { title, content } = req.body;
    const filesDir = path.join(__dirname, 'files');
    
    // Create files directory if it doesn't exist
    if (!fs.existsSync(filesDir)) {
        fs.mkdirSync(filesDir);
    }

    // Create filename with timestamp to ensure uniqueness
    const safeTitle = (title || 'note').replace(/[^a-z0-9]/gi, '_');
    const filename = `${safeTitle}_${Date.now()}.txt`;
    const filepath = path.join(filesDir, filename);

    fs.writeFile(filepath, content, (err) => {
        if (err) {
            console.error('Error saving note:', err);
            res.status(500).send('Error saving note');
            return;
        }
        res.redirect('/');
    });
});

// rename file (edit filename)
app.post('/file/:filename/rename', (req, res) => {
    const raw = req.params.filename || '';
    if (raw.includes('..') || path.basename(raw) !== raw) {
        return res.status(400).send('Invalid filename');
    }

    const filesDir = path.join(__dirname, 'files');
    const oldFull = path.join(filesDir, raw);

    const newNameRaw = (req.body.newName || '').trim();
    if (!newNameRaw) return res.status(400).send('New name required');

    const ext = path.extname(raw) || '.txt';
    const safeBase = newNameRaw.replace(/[^a-z0-9]/gi, '_') || 'note';
    let newFilename = `${safeBase}${ext}`;
    const newFull = path.join(filesDir, newFilename);

    // If target exists and is different, append timestamp to avoid collision
    fs.access(newFull, fs.constants.F_OK, (accessErr) => {
        let finalFull = newFull;
        if (!accessErr && path.basename(newFull) !== raw) {
            finalFull = path.join(filesDir, `${safeBase}_${Date.now()}${ext}`);
        }

        fs.rename(oldFull, finalFull, (renameErr) => {
            if (renameErr) {
                console.error('Rename error:', renameErr);
                return res.status(500).send('Rename failed');
            }
            const finalName = path.basename(finalFull);
            res.redirect(`/file/${encodeURIComponent(finalName)}`);
        });
    });
});

// edit file contents
app.post('/file/:filename/edit', (req, res) => {
    const raw = req.params.filename || '';
    if (raw.includes('..') || path.basename(raw) !== raw) {
        return res.status(400).send('Invalid filename');
    }

    const filesDir = path.join(__dirname, 'files');
    const full = path.join(filesDir, raw);
    const newContent = typeof req.body.content === 'string' ? req.body.content : '';

    fs.writeFile(full, newContent, 'utf8', (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return res.status(500).send('Error saving file');
        }
        res.redirect(`/file/${encodeURIComponent(raw)}`);
    });
});

app.listen(port, () => {
  console.log(`Express server running on http://localhost:${port}`);
});

