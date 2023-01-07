-- migrate:up
CREATE TABLE carts (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  quantity INT NOT NULL,
  user_id INT NULL,
  product_id INT NOT NULL,
  product_option_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (product_option_id) REFERENCES product_options(id),
  UNIQUE KEY unique_index (user_id, product_id, product_option_id)
);


-- migrate:down
DROP TABLE carts;
