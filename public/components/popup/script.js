export function createPopup(org, id) {
    return `
    <span class="popup orgNameApproved" onclick="showPopup(this.firstElementChild)">
        ${org.name}
        <span class="popuptext">
        Identify
        <br>
        <b>"${org.name}"</b>
        <br>
        as an organization?
        <br>
        <button class="w3-red w3-button popupBtn" onclick="takeOrg(this, ${id}, false)">No</button>
        <button class="w3-green w3-button popupBtn" onclick="takeOrg(this, ${id}, true)">Yes</button>
        </span>
    </span>
    `;
}
window.showPopup = (popupElement) => {
    popupElement.classList.toggle("showPopup");
}