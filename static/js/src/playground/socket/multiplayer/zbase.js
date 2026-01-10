class MultiPlayerSocket {
    constructor(playground) {
        this.playground = playground;
        this.ws = new WebSocket("wss://app3749.acapp.acwing.com.cn/wss/multiplayer/");

        this.start();
    }

    start() {

    }

    send_create_player() {
        this.ws.send(JSON.stringify({
            "message" : "hello app server",
        }));
    }

    receive_create_player() {

    }
}