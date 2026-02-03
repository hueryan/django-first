export class AGame{
    constructor(id, AcWingOS, access, refresh) {
        this.id = id;
        this.$a_game = $('#' + id);
        this.AcWingOS = AcWingOS;
        this.access = access;
        this.refresh = refresh;

        this.menu = new AGameMenu(this);
        this.settings = new Settings(this);
        this.playground = new AGamePlayground(this);

        this.start();
    }

    start() {
    }
}
