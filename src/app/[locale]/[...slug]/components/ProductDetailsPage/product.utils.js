// We only want to display breadcrumbs for one category on a PDP even if a
// product has multiple related categories. This function filters and selects
// one category id for that purpose.
export const getBreadcrumbCategoryId = (categories) => {
  // Exit if there are no categories for this product.
  if (!categories || !categories.length) {
    return;
  }
  const breadcrumbSet = new Set();
  categories.forEach(({ breadcrumbs }) => {
    // breadcrumbs can be `null`...
    (breadcrumbs || []).forEach(({ category_uid }) =>
      breadcrumbSet.add(category_uid)
    );
  });

  // Until we can get the single canonical breadcrumb path to a product we
  // will just return the first category id of the potential leaf categories.
  const leafCategory = categories.find(
    (category) => !breadcrumbSet.has(category.uid)
  );

  // If we couldn't find a leaf category then just use the first category
  // in the list for this product.
  return leafCategory.id || categories[0].id;
};
