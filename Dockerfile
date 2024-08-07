FROM node:18.20.3

# sao chep package.json va package-lock.json de lo sau nay build lai container thi do ton thoi gian
COPY package.json /
COPY package-lock.json /

# tai cac module can thiet de run app
RUN npm install

# tao folder tren container
WORKDIR /chat-app

# copy source code -> /sgroup tren container
COPY . /chat-app/

# chon cong de xuat img
EXPOSE 3000

# chay cmd de run app
CMD [ "npm", "start" ]