import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { State } from 'src/entities/enums/states.enum';
import { History } from 'src/entities/search/history.entity';
import { User } from 'src/entities/user/user.entity';
import { getManager, Repository } from 'typeorm';
import { CreateHistoryDTO } from '../dto/createHistory.dto';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History, 'search')
    private readonly historyRepository: Repository<History>,
    @InjectRepository(User, 'user')
    private readonly userRepository: Repository<User>,
  ) {}

  async create(body: CreateHistoryDTO) {
    const user = await this.userRepository.findOne({
      select: ['id', 'state', 'email'],
      relations: ['person'],
      where: { id: body.userId, state: State.Active },
    });

    if (!user)
      return {
        error: 'USER_NOT_EXIST',
        detail: 'El usuario no existe.',
      };

    const item = await this.historyRepository.findOne({
      select: ['id', 'state', 'text'],
      where: { text: body.text, state: State.Active },
    });

    if (item) {
      await this.historyRepository.update(item.id, {
        state: State.Inactive,
      });
    }

    await getManager('search').transaction(async (entityManager) => {
      const objectPublication: any = {
        text: body.text,
        quantity: body.quantity,
        state: State.Active,
      };

      await entityManager.save(
        this.historyRepository.create({
          ...objectPublication,
          user,
        }),
      );
    });
  }

  async findAll(id: number) {
    const queryBuilder = await this.historyRepository
      .createQueryBuilder('history')
      .select(['history.id', 'history.text', 'history.createdAt'])
      .leftJoin('history.user', 'user')
      .where("history.state = 'active'  AND user.id = :id ", { id })
      .orderBy('history.quantity', 'DESC');

    const data = await queryBuilder.getMany();
    return data.slice(0, 5);
  }
}
