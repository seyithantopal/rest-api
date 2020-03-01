module.exports = {
    "up": "CREATE TABLE comment (id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, post_id INT NOT NULL, comment TEXT NOT NULL, date date NOT NULL)",
    "down": "DROP TABLE comment"
}