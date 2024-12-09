const bcrypt = require('bcrypt');
const hash = '$2b$10$C7Lb2gS07sKE4ZzvCITRYeh7.7RiHvzYgszF/J/JZ2RNdIXLKZC2u'; // tu hash
bcrypt.compare('admin', hash).then(console.log); // Debe imprimir true

bcrypt.hash('admin', 10).then(console.log);
