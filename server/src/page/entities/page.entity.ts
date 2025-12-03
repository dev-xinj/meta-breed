import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Page extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  pageName: string;
  @Column()
  pageUUID: string;
  @Column()
  accessToken: string;
  @Column()
  status: 'IDLE' | 'PROCESSING';
}
