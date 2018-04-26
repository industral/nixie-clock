# Nixie Clock

Clock software for any GPIO device for the following [schematic](https://easyeda.com/industral/Nixie_Clock-a5c03f6d59a54d3baa4bdf06cb338afd)

![Schematic](https://easyeda.com/normal/Schematic-182156bbd35f40678ec455371977dfc3)


### Developing

On working machine share you folder via SMB.

On macOS it's `Preferences -> Sharing -> File Sharing`. 
Select folder, and in `Options` select `SMB` and enable your account. Enter password.


On **Raspberry Pi** mount that folder :


```
sudo mount -t cifs //YOUR_IP/YOUR_PATH /mnt -o user=YOUR_USER,uid=$(id -u `whoami`),gid=$(id -g `whoami`)
```

for example:


```
sudo mount -t cifs //192.168.0.14/nixie-clock /mnt -o user=alex,uid=$(id -u `whoami`),gid=$(id -g `whoami`)
```


Where, **YOUR_USER** is a user on dev machine.


You can install all npm modules directly on dev machine, then just remove from `node_modules/epoll`
and reinstall on Raspberry Pi via `npm i epoll`


Test on Raspberry Pi can be run via `./node_modules/mocha/bin/mocha`


sudo timedatectl set-ntp True
sudo dpkg-reconfigure tzdata

