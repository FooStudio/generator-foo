/**
 * Helper Class to facilitate the use of keyboard KeyCodes
 *
 *      import KeyCode from "foo/utils/keys/KeyCode"
 *
 *      window.addEventListener("keydown", onKeyDown );
 *
 *      onKeyDown(event){
 *          if(event.keyCode === KeyCode.ENTER){
 *              console.log("Enter pressed");
 *          }
 *      }
 *
 * @class KeyCode
 * @namespace utils.keys
 */
export default class KeyCode {
    /**
     * @property TAB
     * @static
     * @type {number}
     * @default 9
     */
    static TAB = 9;
    /**
     * @property CAPS_LOCK
     * @static
     * @type {number}
     * @default 20
     */
    static CAPS_LOCK = 20;
    /**
     * @property SHIFT
     * @static
     * @type {number}
     * @default 16
     */
    static SHIFT = 16;
    /**
     * @property CONTROL
     * @static
     * @type {number}
     * @default 17
     */
    static CONTROL = 17;
    /**
     * @property SPACE
     * @static
     * @type {number}
     * @default 32
     */
    static SPACE = 32;
    /**
     * @property DOWN
     * @static
     * @type {number}
     * @default 40
     */
    static DOWN = 40;
    /**
     * @property UP
     * @static
     * @type {number}
     * @default 38
     */
    static UP = 38;
    /**
     * @property LEFT
     * @static
     * @type {number}
     * @default 37
     */
    static LEFT = 37;
    /**
     * @property RIGHT
     * @static
     * @type {number}
     * @default 39
     */
    static RIGHT = 39;
    /**
     * @property ESCAPE
     * @static
     * @type {number}
     * @default 27
     */
    static ESCAPE = 27;
    /**
     * @property F1
     * @static
     * @type {number}
     * @default 112
     */
    static F1 = 112;
    /**
     * @property F2
     * @static
     * @type {number}
     * @default 113
     */
    static F2 = 113;
    /**
     * @property F3
     * @static
     * @type {number}
     * @default 114
     */
    static F3 = 114;
    /**
     * @property F4
     * @static
     * @type {number}
     * @default 115
     */
    static F4 = 115;
    /**
     * @property F5
     * @static
     * @type {number}
     * @default 116
     */
    static F5 = 116;
    /**
     * @property F6
     * @static
     * @type {number}
     * @default 117
     */
    static F6 = 117;
    /**
     * @property F7
     * @static
     * @type {number}
     * @default 118
     */
    static F7 = 118;
    /**
     * @property F8
     * @static
     * @type {number}
     * @default 119
     */
    static F8 = 119;
    /**
     * @property F9
     * @static
     * @type {number}
     * @default 120
     */
    static F9 = 120;
    /**
     * @property F10
     * @static
     * @type {number}
     * @default 121
     */
    static F10 = 121;
    /**
     * @property F11
     * @static
     * @type {number}
     * @default 122
     */
    static F11 = 122;
    /**
     * @property F12
     * @static
     * @type {number}
     * @default 123
     */
    static F12 = 123;
    /**
     * @property INSERT
     * @static
     * @type {number}
     * @default 45
     */
    static INSERT = 45;
    /**
     * @property HOME
     * @static
     * @type {number}
     * @default 36
     */
    static HOME = 36;
    /**
     * @property PAGE_UP
     * @static
     * @type {number}
     * @default 33
     */
    static PAGE_UP = 33;
    /**
     * @property PAGE_DOWN
     * @static
     * @type {number}
     * @default 34
     */
    static PAGE_DOWN = 34;
    /**
     * @property DELETE
     * @static
     * @type {number}
     * @default 46
     */
    static DELETE = 46;
    /**
     * @property END
     * @static
     * @type {number}
     * @default 35
     */
    static END = 35;
    /**
     * @property ENTER
     * @static
     * @type {number}
     * @default 13
     */
    static ENTER = 13;
    /**
     * @property BACKSPACE
     * @static
     * @type {number}
     * @default 8
     */
    static BACKSPACE = 8;
    /**
     * @property NUMPAD_0
     * @static
     * @type {number}
     * @default 96
     */
    static NUMPAD_0 = 96;
    /**
     * @property NUMPAD_1
     * @static
     * @type {number}
     * @default 97
     */
    static NUMPAD_1 = 97;
    /**
     * @property NUMPAD_2
     * @static
     * @type {number}
     * @default 98
     */
    static NUMPAD_2 = 98;
    /**
     * @property NUMPAD_3
     * @static
     * @type {number}
     * @default 99
     */
    static NUMPAD_3 = 99;
    /**
     * @property NUMPAD_4
     * @static
     * @type {number}
     * @default 100
     */
    static NUMPAD_4 = 100;
    /**
     * @property NUMPAD_5
     * @static
     * @type {number}
     * @default 101
     */
    static NUMPAD_5 = 101;
    /**
     * @property NUMPAD_6
     * @static
     * @type {number}
     * @default 102
     */
    static NUMPAD_6 = 102;
    /**
     * @property NUMPAD_7
     * @static
     * @type {number}
     * @default 103
     */
    static NUMPAD_7 = 103;
    /**
     * @property NUMPAD_8
     * @static
     * @type {number}
     * @default 104
     */
    static NUMPAD_8 = 104;
    /**
     * @property NUMPAD_9
     * @static
     * @type {number}
     * @default 105
     */
    static NUMPAD_9 = 105;
    /**
     * @property NUMPAD_DIVIDE
     * @static
     * @type {number}
     * @default 111
     */
    static NUMPAD_DIVIDE = 111;
    /**
     * @property NUMPAD_ADD
     * @static
     * @type {number}
     * @default 107
     */
    static NUMPAD_ADD = 107;
    /**
     * @property NUMPAD_ENTER
     * @static
     * @type {number}
     * @default 13
     */
    static NUMPAD_ENTER = 13;
    /**
     * @property NUMPAD_DECIMAL
     * @static
     * @type {number}
     * @default 110
     */
    static NUMPAD_DECIMAL = 110;
    /**
     * @property NUMPAD_SUBTRACT
     * @static
     * @type {number}
     * @default 109
     */
    static NUMPAD_SUBTRACT = 109;
    /**
     * @property NUMPAD_MULTIPLY
     * @static
     * @type {number}
     * @default 106
     */
    static NUMPAD_MULTIPLY = 106;

