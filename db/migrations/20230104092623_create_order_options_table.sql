-- migrate:up
CREATE TABLE order_options (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_option_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (product_option_id) REFERENCES product_options(id)
);

-- migrate:down
DROP TABLE order_options;
