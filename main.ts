/**
 * Infra-red Control Mode
 */
IrRemote.onPressEvent(RemoteButton.D, function () {
    basic.showLeds(`
        . . # . .
        . # . . .
        # # # # #
        . # . . .
        . . # . .
        `)
    magicbit.MotorRunDual(magicbit.Motors.M1, 150, magicbit.Motors.M4, -150)
})
/**
 * Control which program to run
 */
input.onButtonPressed(Button.A, function () {
    numProgram = (numProgram + 1) % 3
    magicbit.MotorRunDual(magicbit.Motors.M1, 0, magicbit.Motors.M4, 0)
    basic.showString("" + (numProgram))
    basic.pause(1000)
    magicbit.MotorRunDual(magicbit.Motors.M1, 0, magicbit.Motors.M4, 0)
})
IrRemote.onPressEvent(RemoteButton.UP, function () {
    basic.showLeds(`
        . . . . .
        . . . . .
        # # # # #
        . . . . .
        . . . . .
        `)
    magicbit.MotorRunDual(magicbit.Motors.M1, 0, magicbit.Motors.M4, 0)
})
IrRemote.onPressEvent(RemoteButton.A, function () {
    basic.showLeds(`
        . . # . .
        . # # # .
        # . # . #
        . . # . .
        . . # . .
        `)
    magicbit.MotorRunDual(magicbit.Motors.M1, 150, magicbit.Motors.M4, 150)
})
IrRemote.onPressEvent(RemoteButton.B, function () {
    basic.showLeds(`
        . . # . .
        . . # . .
        # . # . #
        . # # # .
        . . # . .
        `)
    magicbit.MotorRunDual(magicbit.Motors.M1, -150, magicbit.Motors.M4, -150)
})
IrRemote.onPressEvent(RemoteButton.C, function () {
    basic.showLeds(`
        . . # . .
        . . . # .
        # # # # #
        . . . # .
        . . # . .
        `)
    magicbit.MotorRunDual(magicbit.Motors.M1, -150, magicbit.Motors.M4, 150)
})
let ultraDistance = 0
let numProgram = 0
music.setVolume(135)
numProgram = 0
IrRemote.init(Pins.P1)
/**
 * Ultra sonic
 * 
 * Robot sumo mode
 */
basic.forever(function () {
    if (numProgram == 0) {
        pins.digitalWritePin(DigitalPin.P12, 1)
        basic.pause(100)
        pins.digitalWritePin(DigitalPin.P12, 0)
        ultraDistance = pins.pulseIn(DigitalPin.P2, PulseValue.High) / 58
        if (ultraDistance > 20) {
            if (randint(0, 1) == 0) {
                magicbit.MotorRunDual(magicbit.Motors.M1, 120, magicbit.Motors.M4, -120)
                magicbit.Servo(magicbit.Servos.S1, 0)
            } else {
                magicbit.Servo(magicbit.Servos.S1, 180)
                magicbit.MotorRunDual(magicbit.Motors.M1, -120, magicbit.Motors.M4, 120)
            }
        } else if (ultraDistance < 5) {
            magicbit.MotorRunDual(magicbit.Motors.M1, -150, magicbit.Motors.M4, -130)
            basic.pause(100)
            magicbit.MotorRunDual(magicbit.Motors.M1, -120, magicbit.Motors.M4, 120)
            basic.pause(randint(200, 1000))
        } else {
            magicbit.Servo(magicbit.Servos.S1, 90)
            magicbit.MotorRunDual(magicbit.Motors.M1, 150, magicbit.Motors.M4, 150)
        }
    }
})