    /**
     * @property SEMICOLON
     * @static
     * @type {number}
     * @default 186
     */
    static SEMICOLON = 186;
    /**
     * @property EQUAL
     * @static
     * @type {number}
     * @default 187
     */
    static EQUAL = 187;
    /**
     * @property COMMA
     * @static
     * @type {number}
     * @default 188
     */
    static COMMA = 188;
    /**
     * @property MINUS
     * @static
     * @type {number}
     * @default 189
     */
    static MINUS = 189;
    /**
     * @property PERIOD
     * @static
     * @type {number}
     * @default 190
     */
    static PERIOD = 190;
    /**
     * @property SLASH
     * @static
     * @type {number}
     * @default 191
     */
    static SLASH = 191;
    /**
     * @property BACKQUOTE
     * @static
     * @type {number}
     * @default 192
     */
    static BACKQUOTE = 192;
    /**
     * @property LEFTBRACKET
     * @static
     * @type {number}
     * @default 219
     */
    static LEFTBRACKET = 219;
    /**
     * @property BACKSLASH
     * @static
     * @type {number}
     * @default 220
     */
    static BACKSLASH = 220;
    /**
     * @property RIGHTBRACKET
     * @static
     * @type {number}
     * @default 221
     */
    static RIGHTBRACKET = 221;
    /**
     * @property QUOTE
     * @static
     * @type {number}
     * @default 222
     */
    static QUOTE = 222;
    /**
     * @property ALT
     * @static
     * @type {number}
     * @default 18
     */
    static ALT = 18;
    /**
     * @property COMMAND
     * @static
     * @type {number}
     * @default 15
     */
    static COMMAND = 15;
    /**
     * @property NUMPAD
     * @static
     * @type {number}
     * @default 21
     */
    static NUMPAD = 21;


