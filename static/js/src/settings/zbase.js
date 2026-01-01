class Settings {
    constructor(root) {
        this.root = root;
        this.platform = "WEB";
        if (this.root.AcWingOS) this.platform = "ACAPP";
        this.username = "";
        this.photo = "";

        this.$settings = $(`
<div class="a-game-settings">
    <div class="a-game-settings-login">
        <div class="a-game-settings-title">登录</div>
        <div class="a-game-settings-username">
            <div class="a-game-settings-item">
                <input type="text" placeholder="用户名">
            </div>  
        </div> 
        <div class="a-game-settings-password">
            <div class="a-game-settings-item">
                <input type="password" placeholder="密码">
            </div>
        </div>
        <div class="a-game-settings-submit">
            <div class="a-game-settings-item">
                <button>登录</button>
            </div>
        </div>
        <div class="a-game-settings-error-messages">
<!--            用户名密码错误-->
        </div>
        <div class="a-game-settings-option">
            注册
        </div>
        <br>
        <div class="a-game-settings-acwing">
            <img width="30" src="https://app3749.acapp.acwing.com.cn/static/image/settings/acwing_logo.png">  <!-- 第三方登录图片 -->
            <br>
            <div>
                AcWing 一键登录
            </div>
        </div>
    </div>
    <div class="a-game-settings-register">
        <div class="a-game-settings-title">注册</div>
        <div class="a-game-settings-username">
            <div class="a-game-settings-item">
                <input type="text" placeholder="用户名">
            </div>  
        </div> 
        <div class="a-game-settings-password">
            <div class="a-game-settings-item">
                <input type="password" placeholder="密码">
            </div>
        </div>
        <div class="a-game-settings-password">
            <div class="a-game-settings-item">
                <input type="password" placeholder="确认密码">
            </div>
        </div>
        <div class="a-game-settings-submit">
            <div class="a-game-settings-item">
                <button>注册</button>
            </div>
        </div>
        <div class="a-game-settings-error-messages">
        </div>
        <div class="a-game-settings-option">
            登录
        </div>
        <br>
        <div class="a-game-settings-acwing">
            <img width="30" src="https://app3749.acapp.acwing.com.cn/static/image/settings/acwing_logo.png">  <!-- 第三方登录图片 -->
            <br>
            <div>
                AcWing 一键登录
            </div>
        </div>
    </div>
</div>
`);
        this.$login = this.$settings.find('.a-game-settings-login');
        this.$login.hide();

        this.$register = this.$settings.find('.a-game-settings-register');
        this.$register.hide();

        this.root.$a_game.append(this.$settings);

        this.start();
    }

    start() {
        this.getinfo();
    }

    register() {  // 打开注册界面
        this.$login.hide();
        this.$register.show();
    }

    login() {  // 打开登录界面
        this.$register.hide();
        this.$login.show();
    }

    getinfo() {
        let outer = this;
        $.ajax({
            url: "https://app3749.acapp.acwing.com.cn/settings/getinfo/",
            type: "GET",
            data: {
                platform: outer.platform,
            },
            success: function (resp) {
                console.log(resp);
                if (resp.result === "success") {
                    outer.username = resp.username;
                    outer.photo = resp.photo;
                    outer.hide();
                    outer.root.menu.show();
                } else {
                    outer.login();  // 返回登录界面
                    // outer.register();  // 返回注册界面
                }
            }
        });
    }

    hide() {
        this.$settings.hide();
    }

    show() {
        this.$settings.show();
    }
}
