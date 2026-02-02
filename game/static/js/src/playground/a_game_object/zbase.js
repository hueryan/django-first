let A_GAME_OBJECTS = [];

class AGameObject {
    constructor() {
        A_GAME_OBJECTS.push(this);

        this.has_called_start = false;  // 是否执行过start函数
        this.timedelta = 0;  // 当前帧距离上一帧的时间差
        this.uuid = this.create_uuid();

    }

    create_uuid() {
        let res = "";
        for (let i = 0; i < 8; i++) {
            let x = parseInt(Math.floor(Math.random() * 10));
            res += x;
        }
        return res;
    }
    start() {  // 只会在第一帧执行

    }

    update() {  // 每一帧执行一次

    }

    late_update() {  // 每一帧最后执行一次

    }

    on_destroy() {  // 在被销毁前执行一次

    }

    destroy() {  // 删除该物体
        this.on_destroy();
        for (let i = 0; i < A_GAME_OBJECTS.length; i++) {
            if (A_GAME_OBJECTS[i] === this) {
                A_GAME_OBJECTS.splice(i, 1);
                break;
            }
        }
    }
}

let last_timestamp;
let A_GAME_ANIMATION = function(timestamp) {
    for (let i = 0; i < A_GAME_OBJECTS.length; i++) {
        let obj = A_GAME_OBJECTS[i];
        if (!obj.has_called_start) {
            obj.start();
            obj.has_called_start = true;
        } else {
            obj.timedelta = timestamp - last_timestamp;
            obj.update();
        }
    }

    for (let i = 0; i < A_GAME_OBJECTS.length; i++) {
        let obj = A_GAME_OBJECTS[i];
        obj.late_update();
    }
    last_timestamp = timestamp;
    requestAnimationFrame(A_GAME_ANIMATION);
}

requestAnimationFrame(A_GAME_ANIMATION);