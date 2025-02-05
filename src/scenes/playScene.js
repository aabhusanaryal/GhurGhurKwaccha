class PlayScene {
  constructor(sceneManager) {
    this.sceneManager = sceneManager;
    this.sceneName = "play";
    this.zombieToFire;
    this.batchSize = 15;
    this.threshold = 5;
    this.backButton = new Button("Back", windowWidth / 10, windowHeight / 10);
  }

  draw() {
    clear();
    background(grass);
    // background(220);
    this.zombieManager.draw();
    this.backButton.draw();
  }
  generateWords() {
    let index = Math.trunc(Math.random() * quotes.length);
    let quote = quotes[index];
    if (currentLanguage === "nepali") {
      index = Math.trunc(Math.random() * nepaliQuotes.length);
      quote = nepaliQuotes[index];
    }
    //let quote = "helllo i am happyhdskad";
    let words = quote.split(" ");
    if (words.length > this.batchSize) {
      words = words.slice(0, this.batchSize);
    }
    this.zombieManager.generateZombies(words, 180);
  }
  keyPressed(key) {
    this.zombieManager.keyPressed(key);
  }
  onSceneEnter() {
    keyboardAnalytics.reset();
    console.log(" SceneEnter : Play ");
    this.zombieManager = new ZombieManager();
    this.backButton.callOnMousePress(() =>
      this.sceneManager.enterScene("menu")
    );
  }
  onSceneExit() {
    console.log(" SceneExit : Play ");
  }
  update() {
    this.zombieManager.update();
    if (this.zombieManager.zombies.length < this.threshold) {
      this.generateWords();
    }
    if (this.zombieManager.player.health < 0) {
      this.sceneManager.enterScene("gameOverPlay");
    }
  }
  mouseClicked() {
    this.backButton.mouseClicked();
  }
}