    /**
     * @property A
     * @static
     * @type {number}
     * @default 65
     */
    static A = 65;
    /**
     * @property B
     * @static
     * @type {number}
     * @default 66
     */
    static B = 66;
    /**
     * @property C
     * @static
     * @type {number}
     * @default 67
     */
    static C = 67;
    /**
     * @property D
     * @static
     * @type {number}
     * @default 68
     */
    static D = 68;
    /**
     * @property E
     * @static
     * @type {number}
     * @default 69
     */
    static E = 69;
    /**
     * @property F
     * @static
     * @type {number}
     * @default 70
     */
    static F = 70;
    /**
     * @property G
     * @static
     * @type {number}
     * @default 71
     */
    static G = 71;
    /**
     * @property H
     * @static
     * @type {number}
     * @default 72
     */
    static H = 72;
    /**
     * @property I
     * @static
     * @type {number}
     * @default 73
     */
    static I = 73;
    /**
     * @property J
     * @static
     * @type {number}
     * @default 74
     */
    static J = 74;
    /**
     * @property K
     * @static
     * @type {number}
     * @default 75
     */
    static K = 75;
    /**
     * @property L
     * @static
     * @type {number}
     * @default 76
     */
    static L = 76;
    /**
     * @property M
     * @static
     * @type {number}
     * @default 77
     */
    static M = 77;
    /**
     * @property N
     * @static
     * @type {number}
     * @default 78
     */
    static N = 78;
    /**
     * @property O
     * @static
     * @type {number}
     * @default 79
     */
    static O = 79;
    /**
     * @property P
     * @static
     * @type {number}
     * @default 80
     */
    static P = 80;
    /**
     * @property Q
     * @static
     * @type {number}
     * @default 81
     */
    static Q = 81;
    /**
     * @property R
     * @static
     * @type {number}
     * @default 82
     */
    static R = 82;
    /**
     * @property S
     * @static
     * @type {number}
     * @default 83
     */
    static S = 83;
    /**
     * @property T
     * @static
     * @type {number}
     * @default 84
     */
    static T = 84;
    /**
     * @property U
     * @static
     * @type {number}
     * @default 85
     */
    static U = 85;
    /**
     * @property V
     * @static
     * @type {number}
     * @default 86
     */
    static V = 86;
    /**
     * @property W
     * @static
     * @type {number}
     * @default 87
     */
    static W = 87;
    /**
     * @property X
     * @static
     * @type {number}
     * @default 88
     */
    static X = 88;
    /**
     * @property Y
     * @static
     * @type {number}
     * @default 89
     */
    static Y = 89;
    /**
     * @property Z
     * @static
     * @type {number}
     * @default 90
     */
    static Z = 90;


    /**
     * @property NUM_0
     * @static
     * @type {number}
     * @default 48
     */
    static NUM_0 = 48;
    /**
     * @property NUM_1
     * @static
     * @type {number}
     * @default 49
     */
    static NUM_1 = 49;
    /**
     * @property NUM_2
     * @static
     * @type {number}
     * @default 50
     */
    static NUM_2 = 50;
    /**
     * @property NUM_3
     * @static
     * @type {number}
     * @default 51
     */
    static NUM_3 = 51;
    /**
     * @property NUM_4
     * @static
     * @type {number}
     * @default 52
     */
    static NUM_4 = 52;
    /**
     * @property NUM_5
     * @static
     * @type {number}
     * @default 53
     */
    static NUM_5 = 53;
    /**
     * @property NUM_6
     * @static
     * @type {number}
     * @default 54
     */
    static NUM_6 = 54;
    /**
     * @property NUM_7
     * @static
     * @type {number}
     * @default 55
     */
    static NUM_7 = 55;
    /**
     * @property NUM_8
     * @static
     * @type {number}
     * @default 17
     */
    static NUM_8 = 56;
    /**
     * @property NUM_9
     * @static
     * @type {number}
     * @default 17
     */
    static NUM_9 = 57;

    /**
     * @property SUBSTRACT
     * @static
     * @type {number}
     * @default 189
     */
    static SUBSTRACT = 189;
    /**
     * @property ADD
     * @static
     * @type {number}
     * @default 187
     */
    static ADD = 187;
}

