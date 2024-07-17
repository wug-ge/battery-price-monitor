CREATE TABLE batteries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  eanGtin VARCHAR(255) NOT NULL,
  weight FLOAT NOT NULL,
  brand VARCHAR(255) NOT NULL,
  model VARCHAR(255) NOT NULL,
  size VARCHAR(255) NOT NULL,
  chemistry VARCHAR(255) NOT NULL,
  voltage VARCHAR(255) NOT NULL,
  minCapacity FLOAT NOT NULL,
  typCapacity FLOAT NOT NULL,
  version VARCHAR(255) NOT NULL,
  dischargeCurrent FLOAT NOT NULL,
  circuitProtection VARCHAR(255) NOT NULL,
  height FLOAT NOT NULL,
  diameter FLOAT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW()
);

CREATE TABLE `battery_prices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `batteryId` int(11) NOT NULL,
  `price` float NOT NULL,
  `priceReduced` float DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `batteryId` (`batteryId`),
  CONSTRAINT `battery_prices_ibfk_1` FOREIGN KEY (`batteryId`) REFERENCES `batteries` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=910 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci