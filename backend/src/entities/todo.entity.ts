import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('todo')
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn()
  todo_id: number;

  @Column()
  description: string;

  @Column({ default: false, type: 'boolean' })
  iscomplete: boolean; // Changed from iscomplete to isComplete and type to boolean
}
