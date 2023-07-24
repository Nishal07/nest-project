import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Contacts } from './contacts.entity';
@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 40 })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdDate: Date;

  @OneToMany(() => Contacts, (contacts) => contacts.user, {
    cascade: true,
  })
  contacts: Contacts[];
}
