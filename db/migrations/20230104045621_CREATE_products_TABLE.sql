-- migrate:up
CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  weight_price VARCHAR(100) NOT NULL,
  price DECIMAL ( 10, 2 ) NOT NULL,
  thumbnail_image VARCHAR(1000) NULL,
  base_unit VARCHAR(300) NOT NULL,
  stock INT NULL,
  sold INT NULL,
  category_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- migrate:down
DROP TABLE products;
