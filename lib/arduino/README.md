# Arduino


### I2C pins

| Board  | I2C pins |
| ------------- | ------------- |
| Uno, Ethernet  | A4 (SDA), A5 (SCL)  |
| Mega2560  | 20 (SDA), 21 (SCL)  |
| Leonardo  | 2 (SDA), 3 (SCL)  |
| Due  | 20 (SDA), 21 (SCL)  |


### Arduino setup

1. Install [Arduino IDE](https://www.arduino.cc/en/Main/Software)
2. Install CH34x driver if needed for Arduino clones, e.g. bought form China, not original one
3. Set correct settings in Arduino IDE

e.g, for Arduno Nano from China:
* Tools -> Board: Arduino Nano
* Tools -> Processor: ATmega328P (Old Boot)
* Tools -> Port: /dev/cu.wchusbserial14* (for macOS)
* Tools -> Programmer: AVRISP mkll

