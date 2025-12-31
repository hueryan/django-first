export class AGame{
    constructor(id, AcWingOS) {
        this.id = id;
        this.$a_game = $('#' + id);
        this.AcWingOS = AcWingOS;
        this.settings = new Settings(this);
        this.menu = new AGameMenu(this);
        this.playground = new AGamePlayground(this);

        this.start();
    }

    start() {
    }
}
