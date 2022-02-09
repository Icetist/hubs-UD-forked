# [Mozilla hubs](https://github.com/mozilla/hubs) client for login with unstoppable domain

https://user-images.githubusercontent.com/29994250/153095160-d725088a-dbce-4e8f-b8d7-27a86ccca4b1.mp4

Discord ID: spiritbro1#1101

Unstoppable Domain Registered email address: 3aml5sclu@mozmail.com

Mozilla hubs is a 3d meeting tool by mozilla, you can basically create your own 3d environment as you like, in this repository im showing you how you can login with unstoppable and use it as your avatar name and also you can show your NFT, to show off to your friend and you can also open a link to the opensea for that NFT in case your friend want to buy it later.

## Prerequisites

- [Node.js version 16.13.0](https://nodejs.org/download/release/v16.13.0/)
- [Mozilla Browser](mozilla.org/)
- [Metamask](https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/)
- [Unstoppable domain account](https://docs.unstoppabledomains.com/login-with-unstoppable/getting-login-credentials)
- [Moralis Account](https://moralis.io/)
- [Infura](https://infura.io/)
- WSL for windows or terminal for linux

First you need to create `.env` file and create this variable :

```
CLIENT_ID=# you can get this from unstoppable domain application that you submit earlier
CLIENT_SECRET=# you can get this from unstoppable domain application that you submit earlier
REDIRECT_URIS=# you can get this from unstoppable domain application that you submit earlier
MORALIS_KEY=# you can get this on moralis admin
INFURA_ID=# you can get this from infura dashboard
```
After that if you use windows open `C:\Windows\System32\Drivers\etc\hosts` in administrator mode or if you use linux open `/etc/hosts` and add this in the last line:

```
127.0.0.1 hubs.local
```

After that open your terminal and run this :

```bash
npm install
npm run dev
```

After it's said `Compile with warnings` open your firefox browser(for now it can only be used in firefox) and open `https://hubs.local:8080` :

![image](https://user-images.githubusercontent.com/29994250/153097894-81821099-eb36-4b23-b4af-fc05240ae9e0.png)

click `Accept risk and continue` after that you will see something like this :

![image](https://user-images.githubusercontent.com/29994250/153097969-27c89e61-6cd3-4cfb-8903-b264a4056e93.png)

Click create room to create room, then you will see something like this :

![image](https://user-images.githubusercontent.com/29994250/153098334-f55e5620-e231-42e2-bbf9-0ce7ce72c707.png)

Now click login with unstoppable and login with your name after login click people tab on the right corner of your screen and you can see that your unstoppable domain name is being used as your avatar name:

![image](https://user-images.githubusercontent.com/29994250/153098535-5ba2d857-0ee1-4db0-951d-0309f2a17c81.png)

And if you click on `NFT` tab you can see your whole NFT collection :

![image](https://user-images.githubusercontent.com/29994250/153098622-eda594f8-02ec-4674-8a15-cf4b5d0a88fe.png)

And if you click one of them it will show in front of you :

![image](https://user-images.githubusercontent.com/29994250/153098693-72e19adf-889e-4cd1-9481-006af0d0d937.png)

And if you hold `space` in your keyboard in front of your spawned NFT it will show `open link` button which then will redirect you to opensea link of that NFT

![image](https://user-images.githubusercontent.com/29994250/153098859-cb4708f9-c3f2-485f-bc17-557f18387c59.png)

![image](https://user-images.githubusercontent.com/29994250/153098909-a76cee6b-6b86-412c-9f53-fd29d2000887.png)

If you want to logout you can do so by clicking `leave` button on the right bottom corner:

![image](https://user-images.githubusercontent.com/29994250/153099090-53ffe04b-dbb4-42af-b91b-cd8fd125f77e.png)

# Conclusion

After you finish developing it or successfully run it obviously you want to deploy it to production in order to do that you can follow the official mozilla hubs instruction for this https://hubs.mozilla.com/docs/hubs-cloud-custom-clients.html unfortunately because i dont have any AWS or digitalocean account i can't show it to you how it look like when it's deployed, but of course it will work if you do it right.





