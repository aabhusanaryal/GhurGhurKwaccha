var sceneManager;

//Zombies [0, 1 ,2] [0=Walking 1=Dying 2=Attacking]
var gif_zomb;
var grass;

var nepaliFont;
var currentLanguage = "english";
var keyboard;
var languageFlag;
var slider;
var hover_sound;
var deathSounds;

function setup() {
  createCanvas(windowWidth, windowHeight);
  var sceneList = [
    PlayScene,
    MenuScene,
    CreditScene,
    TutorScene,
    GameOverScene,
  ];
  keyboard = new Keyboard("US", currentLanguage);
  sceneManager = new SceneManager(sceneList);
  sceneManager.enterScene("menu");
  slider= createSlider(0,1,0);
  slider.position(windowWidth-50,50);
  slider.style('width','30px');
  // hover_sound.play();
}

function draw() {
  sceneManager.loop();
  if (sceneManager.currentScene.sceneName==='menu'){
    if (slider.value()){
      currentLanguage = "nepali";
      keyboard.changeLanguage("nepali");
      image(languageFlag[0],windowWidth-45,20,30,30);
    }
    else{
        currentLanguage ="english";
        keyboard.changeLanguage("english");
        image(languageFlag[1],windowWidth-45,30,30,20);
     }

  }

}
function keyPressed() {
  sceneManager.keyPressed(key);
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
function preload() {
  grass=loadImage("assets/Game Objects/grass.png")
  gif_zomb=[]

  //Zombies [0, 1 ,2] [0=Walking 1=Dying 2=Attacking]

  //Zomb1
  gif_zomb[0]=[]
  gif_zomb[0][0]=loadAnimatedSprite(17,"assets/Zombies/Z01/Walking/Walking_0","0")
  gif_zomb[0][1]=loadAnimatedSprite(14,"assets/Zombies/Z01/Dying/Dying_0","0")
  gif_zomb[0][2]=loadAnimatedSprite(11,"assets/Zombies/Z01/Attacking/Attacking_0","0")

  //Zomb2
  gif_zomb[1]=[]
  gif_zomb[1][0]=loadAnimatedSprite(17,"assets/Zombies/Z02/Walking/Walking_0","0")
  gif_zomb[1][1]=loadAnimatedSprite(14,"assets/Zombies/Z02/Dying/Dying_0","0")
  gif_zomb[1][2]=loadAnimatedSprite(11,"assets/Zombies/Z02/Attacking/Attacking_0","0")

  //Zomb1
  gif_zomb[2]=[]
  gif_zomb[2][0]=loadAnimatedSprite(17,"assets/Zombies/Z03/Walking/Walking_0","0")
  gif_zomb[2][1]=loadAnimatedSprite(14,"assets/Zombies/Z03/Dying/Dying_0","0")
  gif_zomb[2][2]=loadAnimatedSprite(11,"assets/Zombies/Z03/Attacking/Attacking_0","0")


  languageFlag =[
  loadImage('assets/Flag-Nepal.png'),
  loadImage('assets/America-Flag.png'),
  ];
  soundFormats("mp3");
  hover_sound =[
  loadSound("assets/Sounds/hover_sound.mp3"),
  ];
  deathSounds=[];
  for(var i=0; i<=9; i++) {
      deathSounds.push( loadSound(`assets/Sounds/Death/deathSound${i}.mp3`));
  }
  nepaliFont = loadFont("css/font.otf");
}
function mouseClicked() {
  sceneManager.mouseClicked();
}
function loadAnimatedSprite(count,preFilename, extra=""){
  var spriteList=[]
  for(var i=0; i<=count; i++) {
    if(i<10){
      spriteList.push( loadImage(`${preFilename}${extra}${i}.png`))
    }
    else {
      spriteList.push( loadImage(`${preFilename}${i}.png`))
    }
  }
  return spriteList
}
