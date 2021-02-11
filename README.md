# Organizations Law Tagger

A tool for tagging organization names in law xml files.
Written by Ariel Naftali & Nadav Kalimi.

## How to run locally

### Prerequisites
In order to run the application locally in your machine, you need to have at least the following versions or above installed:
- Python 3.7
- Java 1.4
- Node.js 12
- Hebrew part of speech tagger, written by Meni Adler, Raphael Cohen, Yoav Goldberg and Michael Elhadad -  [download from here]( https://www.dropbox.com/s/sarmyzbm9jwesh0/tagger.ner.zip?dl=0).
 
### How to run
- Clone this repository.
- Change directory to `/tagger` folder and extract the Hebrew tagger there, so you'll have this folder: `/tagger/tagger.ner`.
- Move the script `tag.bat` from `/tagger` to `/tagger/tagger.ner`. 
- Go back to the main repository folder and open a terminal there.
- Run `npm install` and wait for the packages to finish installing.
- Run `node server.js`, make sure that you get the following printed in the terminal: `Server listening on port 8080`.
- Open a new tab in your browser and navigate to `localhost:8080`.