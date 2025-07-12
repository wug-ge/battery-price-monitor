import { Column, Entity, OneToMany, PrimaryGeneratedColumn, DeleteDateColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { BatteryPrice } from "./BatteryPrice";

@Entity({ name: 'batteries' })
export class Battery {
  [key: string]: string | number | BatteryPrice[] | Date | undefined | null;

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  eanGtin!: string;

  @Column({ type: 'float' })
  weight!: number;

  @Column({ type: 'varchar', length: 255 })
  brand!: string;

  @Column({ type: 'varchar', length: 255 })
  model!: string | null;

  @Column({ type: 'varchar', length: 255 })
  size!: string;

  @Column({ type: 'varchar', length: 255 })
  chemistry!: string;

  @Column({ type: 'float' })
  voltage!: number;

  @Column({ type: 'float' })
  minCapacity!: number;

  @Column({ type: 'float' })
  typCapacity!: number;

  @Column({ type: 'varchar', length: 255 })
  version!: string;

  @Column({ type: 'float' })
  dischargeCurrent!: number;

  @Column({ type: 'varchar', length: 255 })
  circuitProtection!: string;

  @Column({ type: 'float' })
  height!: number;

  @Column({ type: 'float' })
  diameter!: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(() => BatteryPrice, batteryPrice => batteryPrice.battery)
  batteryPrices!: BatteryPrice[];
}
