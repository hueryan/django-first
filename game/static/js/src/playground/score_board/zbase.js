class ScoreBoard extends AGameObject {
    constructor(playground) {
        super();
        this.playground = playground;
        this.ctx = this.playground.game_map.ctx;

        this.state = null;  // win; lose

        this.win_img = new Image();
        this.win_img.src = "https://app3749.acapp.acwing.com.cn/static/image/playground/win.png";

        this.lose_img = new Image();
        this.lose_img.src = "https://app3749.acapp.acwing.com.cn/static/image/playground/lose.png";
    }

    start() {
        this.lose();
    }

    win() {
        this.state = "win";
    }

    lose() {
        this.state = "lose";
    }

    late_update() {
        this.render();
    }

    render() {
        let len = this.playground.height / 2;
        if (this.state === "win") {
            this.ctx.drawImage(this.win_img, this.playground.width / 2 - len / 2, this.playground.height / 2 - len / 2, len, len);
        } else if (this.state === "lose") {
            this.ctx.drawImage(this.lose_img, this.playground.width / 2 - len / 2, this.playground.height / 2 - len / 2, len, len);
        }
    }
}
