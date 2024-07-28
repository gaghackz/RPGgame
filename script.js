let xp = 0;
let health = 100;
let gold = 50;
let current_Weapon = 0;
let fighting;
let monster_Health;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

let locations = [{

    "button": ["Buy 20 health (20 gold)","Buy weapon (30 gold)","Go to back to Town Square"],
    "function": [incHealth,buyWeapon,back],
    "text": "You have entered the store"
         },

        {
    "button": ["Go to Store","Go to Cave","Fight Dragon!"],
    "function": [goStore,goCave,fightDragon],
    "text": "You are back at the Town Square... You see a sign called \"store\""   
        },

        {
    "button": ["Fight Slime","Fight Fanged Beast","Go to town Square"],
    "function": [fightSlime,fightBeast,back],
    "text": "YOU ARE IN THE CAVE AND YOU SEE SOME MONSTERS"   
        },

        {
    "button": ["Attack", "Dodge", "Run"],
    "function": [attack, dodge, back],
    "text": "You are fighting a monster."
        },

        {
    "button":["Go to town square","Go to town square", "Go to town square"],        
    "function":[back,back,back],
    text:"GG BRO, YOU KILLED THE MONSTER, YOU GET SOME GOLD AND XP"      
        },

        {
    "button":["replay?","replay?", "replay?"],        
    "function":[replay,replay,replay],
    text:"YOU, DIED!!!!!!!! BRUH " 
        },
        {   
    name: "win",
	"button": ["REPLAY?", "REPLAY?", "REPLAY?"],
	"function": [replay, replay, replay],
	text: "CONGRATS BRO YOU WIN THE GAME YAYYY!!"
         
        }
        
]

const weapons = [
	{
		name: "stick",
		power: 5
	},
	{
		name: "dagger",
		power: 30
	},
	{
		name: "claw hammer",
		power: 50
	},
	{
		name: "sword",
		power: 100
	}
];

const monsters = [
    {
      name: "slime",
      level: 2,
      health: 15
    },
    {
      name: "fanged beast",
      level: 8,
      health: 60
    },
    {
      name: "dragon",
      level: 20,
      health: 300
    }
];


// initialize buttons



button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;


function update(locations){
    monsterStats.style.display = "none";
    button1.innerText = locations["button"][0]
    button2.innerText = locations["button"][1]
    button3.innerText = locations["button"][2]

    button1.onclick = locations["function"][0]
    button2.onclick = locations["function"][1]
    button3.onclick = locations["function"][2]

    text.innerText = locations.text;
}


function goStore(){
    update(locations[0]);

}

function goCave(){
    update(locations[2]);
}

function fightDragon(){
    fighting = 2;
    goFight();
}

function incHealth(){
    if(gold >= 10){

        health = health + 20;
        gold = gold - 10;
        healthText.innerText = health;
        goldText.innerText = gold;
    }else{
        text.innerText = "YOU DONT HAVE ENOUGH GOLD TO BUY HEALTH!!"
    }
}


function buyWeapon(){
    if (current_Weapon < weapons.length-1){
        if (gold >= 30){

            gold -= 30;
            current_Weapon++;
            goldText.innerText = gold;
            let newWeapon = weapons[current_Weapon].name;
            inventory.push(newWeapon);
            text.innerText = " You now have a " + newWeapon + ". It has been added to your inventory: " + inventory;
            
            
    
        }else {
            text.innerText = "You do not have enough gold for this weapon." ;
        }
    }else{
        text.innerText = "YOU HAVE THE STRONGEST WEAPON, GO FIGHT! or sell :/";
        button2.innerText = "Sell weapon for 15 gold ";
        button2.onclick = sellWeapon;
    }    
}

function back(){
    update(locations[1])
}

function fightSlime(){
    fighting = 0;
    goFight();
}

function fightBeast(){
    fighting = 1;
    goFight();
}

function sellWeapon(){
    if(inventory.length > 1){

        gold += 40;
        gold.innerText = gold;
        let current_Weapon = inventory.shift();
        text.innerText = "You sold " + current_Weapon + " For 40 gold. ";
        text.innerText += "You now have " + inventory;

    }else {
        text.innerText = "DON'T SELL YOUR ONLY WEAPON HOW ARE YOU GOING TO FIGHT BRO, You have " + inventory;
    }
}
function goFight(){
    update(locations[3]);
    monster_Health = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterNameText.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monster_Health;

}

function attack(){

    text.innerText = "The " + monsters[fighting].name + " ATTACKS YOU!";
    text.innerText += "You attack it with your " + weapons[current_Weapon].name + ".";


    if(isMonsterHit){
        health -= getMonsterAttackValue(monsters[fighting].level);

    }else{
        text.innerText = "YOU MISS BRUH GET GOOD."
    }


    monster_Health -= weapons[current_Weapon].power + Math.floor(Math.random() * xp) +1 ;
    healthText.innerText = health;
    monsterHealthText.innerText = monster_Health;
    if (health <= 0){
        lose();

    }else if (monster_Health <= 0){

        fighting == 2 ? win() : defeatMonster();

    }
}

function dodge(){
    text.innerText = "You dodge the attack from the " + monsters[fighting].name
}

function win(){
    update(locations[6])
}

function lose(){
    update(locations[5]);
}

function defeatMonster(){
    gold += Math.floor(monsters[fighting].level * 6.9);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);

}
function replay(){
    xp = 0;
	health = 100;
	gold = 50;
	current_Weapon = 0;
	inventory = ["stick"];
	goldText.innerText = gold;
	healthText.innerText = health;
	xpText.innerText = xp;
	back();
}

function getMonsterAttackValue(level) {
    let hit = (level * 5) - (Math.floor(Math.random() * xp));
    console.log(hit);
    return hit;
}

function isMonsterHit() {
	return Math.random() > .2 || health < 20;
}