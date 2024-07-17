import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Battery } from "./Battery";

@Entity({ name: 'battery_prices' })
export class BatteryPrice {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Battery, battery => battery.batteryPrices)
  battery!: Battery;

  @Column({ type: 'float' })
  price!: number;

  @Column({ type: 'float' })
  priceReduced!: number;

  @Column({ type: 'timestamp' })
  createdAt!: string;

  @Column({ type: 'timestamp' })
  updatedAt!: string;
}
