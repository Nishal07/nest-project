import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Users } from './user.entity';

@Entity()
export class Contacts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  contactName: string;

  @Column({ type: 'varchar', length: 40 })
  email: string;

  @Column({ type: 'varchar', length: 10 })
  contactnumber: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdDate: Date;

  @ManyToOne(() => Users, (users) => users.contacts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: Users;
}
