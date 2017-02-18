# Nixie Clock

Clock software for any GPIO device for the following [schematic](https://easyeda.com/industral/Nixie_Clock-a5c03f6d59a54d3baa4bdf06cb338afd)

![Schematic](https://easyeda.com/normal/Schematic-182156bbd35f40678ec455371977dfc3)


### Developing

On working machine share you folder via SMB (on macOS it's Preferences -> Sharing -> File Sharing).
On **Raspberry Pi** mount that folder 

`sudo mount -t cifs //YOUR_IP/YOUR_PATH /mnt -o user=YOUR_USER,uid=R_UID,gid=R_GID`

Where, **YOUR_USER** user on dev machine and **R_UID** and **R_GID** it's Raspberry Pi uid and gid.
You can find them via `id -u YOUR_USERNAME` and `id -g YOUR_USERNAME`

You can install all npm modules directly on dev machine, then just remove from `node_modules/epoll`
and reinstall on Raspberry Pi via `npm i epoll`

Test on Raspberry Pi can be run via `./node_modules/mocha/bin/mocha`
