export const PrismaErrorsEnum = {
  /**
   * P2002: Unique constraint failed
   */
  P2002: 'P2002',
  /**
   * P2003: Foreign key constraint failed
   */
  P2003: 'P2003',
  /**
   * P2025: An operation failed because it depends on one or more records that were required but not found
   */
  P2025: 'P2025',
  /**
   * P2016: Query interpretation error
   */
  P2016: 'P2016',
  /**
   * P2017: The records for relation {relation_name}
   * between the {parent_name} and {child_name} models are not connected.
   */
  P2017: 'P2017',
  /**
   * P2014: The change you are t
   * rying to make would violate the required relation '{relation_name}'
   * between the {model_a_name} and {model_b_name} models.
   */
  P2014: 'P2014',
}
