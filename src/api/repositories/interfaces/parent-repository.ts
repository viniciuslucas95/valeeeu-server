export interface IReadParentRepository<SingleResult, MultipleResults> {
  getByIdAndParentIdAsync(
    id: string,
    parentId: string
  ): Promise<SingleResult | undefined>;
  getAllByParentIdAsync(parentId: string): Promise<MultipleResults[]>;
  checkExistenceByParentIdAsync(parentId: string): Promise<boolean>;
  checkExistenceByIdAndParentIdAsync(
    id: string,
    parentId: string
  ): Promise<boolean>;
}
