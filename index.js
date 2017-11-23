module.exports = function (source) {
  // Match all occurences of various texture/image formats
  const matches = source.match(/ (.*\.(jpeg|jpg|mpc|mps|mpb|cxc|cxs|cxb|png|tga))/g);
  let trimmedMatches = [];

  if (matches) {
    // Make them unique
    const uniqueMatches = matches.filter((value, index, self) => self.indexOf(value) === index);
    // Trim away matched space at first char
    trimmedMatches = uniqueMatches.map(item => item.trim());
  }

  // Define variable holding the final output from loader
  let result = '';

  // Iterate over matches
  // - Replace occurences of filenames with a reference to a variable instead
  // - Append an import statement for the relevant matched texture/image as a incremental variable called asset${i}
  let replacedSource = source;
  for (let i=0; i<trimmedMatches.length; i++) {
    replacedSource = replacedSource.replace(new RegExp(trimmedMatches[i], 'g'), "${asset" + i +"}");
    result += `import asset${i} from './${trimmedMatches[i]}';\n`;
  }

  result += `
const output = \`${replacedSource}\`;

export default output;`;

  return result;
};
