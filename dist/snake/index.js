class Food {
    element;
    constructor() {
        this.element = document.querySelector(".food");
    }
    get X() {
        return this.element.offsetLeft;
    }
    get Y() {
        return this.element.offsetTop;
    }
    change() {
        let top = Math.round(Math.random() * 29) * 10;
        let left = Math.round(Math.random() * 29) * 10;
        this.element.style.left = `${left}px`;
        this.element.style.top = `${top}px`;
    }
}
class ScorePanel {
    score = 0;
    level = 1;
    scoreEle;
    levelEle;
    maxLevel;
    upScore;
    constructor(maxLevel = 10, upScore = 10) {
        this.maxLevel = maxLevel;
        this.upScore = upScore;
        this.scoreEle = document.querySelector(".scoreEle");
        this.levelEle = document.querySelector(".levelEle");
    }
    addScore() {
        this.scoreEle.innerHTML = `SCORE:${++this.score}`;
        if (this.score % this.upScore === 0) {
            this.LevelUp();
        }
    }
    LevelUp() {
        if (this.level < this.maxLevel) {
            this.levelEle.innerHTML = `LEVEL:${++this.level}`;
        }
    }
}
class Snake {
    head;
    bodies;
    element;
    constructor() {
        this.element = document.querySelector(".snake");
        this.head = document.querySelector(".snake > div");
        this.bodies = this.element.getElementsByTagName("div");
    }
    get X() {
        return this.head.offsetLeft;
    }
    get Y() {
        return this.head.offsetTop;
    }
    set X(value) {
        if (this.X === value) {
            return;
        }
        if (value < 0 || value > 290) {
            throw new Error("寄！");
        }
        this.moveBody();
        this.head.style.left = value + "px";
        this.checkHead();
    }
    set Y(value) {
        if (this.Y === value) {
            return;
        }
        if (value < 0 || value > 290) {
            throw new Error("寄！");
        }
        this.moveBody();
        this.head.style.top = value + "px";
        this.checkHead();
    }
    addBody() {
        this.element.insertAdjacentHTML("beforeend", "<div></div>");
        console.log(this.bodies);
    }
    moveBody() {
        for (let i = this.bodies.length - 1; i > 0; i--) {
            let X = this.bodies[i - 1].offsetLeft;
            let Y = this.bodies[i - 1].offsetTop;
            this.bodies[i].style.left = X + "px";
            this.bodies[i].style.top = Y + "px";
        }
    }
    checkHead() {
        for (let i = 1; i < this.bodies.length; i++) {
            let bd = this.bodies[i];
            if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
                throw new Error("撞到自己了！");
            }
        }
    }
}
class GameControl {
    snake;
    food;
    scorePanel;
    direction = "ArrowRight";
    isLive = true;
    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel(10, 1);
        this.init();
    }
    init() {
        document.addEventListener("keydown", this.keydownHandler.bind(this));
        this.run();
    }
    keydownHandler(event) {
        this.direction = event.key;
    }
    run() {
        let x = this.snake.X;
        let y = this.snake.Y;
        switch (this.direction) {
            case "ArrowUp":
                y -= 10;
                break;
            case "ArrowDown":
                y += 10;
                break;
            case "ArrowLeft":
                x -= 10;
                break;
            case "ArrowRight":
                x += 10;
                break;
        }
        this.checkEat(x, y);
        try {
            this.snake.X = x;
            this.snake.Y = y;
        }
        catch (e) {
            this.isLive = false;
            alert(e.message);
        }
        if (this.isLive) {
            setTimeout(this.run.bind(this), 200 - (this.scorePanel.level - 1) * 30);
        }
    }
    checkEat(X, Y) {
        if (X === this.food.X && Y === this.food.Y) {
            this.snake.addBody();
            this.food.change();
            this.scorePanel.addScore();
        }
    }
}
new GameControl();
