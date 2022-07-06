const webSocket = require('ws');


const createChatServer = server =>{
    const wsServer = new webSocket.Server({server});
    const map = new Map();

    wsServer.on('connection', (ws, req)=>{

        map.set(ws, {name:''});

        ws.on('message', message=>{
            const mObj = map.get(ws);
            let msg = '';

            if(!mObj.name){
                mObj.name = message.toString();
                msg = `${mObj.name} 進入聊天室, ${wsServer.clients.size}`;
            } else {
                msg = `${mObj.name}: ${message}`;
            }
            wsServer.clients.forEach( c=>{
                if(c.readyState===webSocket.OPEN){
                    c.send(msg);
                }
            })
        });
        ws.on('close', (event)=>{
            console.log({event});
            console.log('close 連線數', wsServer.clients.size);
        })

    });

};

module.exports = createChatServer;