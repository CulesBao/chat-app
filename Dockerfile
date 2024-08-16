FROM node:18.20.3
# tao folder tren container
WORKDIR /chat-app

# sao chep package.json va package-lock.json de lo sau nay build lai container thi do ton thoi gian
COPY client/package.json /chat-app/client/
COPY client/package-lock.json /chat-app/client/
COPY server/package.json /chat-app/server/
COPY server/package-lock.json /chat-app/server/

# tai cac module can thiet de run app
RUN cd /chat-app/client && npm install
RUN cd /chat-app/server && npm install

# copy source code -> /sgroup tren container
COPY . /chat-app/

# sao chep script start.sh
COPY start.sh /chat-app/start.sh

# cho phep script duoc chay
RUN chmod +x /chat-app/start.sh

# chon cong de xuat img
EXPOSE 3000
EXPOSE 5173

# chay cmd de run app
CMD ["/chat-app/start.sh"]