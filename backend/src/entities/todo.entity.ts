import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('todo')
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ default: false, type: 'boolean' })
  iscomplete: boolean; // Changed from iscomplete to isComplete and type to boolean
}
