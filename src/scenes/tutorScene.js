class TutorScene {
  constructor(sceneManager) {
    this.sceneManager = sceneManager;
    this.sceneName = "tutor";
    this.zombieToFire;
    this.isLevelSelected = false;
    this.level = 0;
    this.batchSize = 10;
    this.threshHold = 5;
    this.lastZombieIndex = 0;
    this.totalExerciseWordLength = 0;
    this.levelSelectionButtons = [];

    // Level 0 is swar barna
    // Level 1 is byanjan barna
    var button = new Button("Swar Barna", windowWidth / 2, 200, 250, 80);
    button.callOnMousePress(() => this.startLevel(0));
    this.levelSelectionButtons.push(button);
    let buttonWidth = 400,
      buttonHeight = 80;
    var button = new Button(
      "Byanjan Barna (क - ञ)",
      windowWidth / 2,
      300,
      buttonWidth,
      buttonHeight
    );
    button.callOnMousePress(() => this.startLevel(1));
    this.levelSelectionButtons.push(button);
    var button = new Button(
      "Byanjan Barna (ट - न)",
      windowWidth / 2,
      400,
      buttonWidth,
      buttonHeight
    );
    button.callOnMousePress(() => this.startLevel(2));
    this.levelSelectionButtons.push(button);
    var button = new Button(
      "Byanjan Barna (प - व)",
      windowWidth / 2,
      500,
      buttonWidth,
      buttonHeight
    );
    button.callOnMousePress(() => this.startLevel(3));
    this.levelSelectionButtons.push(button);
    var button = new Button(
      "Byanjan Barna (श - ज्ञ)",
      windowWidth / 2,
      600,
      buttonWidth,
      80
    );
    button.callOnMousePress(() => this.startLevel(4));
    this.levelSelectionButtons.push(button);

    this.backButton = new Button("Back", windowWidth / 10, windowHeight * 0.15);
    this.backButton2 = new Button("Back", windowWidth / 2, 700);
  }

  draw() {
    clear();
    background(grass);
    // background(220);
    if (this.isLevelSelected) {
      textAlign(LEFT);
      fill(color("white"));
      textFont("Georgia", 32);
      text(
        `Words Typed: ${this.zombieManager.zombiesKillCount}/${this.totalExerciseWordLength}`,
        50,
        70
      );
      textAlign(CENTER);
      this.zombieManager.draw();
      this.backButton.draw();
    } else {
      fill(color("white"));
      textFont("Georgia", 32);
      textAlign(LEFT);
      text("Select Mode", 230, 70);

      this.levelSelectionButtons.map((button) => button.draw());
      this.backButton2.draw();
    }
  }
  generateWords() {
    let words = tutorData[currentLanguage][this.level];
    this.totalExerciseWordLength = words.split(" ").length;
    words = words.split(" ").filter((word) => word != "");
    words = words.slice(
      this.lastZombieIndex,
      this.lastZombieIndex + this.batchSize
    );
    this.lastZombieIndex += words.length;
    this.zombieManager.generateZombies(words, 120);
  }
  keyPressed(key) {
    if (String(key) === " ") {
      if (this.zombieManager.zombies.length === 1) {
        this.sceneManager.enterScene("levelComplete");
        return;
      }
    }
    this.zombieManager.keyPressed(key);
  }
  onSceneEnter() {
    keyboardAnalytics.reset();
    console.log(" SceneEnter : Tutor ");
    this.isLevelSelected = false;
    this.backButton.callOnMousePress(() =>
      this.sceneManager.enterScene("menu")
    );
    this.backButton2.callOnMousePress(() =>
      this.sceneManager.enterScene("menu")
    );
  }
  onSceneExit() {
    this.lastZombieIndex = 0;
    this.totalExerciseWordLength = 0;
    console.log(" SceneExit : Tutor ");
    keyboard.close();
  }
  startLevel(level) {
    this.zombieManager = new ZombieManager(true);
    this.level = level;
    this.generateWords();
    this.isLevelSelected = true;
  }
  update() {
    if (this.isLevelSelected) {
      this.zombieManager.update();
      if (
        this.totalExerciseWordLength === this.zombieManager.zombiesKillCount
      ) {
        this.sceneManager.enterScene("gameOverTutor");
        return;
      }
      if (this.zombieManager.zombies.length < this.threshHold) {
        this.generateWords();
      }
      if (this.zombieManager.player.health < 0) {
        this.sceneManager.enterScene("gameOverTutor");
      }
    }
  }
  mouseClicked() {
    if (!this.isLevelSelected) {
      this.levelSelectionButtons.map((button) => button.mouseClicked());
      this.backButton2.mouseClicked();
    } else {
      this.backButton.mouseClicked();
    }
  }
}
