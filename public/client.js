import { xhrPost, xhrHeaderTypes } from '../xhr2.js';
import Alert from '../components/alert/script.js';
import { showLoadingAnimation, hideLoadingAnimation } from '../components/loadingAnimation/script.js';
import FadingDiv from '../components/fadingDiv/script.js';
import * as views from './views.js';

var xmlContent = '';
var strippedContent = '';
var orgsFound = [];
var lawTagged = '';
window.reloadApp = () => {
    xmlContent = '';
    strippedContent = '';
    orgsFound = [];
    lawTagged = '';
    views.showUploadXmlView();
    xmlInputDiv = new FadingDiv(document.getElementById('xmlTextBox'));
    selectFileViewButtons = new FadingDiv(document.getElementById('selectFileViewButtons'));
    document
        .getElementById('fileInput')
        .addEventListener('change', readFile, false);
    xmlInputDiv.fadeIn();
}
views.showUploadXmlView();
var xmlInputDiv = new FadingDiv(document.getElementById('xmlTextBox'));
var selectFileViewButtons = new FadingDiv(document.getElementById('selectFileViewButtons'));
const alertModal = new Alert();
document
    .getElementById('fileInput')
    .addEventListener('change', readFile, false);
xmlInputDiv.fadeIn();

function readFile(evt) {
    // Retrieve the file
    const file = evt.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = async(e) => {
            xmlContent = e.target.result;
            strippedContent = xmlContent.replace(/<[^<]+>/g, ' ').trim();
            xmlInputDiv.get.setAttribute('dir', 'ltr');
            await window.xmlView();
            selectFileViewButtons.fadeIn();
        };
        reader.readAsText(file);
    } else {
        alertModal.open('Failed to load file');
    }
    document.getElementById('fileInput').value = '';
}

window.downloadXML = () => {
    const link = document.createElement('a');
    link.setAttribute('download', `lawTagged.xml`);
    link.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(lawTagged)}`);
    link.click();
    views.showUploadAnother();
}

window.analyze = async() => {
    if (!xmlContent) {
        alertModal.open('No XML file was uploaded');
        return;
    }
    document.getElementById('pages').innerHTML = '<p class="w3-center"><b>Please wait, it may take a while</b></p>';
    showLoadingAnimation();
    const strippetdNoNumbers = strippedContent.replace(/\((\d|\w|[א-ת])\)|\d\./gi, '');
    xhrPost(
        '/analyze',
        'text/plain',
        strippetdNoNumbers,
        (resp) => {
            const results = JSON.parse(resp);
            if (results.error) {
                alertModal.open('An error accured');
                hideLoadingAnimation();
                return;
            }
            results.orgNames.forEach(orgName => {
                orgsFound.push({
                    name: orgName,
                    approved: true
                });
            });
            hideLoadingAnimation();
            views.showResultsView(strippedContent, orgsFound);
            xmlInputDiv = new FadingDiv(document.getElementById('xmlTextBox'));
            xmlInputDiv.fadeIn();
        },
    );
};

window.finish = async() => {
        document.getElementById('pages').innerHTML = '<p class="w3-center"><b>Please wait</b></p>';
        showLoadingAnimation();
        let lawTaggedPreview = '';
        orgsFound.forEach((org) => {
                    let nextOrgIndex = xmlContent.indexOf(org.name);
                    // We check that the word is not found within some tag boundries.
                    while (xmlContent.indexOf('>', nextOrgIndex) < xmlContent.indexOf('<', nextOrgIndex)) {
                        nextOrgIndex = xmlContent.indexOf(org.name, nextOrgIndex + org.name.length);
                    }
                    if (org.approved) {
                        lawTagged = lawTagged + xmlContent.substring(0, nextOrgIndex) + `<organization name="${org.name}" approved="${org.approved}">${org.name}</organization>`;
                        lawTaggedPreview = lawTaggedPreview + `<xmp>${xmlContent.substring(0, nextOrgIndex)}</xmp>` + `<xmp style="color:red;">${`<organization name="${org.name}" approved="${org.approved}">${org.name}</organization>`}</xmp>`;
                    }
                    else {
                        lawTagged = lawTagged + xmlContent.substring(0, nextOrgIndex) + org.name
                        lawTaggedPreview = lawTaggedPreview + `<xmp>${xmlContent.substring(0, nextOrgIndex) + org.name}</xmp>`;
                    }
        xmlContent = xmlContent.substring(nextOrgIndex + org.name.length);
    });
    lawTagged = lawTagged + xmlContent;
    lawTaggedPreview = lawTaggedPreview + `<xmp>${xmlContent}</xmp>`;            
    views.showDownloadFile(lawTaggedPreview);
    hideLoadingAnimation();
};

window.takeOrg = (orgElement, id, approved) => {
    orgsFound[parseInt(id)].approved = approved;
    if (!approved && orgElement.parentElement.parentElement.classList.contains("orgNameApproved")) {
        orgElement.parentElement.parentElement.classList.toggle("orgNameApproved");
        orgElement.parentElement.parentElement.classList.toggle("orgNameNotApproved");
    }
    if (approved && orgElement.parentElement.parentElement.classList.contains("orgNameNotApproved")){
        orgElement.parentElement.parentElement.classList.toggle("orgNameNotApproved");
        orgElement.parentElement.parentElement.classList.toggle("orgNameApproved");
    }
}
window.strippedView = async() => {
    await xmlInputDiv.changeTextContent(strippedContent.replace(/\s+\n/g, '\n'));
    document.getElementById('strippedViewBtn').setAttribute('disabled', true);
    document.getElementById('xmlViewBtn').removeAttribute('disabled');
    xmlInputDiv.get.setAttribute('dir', 'rtl');
}
window.xmlView = async() => {
    await xmlInputDiv.changeHtmlContent(`<xmp>${xmlContent}</xmp>`);
    document.getElementById('strippedViewBtn').removeAttribute('disabled');
    document.getElementById('xmlViewBtn').setAttribute('disabled', true);
    xmlInputDiv.get.setAttribute('dir', 'ltr');
}