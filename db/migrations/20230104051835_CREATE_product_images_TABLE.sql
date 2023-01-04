-- migrate:up
CREATE TABLE product_images (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  thumbnail_image VARCHAR(1000) NULL,
  detail_image VARCHAR(1000) NULL,
  product_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- migrate:down
DROP TABLE product_images;
