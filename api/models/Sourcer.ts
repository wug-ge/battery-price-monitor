import { Column, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { BatteryPrice } from "./BatteryPrice";

@Entity({ name: 'sourcers' })
export class Sourcer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: string;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: string;

  @OneToMany(() => BatteryPrice, batteryPrice => batteryPrice.battery)
  batteryPrices!: BatteryPrice[];
}