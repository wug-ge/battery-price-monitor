import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Battery } from "./Battery";
import { Sourcer } from "./Sourcer";

@Entity({ name: 'battery_prices' })
export class BatteryPrice {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'int' })
  batteryId!: number;

  @ManyToOne(() => Battery, battery => battery.batteryPrices)
  battery!: Battery;

  @ManyToOne(() => Sourcer, sourcer => sourcer.batteryPrices)
  sourcer!: Sourcer;

  @Column({ type: 'int' })
  sourcerId!: number;

  @Column({ type: 'float' })
  price!: number;

  @Column({ type: 'float' })
  priceReduced!: number;

  @Column({ type: 'timestamp' })
  createdAt!: string;

  @Column({ type: 'timestamp' })
  updatedAt!: string;
}
