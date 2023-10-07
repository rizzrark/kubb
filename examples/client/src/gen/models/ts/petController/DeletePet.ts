/**
 * @description Invalid pet value
 */
export type DeletePet400 = any | null

export type DeletePetHeaderParams = {
  /**
   * @type string | undefined
   */
  api_key?: string
}

export type DeletePetMutationResponse = any | null

export type DeletePetPathParams = {
  /**
   * @description Pet id to delete
   * @type integer int64
   */
  petId: number
}
