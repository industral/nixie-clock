# Nixie Clock

Nixie Clock controlling via I²C bus.

Project consist from 2 parts:

* Hardware ([PCB](https://en.wikipedia.org/wiki/Printed_circuit_board) + any [I²C](https://en.wikipedia.org/wiki/I%C2%B2C) control device)
* Software (currently only for [SBC](https://en.wikipedia.org/wiki/Single-board_computer))

## Hardware

Hardware part consist from 2 parts:

* [Custom PCB](#custom-pcb)
* [I²C Device](#i2c-device)

### Custom PCB

Custom PCB contains all required drivers and [Nixie Tubes](https://en.wikipedia.org/wiki/Nixie_tube), in other words - your clock.

Project within Schematic and PCB is located [here](https://easyeda.com/industral/nixie-clock)

**Schematic**
![Schematic](https://image.easyeda.com/histories/ebf0ae74b1e647679ec340c16ef4df52.png) 

**PCB**
![PCB](https://image.easyeda.com/histories/0508fdebd4ff43b789647696a5a8f821.png)


### I2C Device

Any device that has I²C support (usually has [GPIO](https://en.wikipedia.org/wiki/General-purpose_input/output)).
You can use any [SBC](https://en.wikipedia.org/wiki/Single-board_computer) like [Raspberry Pi](https://en.wikipedia.org/wiki/Raspberry_Pi), [Banana Pi](https://en.wikipedia.org/wiki/Banana_Pi) and others or use [single-bord microcontroller](https://en.wikipedia.org/wiki/Single-board_microcontroller) like [Arduino](https://en.wikipedia.org/wiki/Arduino), or even use your own developed board within microcontroller for I²C communication.

  
## Software

If you use SBC that has [OS](https://en.wikipedia.org/wiki/Operating_system) running on, e.g. Linux, and has I²C - you can use software located [here on GitHub](https://github.com/industral/nixie-clock).
You have to upload it into your chosen I²C device, build it and run it.
Using custom I²C device - will require to write your own code in order to control clock via I²C.

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
sudo mount -t cifs //192.168.0.200/nixie-clock /mnt -o user=alex,uid=$(id -u `whoami`),gid=$(id -g `whoami`)
```


Where, **YOUR_USER** is a user on dev machine.


You can install all npm modules directly on dev machine, then just remove from `node_modules/epoll`
and reinstall on Raspberry Pi via `npm i epoll`


Test on Raspberry Pi can be run via `./node_modules/mocha/bin/mocha`


sudo timedatectl set-ntp True
sudo dpkg-reconfigure tzdata

