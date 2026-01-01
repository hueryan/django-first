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
        <div class="a-game-settings-password a-game-settings-password-first">
            <div class="a-game-settings-item">
                <input type="password" placeholder="密码">
            </div>
        </div>
        <div class="a-game-settings-password a-game-settings-password-second">
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
        this.$login_username = this.$login.find(".a-game-settings-username input");
        this.$login_password = this.$login.find(".a-game-settings-password input");
        this.$login_submit = this.$login.find(".a-game-settings-submit button");
        this.$login_error_message = this.$login.find(".a-game-settings-error-messages");
        this.$login_register = this.$login.find(".a-game-settings-option");

        this.$login.hide();

        this.$register = this.$settings.find('.a-game-settings-register');
        this.$register_username = this.$register.find(".a-game-settings-username input");
        this.$register_password = this.$register.find(".a-game-settings-password-first input");
        this.$register_password_confirm = this.$register.find(".a-game-settings-password-second input");
        this.$register_submit = this.$register.find(".a-game-settings-submit button");
        this.$register_error_message = this.$register.find(".a-game-settings-error-messages");
        this.$register_login = this.$register.find(".a-game-settings-option");

        this.$register.hide();

        this.root.$a_game.append(this.$settings);

        this.start();
    }

    start() {
        this.getinfo();
        this.add_listening_events();
    }

    add_listening_events () {
        this.add_listening_events_login();
        this.add_listening_events_register();
    }
    add_listening_events_login () {  /* 绑定登录函数 */
        let outer = this;

        this.$login_register.click(function () {
            outer.register();
        })
    }
    add_listening_events_register () {  /* 绑定注册函数 */
        let outer = this;

        this.$register_login.click(function () {
            outer.login();
        })
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
