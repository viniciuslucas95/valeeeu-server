export interface IReadParentRepository<SingleResult> {
  getByIdAndParentIdAsync(
    id: string,
    parentId: string
  ): Promise<SingleResult | undefined>;
  checkExistenceByParentIdAsync(parentId: string): Promise<boolean>;
  checkExistenceByIdAndParentIdAsync(
    id: string,
    parentId: string
  ): Promise<boolean>;
}
