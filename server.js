const express = require('express');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

const app = express();
app.use(express.text());
app.use(express.json());
app.use(express.static('public'));

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

/**
 * Runs the hebtokenizer and tagger and returns it's output.
 */
function runSuggestTagsProcess() {
    console.log('Server is executing python script...');
    return new Promise((resolve, reject) => {
        exec(
            'python3 suggestTags.py', { cwd: path.join(`${__dirname}/tagger`) },
            (error, stdout, stderr) => {
                if (error) {
                    console.log(error);
                    reject({ message: 'exec error' });
                } else if (stdout) {
                    let fileCreated = fs.readFileSync(path.join(`${__dirname}/tagger/orgsFound.json`));
                    let orgsFound = JSON.parse(fileCreated);
                    resolve(orgsFound);
                }
            },
        );
    });
}

/**
 * Get from the client a stripped plain text in hebrew (no xml tags or whatever)
 * and returns an array containing all the organization names that the tagger found
 */
app.post('/analyze', async(req, res) => {
    fs.writeFile(path.join(`${__dirname}/tagger/tagger.ner/lawStripped.txt`), req.body, async(err) => {
        if (err) {
            console.log(err);
            res.send('error');
        } else {
            await runSuggestTagsProcess()
                .then((orgsFound) => {
                    console.log(orgsFound);
                    res.send(orgsFound);
                })
                .catch((err) => {
                    console.log(err);
                    res.send({ error: err });
                });
        }
    });
});
