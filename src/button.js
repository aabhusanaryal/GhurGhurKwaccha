class Button {
  constructor(buttonText, xpos, ypos, width = 200, height = 50) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.height = height;
    this.extendedHeight = 1.05 * height;
    this.extendedWidth = 1.05 * width;
    this.width = width;
    this.buttonText = buttonText;
    this.isHover = false;
    this.mousePressFunction = null;
  }
  callOnMousePress(mousePressFunction) {
    this.mousePressFunction = mousePressFunction;
  }
  draw() {
    if (!this.isHover && this.hover()) {
      hover_sound[0].play();
      setTimeout(() => hover_sound[0].stop(), 200);
    }
    this.isHover = this.hover();
    if (this.isHover) {
      fill(24, 143, 167);
      rectMode(CENTER);
      rect(this.xpos, this.ypos, this.extendedWidth, this.extendedHeight, 10);
    } else {
      this.isHover = false;
      fill(51, 16, 148);
      rectMode(CENTER);
      rect(this.xpos, this.ypos, this.width, this.height, 10);
    }
    //textSize(25);
    fill(255);
    textAlign(CENTER);
    text(this.buttonText, this.xpos, this.ypos + 10);
  }

  hover() {
    if (
      mouseX > this.xpos - this.width / 2 &&
      mouseX < this.xpos + this.width / 2 &&
      mouseY > this.ypos - this.height / 2 &&
      mouseY < this.ypos + this.height / 2
    ) {
      return true;
    }
    return false;
  }
  mouseClicked() {
    if (this.isHover) {
      this.mousePressFunction();
    }
  }
}
