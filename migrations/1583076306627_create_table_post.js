module.exports = {
    "up": "CREATE TABLE post (id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, title VARCHAR(255) NOT NULL, content TEXT NOT NULL, image VARCHAR(255) NOT NULL)",
    "down": "DROP TABLE post"
}