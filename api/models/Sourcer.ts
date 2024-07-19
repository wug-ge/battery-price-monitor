import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BatteryPrice } from "./BatteryPrice";

@Entity({ name: 'sourcers' })
export class Sourcer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'timestamp' })
  createdAt!: string;

  @Column({ type: 'timestamp' })
  updatedAt!: string;

  @OneToMany(() => BatteryPrice, batteryPrice => batteryPrice.battery)
  batteryPrices!: BatteryPrice[];
}