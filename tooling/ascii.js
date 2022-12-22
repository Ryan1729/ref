const data = `
0 	00 	NUL 	␀ 	^@ 	\\0 	Null
1 	01 	SOH 	␁ 	^A 		Start of Heading
2 	02 	STX 	␂ 	^B 		Start of Text
3 	03 	ETX 	␃ 	^C 		End of Text
4 	04 	EOT 	␄ 	^D 		End of Transmission
5 	05 	ENQ 	␅ 	^E 		Enquiry
6 	06 	ACK 	␆ 	^F 		Acknowledgement
7 	07 	BEL 	␇ 	^G 	\\a 	Bell
8 	08 	BS 	␈ 	^H 	\\b 	Backspace
9 	09 	HT	␉ 	^I 	\\t 	Horizontal Tab
10 	0A 	LF 	␤␊ 	^J 	\\n 	Line Feed
11 	0B 	VT 	␋ 	^K 	\\v 	Vertical Tab
12 	0C 	FF 	␌ 	^L 	\\f 	Form Feed
13 	0D 	CR 	␍ 	^M 	\\r 	Carriage Return
14 	0E 	SO 	␎ 	^N 		Shift Out
15 	0F 	SI 	␏ 	^O 		Shift In
16 	10 	DLE 	␐ 	^P 		Data Link Escape
17 	11 	DC1 	␑ 	^Q 		Device Control 1 (often XON)
18 	12 	DC2 	␒ 	^R 		Device Control 2
19 	13 	DC3 	␓ 	^S 		Device Control 3 (often XOFF)
20 	14 	DC4 	␔ 	^T 		Device Control 4
21 	15 	NAK 	␕ 	^U 		Negative Acknowledgement
22 	16 	SYN 	␖ 	^V 		Synchronous Idle
23 	17 	ETB 	␗ 	^W 		End of Transmission Block
24 	18 	CAN 	␘ 	^X 		Cancel
25 	19 	EM 	␙ 	^Y 		End of Medium
26 	1A 	SUB 	␚ 	^Z 		Substitute
27 	1B 	ESC 	␛ 	^[ 	\\e 	Escape
28 	1C 	FS 	␜ 	^\ 		File Separator
29 	1D 	GS 	␝ 	^] 		Group Separator
30 	1E 	RS 	␞ 	^^ 		Record Separator
31 	1F 	US 	␟ 	^_ 		Unit Separator
32 	20 	SP 	␢␣␠			Space
127 	7F 	DEL 	␡ 	^? 		Delete
`
const db = {}
for (line of data.split('\n')) {
    const chunks = line.split('\t').map(s => s.trim())
    const id = parseInt(chunks[0], 10)
    db[id] = {
        short: chunks[2],
        dec: chunks[0],
        hex: chunks[1],
        picture: chunks[3],
        caret: chunks[4],
        escape: chunks[5],
        long: chunks[6],
    }
}

const p = (e, k) => e[k].padStart(k.length)
const header = "Short|Dec|Hex|Picture|Caret|Escape|Long"
let out = ""

const COLS = 1
const ROWS = (128 / COLS)
for (let col = 0; col < COLS; col += 1) {
    out += header
}
out += '\n'

for (let row = 0; row < ROWS; row += 1) {
    for (let col = 0; col < COLS; col += 1) {
        const i = col * ROWS + row
        let e;
        if (db[i]) {
            e = db[i];
        } else {
            e = {
                short: String.fromCharCode(i),
                dec: String(i),
                hex: i.toString(16).toUpperCase(),
                picture: '',
                caret: '',
                escape: '',
                long: '',
            }
        }
        out += `${p(e,'short')}|${p(e,'dec')}|${p(e,'hex')}|${p(e,'picture')}|${p(e,'caret')}|${p(e,'escape')}|${p(e,'long')}`
    }
    out += '\n'
}
console.log(out)