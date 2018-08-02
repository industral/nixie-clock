#include <Wire.h>

#include <Time.h>
#include <TimeLib.h>

int I2C_HH_MM_PORT = 0x20;
int I2C_SS_PORT = 0x24;

int I2C_IODIR_A = 0x0;
int I2C_GPIO_A = 0x12;

int I2C_BUFFER_LENGTH = 3;

struct TIME {
  String hh;
  String mm;
  String ss;
};

void setup() {
  //setTime(14, 27, 00, 14, 12, 2015);

  Serial.begin(9600);
  Wire.begin();

  byte buffer_zero[] = {I2C_IODIR_A, 0x0, 0x0};

  Wire.beginTransmission(I2C_HH_MM_PORT);
  Wire.write(buffer_zero, I2C_BUFFER_LENGTH);
  Wire.endTransmission();

  Wire.beginTransmission(I2C_SS_PORT);
  Wire.write(buffer_zero, I2C_BUFFER_LENGTH);
  Wire.endTransmission();
}

void loop() {
  TIME time = getTime(now());

  Wire.beginTransmission(I2C_HH_MM_PORT);
  byte buffer_hh_mm[] = {I2C_GPIO_A, getDigits(time.hh), getDigits(time.mm)};
  Wire.write(buffer_hh_mm, I2C_BUFFER_LENGTH);
  Wire.endTransmission();

  Wire.beginTransmission(I2C_SS_PORT);
  byte buffer_ss[] = {I2C_GPIO_A, getDigits(time.ss), 0x0};
  Wire.write(buffer_ss, I2C_BUFFER_LENGTH);
  Wire.endTransmission();

  delay(1000);
}

TIME getTime(time_t timestamp) {
  String hh = formatNumberAsString(hour(timestamp));
  String mm = formatNumberAsString(minute(timestamp));
  String ss = formatNumberAsString(second(timestamp));

  return (TIME) {
    hh, mm, ss
  };
}

int getDigits(String str) {
  int s1 = String(str.charAt(0)).toInt();
  int s2 = String(str.charAt(1)).toInt();

  return (s2 << 4) + s1;
}

String formatNumberAsString(int number) {
  String str = '0' + String(number);
  return str.substring(str.length() - 2);
}
