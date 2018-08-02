#include <unistd.h>
#include <stdio.h>
#include <fcntl.h>
#include <linux/i2c-dev.h>
#include <time.h>

char *i2c_dev = "/dev/i2c-1";

int I2C_HH_MM_PORT = 0x20;
int I2C_SS_PORT = 0x24;

int I2C_IODIR_A = 0x0;
int I2C_GPIO_A = 0x12;

int file_i2c_1;
int file_i2c_2;

struct stringTimeFormat {
    char hh[3];
    char mm[3];
    char ss[3];
};

struct stringTimeFormat getStringTimeFormat() {
    time_t rawtime;
    struct tm *timeinfo;

    time(&rawtime);
    timeinfo = localtime(&rawtime);

    struct stringTimeFormat t;
    strftime(t.hh, 3, "%H", timeinfo);
    strftime(t.mm, 3, "%M", timeinfo);
    strftime(t.ss, 3, "%S", timeinfo);

    return t;
}

int getDigits(char *number) {
    int i1 = number[0] - '0';
    int i2 = number[1] - '0';

    return (i2 << 4) + i1;
}

int main() {
    const int BUFFER_LENGTH = 3;

    if ((file_i2c_1 = open(i2c_dev, O_RDWR)) < 0) {
        printf("Failed to open the i2c bus 1\n"); return 1;
    }

    if ((file_i2c_2 = open(i2c_dev, O_RDWR)) < 0) {
        printf("Failed to open the i2c bus 2\n"); return 1;
    }

    if (ioctl(file_i2c_1, I2C_SLAVE, I2C_HH_MM_PORT) < 0) {
        printf("Failed to acquire bus access for I2C_HH_MM_PORT.\n"); return 1;
    }

    if (ioctl(file_i2c_2, I2C_SLAVE, I2C_SS_PORT) < 0) {
        printf("Failed to acquire bus access for I2C_HH_MM_PORT.\n"); return 1;
    }

    unsigned char buffer_zero[] = {I2C_IODIR_A, 0, 0};

    if (write(file_i2c_1, buffer_zero, BUFFER_LENGTH) != BUFFER_LENGTH) {
        printf("Failed to write I2C_IODIR_A\n"); return 1;
    }

    if (write(file_i2c_2, buffer_zero, BUFFER_LENGTH) != BUFFER_LENGTH) {
        printf("Failed to write I2C_IODIR_A 2\n"); return 1;
    }

    struct timespec delay_ts;
    delay_ts.tv_sec = 1;
    delay_ts.tv_nsec = 0;

    while (1) {
        struct stringTimeFormat s = getStringTimeFormat();

        int hhDigits = getDigits(s.hh);
        int mmDigits = getDigits(s.mm);
        int ssDigits = getDigits(s.ss);

        unsigned char buffer_hh_mm[] = {I2C_GPIO_A, hhDigits, mmDigits};

        if (write(file_i2c_1, buffer_hh_mm, BUFFER_LENGTH) != BUFFER_LENGTH) {
            printf("Failed to write to I2C_GPIO_A.\n");
        }

        unsigned char buffer_ss[] = {I2C_GPIO_A, ssDigits, 0};

        if (write(file_i2c_2, buffer_ss, BUFFER_LENGTH) != BUFFER_LENGTH) {
            printf("Failed to write to I2C_GPIO_A 2.\n");
        }

        nanosleep(&delay_ts, NULL);
    }

    return 0;
}

