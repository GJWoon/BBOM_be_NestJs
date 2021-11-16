import { IPaginationOptions, paginate } from "nestjs-typeorm-paginate";
import { createQueryBuilder, EntityRepository, Repository } from "typeorm";
import { Content } from "../entities/content";


@EntityRepository(Content)
export class ContentRepository extends Repository<Content>{
    
    async getContentPaging(page: number, limit: number, query: string) {
        const queryBuilder = this.createQueryBuilder('c')
            .orderBy('c.createdDate', 'DESC');
        if (query) {
            queryBuilder.where('c.content like :query', { query: `%${query}%` });
        }
        return queryBuilder
            .disableEscaping()
            .getManyAndCount()
    }
}