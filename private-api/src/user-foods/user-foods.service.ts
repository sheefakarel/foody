import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserFood } from './entities/user-food.entity';
import { Repository } from 'typeorm';
import { AddUserFoodDto } from './dto/add-user-food.dto';

@Injectable()
export class UserFoodsService {
  constructor(
    @InjectRepository(UserFood)
    private userFoodsRepository: Repository<UserFood>,
  ) {}

  findFoods(userId: number, skip = 0, take = 25) {
    return this.userFoodsRepository.find({
      relations: ['food'],
      where: { userId },
      skip,
      take,
    });
  }

  findFood(userId: number, foodId: number) {
    return this.userFoodsRepository.findOne({
      relations: ['food'],
      where: { userId, foodId },
    });
  }

  deleteFood(userId: number, foodId: number) {
    return this.userFoodsRepository.delete({
      userId,
      foodId,
    });
  }

  addFood(userId: number, foodId: number, addUserFoodDto: AddUserFoodDto) {
    return this.userFoodsRepository.insert({
      userId,
      foodId,
      ...addUserFoodDto,
    });
  }
  mostConsumed(userId: number) {
    
    const query = this.userFoodsRepository.createQueryBuilder('user_foods') 
    .leftJoinAndSelect('user_foods.user_id','users')
    .leftJoinAndSelect('user_foods.food_id','food_nutrients')
    .leftJoinAndSelect('food_nutrients.nutrient_id','nutrients')
    .where('user_foods.user_id = :user_id', { user_id: userId })
    .select('user_foods.*, nutrients.id as nutrient_id, nutrients.name as name, nutrients.unit_name as unitName')
    .getMany();

    const result = query.execute();
    let max = 0;
    for(const r1 of result){
      const userF = this.userFoodsRepository.createQueryBuilder("user_foods")
      .where("food_id = "+r1.food_id+" AND user_id = "+userId)
      .getOne();
      const getN = r1.amount_per_serving * userF.servings_per_week;
      if(max < getN){
          max = getN;
          let result = {id:r1.nutrient_id, 
                        name:r1.name, 
                        unitName:r1.unitName, 
                        weeklyAmount:max};
      }
    }
    return result;
  }
}
