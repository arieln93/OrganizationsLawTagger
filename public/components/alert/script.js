export default class Alert {
  constructor() {
    this.alertElement = document.createElement('div');
    this.alertElement.id = 'alert';
    this.alertElement.classList.toggle('alert');
    this.alertElement.innerHTML = `
    <div class="alert-content">
      <div class="alert-header">
        <span onclick="closeAlert();" class="close">&times;</span>
        <h2 id="alertTitle" class="w3-center"></h2>
      </div>
      <div class="alert-body">
        <div id="alertContent"></div>
      </div>
    </div>`;
    document.body.prepend(this.alertElement);
  }

  close() {
    this.alertElement.style.display = 'none';
    document.getElementById('alertTitle').innerHTML = '';
    document.getElementById('alertContent').innerHTML = '';
  }

  open(content, title) {
    this.alertElement.style.display = 'block';
    document.getElementById('alertTitle').innerHTML = `<i class="fa fa-warning"></i> ${title || 'Error'}`;
    document.getElementById('alertContent').innerHTML = content;
  }
}
