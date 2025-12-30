export class AGame{
    constructor(id) {
        this.id = id;
        this.$a_game = $('#' + id);
        // this.menu = new AGameMenu(this);
        this.playground = new AGamePlayground(this);

        this.start();
    }

    start() {
    }
}
