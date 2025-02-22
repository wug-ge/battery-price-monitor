import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Battery } from "./Battery";
import { Sourcer } from "./Sourcer";

@Entity({ name: 'battery_prices' })
export class BatteryPrice {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'int' })
  batteryId!: number;

  @ManyToOne(() => Battery, battery => battery.batteryPrices)
  @JoinColumn({ name: 'batteryId' })
  battery!: Battery;

  @ManyToOne(() => Sourcer, sourcer => sourcer.batteryPrices)
  @JoinColumn({ name: 'sourcerId' })
  sourcer!: Sourcer;

  @Column({ type: 'int', default: 1 })
  sourcerId!: number;

  @Column({ type: 'float' })
  price!: number;

  @Column({ type: 'float', nullable: true })
  priceReduced!: number | null;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;
}
