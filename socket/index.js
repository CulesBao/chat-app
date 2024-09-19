import { Server } from "socket.io";

const io = new Server({ cors: "http://localhost:5173" });
let onlineUsers = []

io.on("connection", (socket) => {
    console.log("A user connected ", `${socket.id}`);
    socket.on("addOnlineUser", (userId) => {
      // console.log('userId', userId)
      if (!onlineUsers.some(user => user.id === userId) && userId != null) {
          onlineUsers.push({
              id: userId,
              socketId: socket.id
          });
          // console.log(onlineUsers)
      }
      io.emit("getOnlineUsers", onlineUsers)
    })
    socket.on("disconnect", () => {
      console.log('dang xuat', socket.id)
      onlineUsers = onlineUsers.filter(user => user.socketId != socket.id)
      io.emit("getOnlineUsers", onlineUsers)
    })
    socket.on('sendMessage', (message) => {
      const user = onlineUsers?.find(user => user.id == message.recipientId)
      if (user){
        io.to(user.socketId).emit('getMessage', message)
      }
    })
});

io.listen(4000);