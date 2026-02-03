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

        this.$acwing_login = this.$settings.find('.a-game-settings-acwing img')  // 绑定到AcWing图标


        this.root.$a_game.append(this.$settings);

        this.start();
    }

    start() {
        if (this.platform === "ACAPP") {
            this.getinfo_acapp();
        } else {
            if (this.root.access) {
                this.getinfo_web();
                this.refresh_jwt_token();
            } else {
                this.login();
            }
            this.add_listening_events();
        }
    }
    refresh_jwt_token() {  // 自动刷新逻辑
        setInterval(() => {
            $.ajax({
                url: "https://app3749.acapp.acwing.com.cn/settings/token/refresh/",
                type: "post",
                data: {
                    refresh: this.root.refresh,
                },
                success: resp => {
                    this.root.access = resp.access;
                    // console.log(resp);
                },
            });
        }, 4.5 * 60 * 1000);

        setTimeout(() => {
            $.ajax({
                url: "https://app3749.acapp.acwing.com.cn/settings/ranklist/",
                type: "get",
                headers: {
                    'Authorization': "Bearer " + this.root.access,
                },
                success: resp => {
                  console.log(resp);
                },
            });
        }, 5000);
    }

    add_listening_events () {
        let outer = this;
        this.add_listening_events_login();
        this.add_listening_events_register();

        this.$acwing_login.click(function (){  // 绑定事件
            outer.acwing_login();
        });
    }
    add_listening_events_login () {  /* 绑定登录函数 */
        let outer = this;

        this.$login_register.click(function () {
            outer.register();
        })

        this.$login_submit.click(function() {  /* 登录按钮绑定 */
            outer.login_on_remote();
        });
    }
    add_listening_events_register () {  /* 绑定注册函数 */
        let outer = this;

        this.$register_login.click(function () {
            outer.login();
        })
        this.$register_submit.click(function (){
            outer.register_on_remote();
        });
    }

    acwing_login() {
        $.ajax({
            url: "https://app3749.acapp.acwing.com.cn/settings/acwing/web/apply_code/",
            type: "GET",
            success: function (resp) {
                // console.log(resp);
                if (resp.result === "success") {
                    window.location.replace(resp.apply_code_url)  // 重定向
                }
            }
        });
    }
    login_on_remote() {  // 在远程服务器上登录
        let username = this.$login_username.val();
        let password = this.$login_password.val();
        this.$login_error_message.empty();  // 每次清空报错信息

        $.ajax({
           url: "https://app3749.acapp.acwing.com.cn/settings/token/",
            type: "post",
            data: {
               username: username,
               password: password,
            },
            success: resp => {  // 获取成功记录下access
               console.log(resp);
                this.root.access = resp.access;
                this.root.refresh = resp.refresh;
                this.refresh_jwt_token();
                this.getinfo_web();
            },
            error: () => {
               this.$login_error_message.html("用户名或密码错误");
            }
        });
    }

    register_on_remote(username, password) {  // 在远程服务器上注册
        username = username || this.$register_username.val();
        password = password || this.$register_password.val();
        let password_confirm = this.$register_password_confirm.val();
        this.$register_error_message.empty();

        $.ajax({
            url: "/settings/register/",
            type: "post",
            data: {
                username,
                password,
                password_confirm,
            },
            success: resp => {
                // console.log(resp);
                if (resp.result === "success") {
                    this.login_on_remote(username, password);
                } else {
                    this.$register_error_message.html(resp.result);
                }
            }
        });
    }

    logout_on_remote() {  // 在远程服务器上登出
        if (this.platform === "ACAPP") {
            this.root.AcWingOS.api.window.close();
        } else {
            this.root.access = "";
            this.root.refresh = "";
            location.href = "/";
        }
    }


    register() {  // 打开注册界面
        this.$login.hide();
        this.$register.show();
    }

    login() {  // 打开登录界面
        this.$register.hide();
        this.$login.show();
    }

    acapp_login(appid, redirect_uri, scope, state) {
        this.root.AcWingOS.api.oauth2.authorize(appid, redirect_uri, scope, state, resp => {
            // console.log(resp);
            if (resp.result === "success") {
                this.username = resp.username;
                this.photo = resp.photo;
                this.hide();
                this.root.menu.show();
                // console.log(resp);
                this.root.access = resp.access;
                this.root.refresh = resp.refresh;
                this.refresh_jwt_token();
            }
        });
    }

    getinfo_acapp () {
        let outer = this;

        $.ajax({
            url: "https://app3749.acapp.acwing.com.cn/settings/acwing/acapp/apply_code/",
            type: "GET",
            success: function (resp) {
                if (resp.result === "success") {
                    outer.acapp_login(resp.appid, resp.redirect_uri, resp.scope, resp.state);
                }
            }
        });
    }

    getinfo_web () {
        $.ajax({
            url: "https://app3749.acapp.acwing.com.cn/settings/getinfo/",
            type: "get",
            data: {
                platform: this.platform,
            },
            headers: {
                'Authorization': 'Bearer ' + this.root.access,  // Bearer 在setting.py定义的
            },
            success: resp => {
                if (resp.result === "success") {
                    console.log(resp);
                    this.username = resp.username;
                    this.photo = resp.photo;
                    this.hide();
                    this.root.menu.show();
                } else {
                    this.login();  // 返回登录界面
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
