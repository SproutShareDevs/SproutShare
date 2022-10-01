FROM node:16.17.0

EXPOSE 19000

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH /home/node/.npm-global/bin:$PATH
RUN npm i --unsafe-perm --allow-root -g npm@8.15.0 expo-cli@latest

ENV EXPO_DEVTOOLS_LISTEN_ADDRESS=host.docker.internal
#ENV REACT_NATIVE_PACKAGER_HOSTNAME = 192.168.39.199
RUN mkdir /home/sproutshare-client


WORKDIR /home/sproutshare-client
ENV PATH /home/sproutshare-client/.bin:$PATH
COPY package*.json /home/sproutshare-client/
RUN npm install

COPY . /home/sproutshare-client/
CMD ["npm", "start"]