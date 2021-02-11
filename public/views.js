import { createPopup } from '../components/popup/script.js';

const page = document.getElementById('pages');
export async function showUploadXmlView() {
    page.innerHTML = `
    <div class="w3-row">
        <div class="w3-large">Input file<br /></div>
        <div id="selectFileViewButtons">
            <button id="strippedViewBtn" class="small-btn space-btn w3-blue w3-button w3-right" onclick="strippedView()"> Stripped view</button>
            <button id="xmlViewBtn" class="small-btn space-btn w3-blue w3-button w3-right" onclick="xmlView()"> Xml view</button>
        </div>
        <div id="xmlTextBox" class="whiteDiv w3-row" style="border-radius: 5px; font-family: monospace; resize: none; overflow: auto; width: 100%;height: 600px;">
        </div>
        <div class="w3-row" style="margin-top: 10px;">
            <label for="fileInput" class="space-btn w3-blue w3-button w3-left"><i class="fa fa-cloud-upload"></i> Upload xml</label>
            <input id="fileInput" style="visibility: hidden" class="w3-left" type="file" accept=".xml" />
            <button class="space-btn w3-blue w3-button w3-right" id="fetch" onclick="analyze()"><i class="fa fa-magic"></i> Analyze</button>
            <button class="space-btn w3-blue w3-button w3-right" onclick="document.getElementById('xmlTextBox').innerText = ''"><i class="fa fa-eraser"></i> Clear</button>
        </div>
    </div>
    `;
}
export async function showResultsView(strippedContent, orgsFound) {
    let htmlContent = ""
    orgsFound.forEach((org, id) => {
        const nextOrgIndex = strippedContent.indexOf(org.name);
        if (nextOrgIndex) {
            htmlContent = htmlContent +
                strippedContent.substring(0, nextOrgIndex).replace(/\s+\n/g, '<br>') +
                createPopup(org, id);
            strippedContent = strippedContent.substring(nextOrgIndex + org.name.length);
        }
    });
    page.innerHTML = `
    <div class="w3-row">
        <div class="w3-large">
            <b>Results in stripped view</b>
            <br>
            <span class="w3-medium">Click an organization name to approve/disapprove it, all names are approved by default.</span>
        </div>
        <div id="xmlTextBox" dir="rtl" class="whiteDiv w3-row" style="border-radius: 5px; font-family: system-ui; resize: none; overflow: auto; width: 100%;height: 600px; padding: 100px;">
        ${htmlContent}
        </div>
        <div class="w3-row" style="margin-top: 10px;">
            <button class="space-btn w3-blue w3-button w3-right" id="fetch" onclick="finish()"><i class="fa fa-check"></i> Finish</button>
        </div>
    </div>
    `;
}
export async function showDownloadFile(content) {
    page.innerHTML = `
    <div class="w3-row">
        <div class="w3-large">Here is you new tagged law, organization tags are bolded in red color:<br /></div>
        <div id="xmlTextBox" class="whiteDiv w3-row" style="border-radius: 5px; font-family: monospace; resize: none; overflow: auto; width: 100%;height: 600px;">
        ${content}
        </div>
        <div class="w3-row" style="margin-top: 10px;">
            <button class="space-btn w3-blue w3-button w3-right" onclick="downloadXML()"><i class="fa fa-cloud-download"></i> Download XML</button>
        </div>
    </div>
    `;
}

export async function showUploadAnother() {
    page.innerHTML = `
    <div class="w3-row w3-center" style="margin-top: 200px;">
        Thank you for using Organizations Law Tagger!
        <div class="w3-row" style="margin-top: 10px;">
            <button class="space-btn w3-blue w3-button w3-center" onclick="reloadApp()"><i class="fa fa-cloud-upload"></i> Upload another file</button>
        </div>
    </div>
    `;
}