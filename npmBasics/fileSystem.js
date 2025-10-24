const fs = require('fs');

// fs.writeFile('message.txt', 'Hello, Node.js!', (err) => {
//   if (err) throw err;
//   console.log('The file has been saved!');
// });

// fs.readFile('message.txt', 'utf8', (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// fs.appendFile('message.txt', '\nAppended text.', (err) => {
//   if (err) throw err;
//   console.log('The text has been appended!');
// });

// fs.readFile('message.txt', 'utf8', (err, data) => {
//   if (err) throw err;
//   console.log(data);
// }); 

// fs.rename('message.txt', 'newMessage.txt', (err) => {
//   if (err) throw err;
//   console.log('The file has been renamed!');
// }); 

// fs.copyFile('newMessage.txt', 'copiedMessage.txt', (err) => {
//   if (err) throw err;
//   console.log('The file has been copied!');
// });

// fs.unlink('newMessage.txt', (err) => {
//   if (err) throw err;
//   console.log('The file has been deleted!');
// });

// fs.unlink('copiedMessage.txt', (err) => {
//   if (err) throw err;
//   console.log('The copied file has been deleted!');
// }   );

fs.rmdir('testDir', { recursive: true }, (err) => {
  if (err) throw err;
  console.log('The directory has been removed!');
});


// fs.mkdir('testDir', (err) => {
//   if (err) throw err;
//   console.log('The directory has been created!');
// });

// fs.writeFile('testDir/message.txt', 'Hello, Node.js!', (err) => {
//   if (err) throw err;
//   console.log('The file has been saved!');
// });