function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export default class FadingDiv {
  constructor(div) {
    div.classList.toggle('fadingDiv');
    this.get = div;
  }

  async fadeIn() {
    this.get.style.display = 'block';
    await sleep(300);
    this.get.style.opacity = 1;
  }

  async fadeOut() {
    this.get.style.opacity = 0;
    await sleep(300);
    this.get.style.display = 'none';
  }

  async changeTextContent(newContent) {
    await this.fadeOut(this.get);
    this.get.innerText = newContent;
    await this.fadeIn(this.get);
  }
  
  async changeHtmlContent(newContent) {
    await this.fadeOut(this.get);
    this.get.innerHTML = newContent;
    await this.fadeIn(this.get);
  }
}
