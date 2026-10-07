import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import type { Point } from 'typeorm';

@Entity('lostpet')
export class LostPet {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  type!: string;

  @Column()
  name!: string;

  @Column()
  phone!: string;

  @Column()
  race!: string;

  @Column()
  age!: number;

  @Column()
  color!: string;

  @Column({
    type: 'geometry',
    spatialFeatureType: 'Point',
    srid: 4326,
  })
  location!: Point;
}
