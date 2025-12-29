class AGameMenu {
    constructor(root) {
        this.root = root;
        this.$menu = $(`
<div class="a-game-menu">
    <div class="a-game-menu-field">
        <div class="a-game-menu-field-item a-game-menu-field-item-single-mode">
            单人模式
        </div>
        <br>
        <div class="a-game-menu-field-item a-game-menu-field-item-multi-mode">
            多人模式
        </div>
        <br>
        <div class="a-game-menu-field-item a-game-menu-field-item-settings">
            设置
        </div>    
    </div>
</div>
`);
        this.root.$a_game.append(this.$menu);
        this.$single_mode = this.$menu.find('.a-game-menu-field-item-single-mode');
        this.$multi_mode = this.$menu.find('.a-game-menu-field-item-multi-mode');
        this.$settings = this.$menu.find('.a-game-menu-field-item-settings');

        this.start();
    }
    start() {
        this.add_listening_events();
    }

    add_listening_events() {
        let outer = this;
        this.$single_mode.click(function (){
            outer.hide();
            outer.root.playground.show();
        });
        this.$multi_mode.click(function (){
            console.log("click multi mode");
        });
        this.$settings.click(function (){
            console.log("click settings");
        });
    }

    show() {  // 显示menu界面
        this.$menu.show();
    }

    hide() {  // 关闭menu界面
        this.$menu.hide();
    }
}
class AGamePlayground {
    constructor(root) {
        this.root = root;
        this.$playground = $(`<div>游戏界面</div>`);
        
        this.hide();
        this.root.$a_game.append(this.$playground);

        this.start();
    }
    
    
    start() {
    }

    
    show() {  // 打开playground界面
        this.$playground.show();
    }

    hide() {  // 关闭playground界面
        this.$playground.hide();

    }

}

export class AGame{
    constructor(id) {
        this.id = id;
        this.$a_game = $('#' + id);
        this.menu = new AGameMenu(this);
        this.playground = new AGamePlayground(this);

        this.start();
    }

    start() {
    }
}
