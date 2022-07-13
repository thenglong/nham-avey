import { Category } from "src/restaurants/entities/category.entity"
import { EntityRepository, Repository } from "typeorm"

// TODO:
@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  async getOrCreate(name: string): Promise<Category> {
    const categoryName = name.trim().toLowerCase()
    const categorySlug = categoryName.replace(/ /g, "-")
    let category = await this.findOneBy({ slug: categorySlug })
    if (!category) {
      category = await this.save(
        this.create({
          slug: categorySlug,
          name: categoryName,
        }),
      )
    }
    return category
  }
}
