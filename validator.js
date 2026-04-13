const fs = require('fs');
const ts = require('typescript');
const code = fs.readFileSync('src/pages/MockTest.tsx', 'utf8');
const sourceFile = ts.createSourceFile('test.tsx', code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
// get list of syntax errors
const diagnostics = sourceFile.parseDiagnostics;
if (diagnostics.length > 0) {
  console.log(diagnostics.map(d => {
    const pos = sourceFile.getLineAndCharacterOfPosition(d.start);
    return `Line ${pos.line + 1}, Col ${pos.character + 1}: ${d.messageText}`;
  }).join('\n'));
} else {
  console.log('No syntax errors according to TS parser!');
}
