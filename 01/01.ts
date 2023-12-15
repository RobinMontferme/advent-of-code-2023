import * as fs from "fs";

const numberMap = new Map<string, number>();
numberMap.set("one", 1);
numberMap.set("two", 2);
numberMap.set("three", 3);
numberMap.set("four", 4);
numberMap.set("five", 5);
numberMap.set("six", 6);
numberMap.set("seven", 7);
numberMap.set("eight", 8);
numberMap.set("nine", 9);

function normalizeNewLines(txt_to_normalize: string) {
  return txt_to_normalize.replace(/\r?\n/g, "\n");
}

function getSplitLines(data: string): string[] {
  return data.split("\n");
}

function computeSingleLine(line: string): number {
  line = line.replace(/[^0-9]/g, "");
  let first = line[0];
  let last = line.slice(-1);
  return Number(first + last);
}

function replaceStringNumbers(line: string) {
  let newLine = "";
  let tmp: string = "";
  for (let c of line) {
    tmp = tmp.concat(c);
    if (tmp in numberMap.keys()) {
      newLine = newLine.concat(tmp.replace(tmp, String(numberMap.get(tmp))));
      tmp = "";
    }
  }
  if (tmp) {
    newLine = newLine.concat(tmp);
  }
  return newLine;
}
let file_name = "test_input_1.txt";

let file = fs.readFileSync(file_name, "utf-8");

let split_data = getSplitLines(normalizeNewLines(file));
let result = 0;
for (let line of split_data) {
  result += computeSingleLine(line);
}

console.log(result);
