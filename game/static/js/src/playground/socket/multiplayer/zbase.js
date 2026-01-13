class MultiPlayerSocket {
    constructor(playground) {
        this.playground = playground;
        this.ws = new WebSocket("wss://app3749.acapp.acwing.com.cn/wss/multiplayer/");

        this.start();
    }

    start() {

    }

    send_create_player() {
        let outer = this;
        this.ws.send(JSON.stringify({
            "message" : "hello app server",
            "event": "create_player",
            'uuid': outer.uuid,  // 在 playerground 赋值
        }));
    }

    receive_create_player() {

    }
}