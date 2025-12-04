import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PageStatus } from './page.enum';

@Entity()
export class Page extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  pageName: string;
  @Column()
  pageUUID: string;
  @Column()
  accessToken: string;
  @Column({
    type: 'enum',
    enum: PageStatus,
    default: PageStatus.IDLE,
  })
  status: PageStatus;
}
