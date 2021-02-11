export default class Confirm {
  constructor() {
    this.confirmElement = document.createElement('div');
    this.confirmElement.id = 'confirm';
    this.confirmElement.classList.toggle('confirm');
    this.confirmElement.innerHTML = `
    <div class="confirm-content">
      <div class="confirm-header">
        <h2 id="confirmTitle" class="w3-center"></h2>
      </div>
      <div class="confirm-body">
        <div id="confirmContent"></div>
      </div>
      <div class="confirm-buttons">
        <button class="w3-button w3-red w3-medium" style="margin-bottom: 6px;padding-top: 3px;padding-bottom: 3px;width: 47%;" type="button" id="confirmButtonNo" onclick="closeConfirm()"><i class="fa fa-close  sideButtonIcon"></i> No</button>
        <button class="w3-button w3-green w3-medium" style="margin-bottom: 6px;padding-top: 3px;padding-bottom: 3px;width: 47%;" type="button" id="confirmButtonYes"><i class="fa fa-check  sideButtonIcon"></i> Yes</button>
      </div>
    </div>`;
    document.body.prepend(this.confirmElement);
  }

  close() {
    this.confirmElement.style.display = 'none';
    document.getElementById('confirmTitle').innerHTML = '';
    document.getElementById('confirmContent').innerHTML = '';
    // Because we can't actually remove event listeners:
    const confirmButtonYes = document.getElementById('confirmButtonYes');
    const confirmButtonYesClone = confirmButtonYes.cloneNode(true);
    confirmButtonYes.parentElement.appendChild(confirmButtonYesClone);
    confirmButtonYes.remove();
  }

  async open(title, content, callback) {
    this.confirmElement.style.display = 'block';
    document.getElementById('confirmTitle').innerHTML = title;
    document.getElementById('confirmContent').innerHTML = content;
    document.getElementById('confirmButtonYes').addEventListener('click', async () => {
      await callback();
      window.closeConfirm();
    });
  }
}
