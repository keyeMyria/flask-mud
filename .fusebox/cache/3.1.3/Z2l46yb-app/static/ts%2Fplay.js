module.exports = { contents: "\"use strict\";\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst $ = require(\"jquery\");\n//import * as io from \"socket.io-client\";\nconst io = require(\"socket.io-client\");\nclass Play {\n    constructor() {\n        this.socket = io.connect('http://' + document.domain + ':' + location.port + '/play');\n        this.socket.on('connect', () => {\n            this.on_connect();\n        });\n        this.socket.on('refresh', () => {\n            this.on_refresh();\n        });\n    }\n    run() {\n        let text = document.body.querySelector(\"#text\");\n        text.addEventListener('keypress', (e) => {\n            var code = e.keyCode || e.which;\n            if (code == 13) {\n                var inp = text.value;\n                text.value = '';\n                this.socket.emit('client_text', { text: inp });\n            }\n        });\n    }\n    on_connect() {\n        this.socket.emit('client_connected', {});\n    }\n    on_refresh() {\n        $.ajax({\n            url: \"/messages\",\n            type: \"get\",\n            success: function (response) {\n                $(\"#message-box\").html(response);\n            },\n            error: function (xhr) {\n                console.log(xhr);\n            }\n        }).done(function () {\n            $('#message-box').scrollTop($('#message-box')[0].scrollHeight);\n        });\n    }\n    on_send() {\n        console.log(\"HEYOOOOO\");\n    }\n    leave_room() {\n        this.socket.emit('left', {}, () => {\n            this.socket.disconnect();\n            window.location.href = '/leave_room';\n        });\n    }\n}\nexports.Play = Play;\n",
dependencies: ["jquery","socket.io-client"],
sourceMap: {},
headerContent: undefined,
mtime: 1521151311013,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}